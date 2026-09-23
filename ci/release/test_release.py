"""Offline release gates: OCI tampering, source identity, fixture pins and workflow privileges."""
import copy
import hashlib
import io
import json
import os
import subprocess
from pathlib import Path
import tarfile
import tempfile
import unittest
from unittest.mock import patch

import frontend_image as m
from release_contract import validate

ROOT=Path(__file__).resolve().parents[2]


def archive(path, source=None, corrupt=False):
    blobs={}
    def blob(data, media):
        payload=json.dumps(data).encode()
        digest='sha256:'+hashlib.sha256(payload).hexdigest()
        blobs['blobs/sha256/'+digest[7:]]=payload
        return dict(mediaType=media,digest=digest,size=len(payload))
    config=blob({'architecture':'amd64','os':'linux','config':{'User':'1000:1000',
        'Labels':{'org.opencontainers.image.revision':source or m.inputs()['source_revision']}}},
        'application/vnd.oci.image.config.v1+json')
    runtime=blob({'config':config,'layers':[]},'application/vnd.oci.image.manifest.v1+json')
    attest=[]
    for predicate in ['https://slsa.dev/provenance/v0.2','https://spdx.dev/Document']:
        attest.append(blob({'predicateType':predicate,'subject':[{'digest':{'sha256':runtime['digest'][7:]}}]},
                          'application/vnd.in-toto+json'))
    unknown=blob({},'application/vnd.oci.image.config.v1+json')
    attestation=blob({'config':unknown,'layers':attest},'application/vnd.oci.image.manifest.v1+json')
    index=blob({'manifests':[runtime,attestation]},'application/vnd.oci.image.index.v1+json')
    blobs['index.json']=json.dumps({'manifests':[index]}).encode()
    if corrupt: blobs['blobs/sha256/'+config['digest'][7:]]=b'bad'
    with tarfile.open(path,'w') as tar:
        for name,data in blobs.items():
            info=tarfile.TarInfo(name);info.size=len(data);tar.addfile(info,io.BytesIO(data))
    return index['digest'],config['digest']


class ReleaseTests(unittest.TestCase):
    def test_recipe_and_derived_source(self):
        m.check_recipe()
        self.assertNotIn('source_revision',json.loads((m.RECIPE/'toolchain.json').read_text()))
        self.assertEqual(m.inputs()['source_lock_sha256'],hashlib.sha256((ROOT/'yarn.lock').read_bytes()).hexdigest())

    def test_exact_archive_and_source_tampering(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d);candidate=p/'image.tar'
            digest,config=archive(candidate)
            result=m.inspect_archive(candidate,digest,p/'evidence')
            self.assertEqual(result['config_digest'],config)
            with self.assertRaises(ValueError):m.inspect_archive(candidate,'sha256:'+'0'*64,p/'evidence')
            for kw in ({'source':'0'*40},{'corrupt':True}):
                digest,_=archive(candidate,**kw)
                with self.assertRaises(ValueError):m.inspect_archive(candidate,digest,p/'evidence')

    def test_pinned_nonprivate_compatibility_files(self):
        root=ROOT/'ci/release/compatibility'
        manifest=json.loads((root/'manifest.json').read_text())
        self.assertEqual(manifest['revision'],m.inputs()['compatibility_revision'])
        self.assertNotIn('compatibility_revision',json.loads((m.RECIPE/'toolchain.json').read_text()))
        for path,digest in manifest['files'].items():
            self.assertEqual(hashlib.sha256((root/path).read_bytes()).hexdigest(),digest,path)
        self.assertFalse((root/'ansible/inventories').exists())

    def test_compatibility_manifest_rejects_changed_or_missing_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory); fixture=root/'fixture'; fixture.write_bytes(b'reviewed')
            manifest=dict(repository='LUMII-AILab/clarin-dspace-ops',revision='a'*40,
                          files={'fixture':hashlib.sha256(b'reviewed').hexdigest()})
            (root/'manifest.json').write_text(json.dumps(manifest))
            self.assertEqual(m.compatibility_manifest(root),manifest)
            fixture.write_bytes(b'changed')
            with self.assertRaisesRegex(ValueError,'hash mismatch'): m.compatibility_manifest(root)
            fixture.unlink()
            with self.assertRaisesRegex(ValueError,'Missing'): m.compatibility_manifest(root)

    def test_publisher_verifies_reports_bound_to_exact_loaded_image(self):
        from verify_record import verify
        with tempfile.TemporaryDirectory() as d:
            root=Path(d); evidence=root/'evidence';evidence.mkdir()
            digest, config=archive(root/'frontend.oci.tar')
            source=m.inputs()['source_revision']
            reports={}
            for name in ('vulnerabilities.json','dependency-vulnerabilities.json'):
                (evidence/name).write_text('{}')
                reports[name]=hashlib.sha256(b'{}').hexdigest()
            record=dict(schema=1,repository='LUMII-AILab/dspace-angular',image=m.inputs()['image'],
                        version='sha-'+source,source=source,digest=digest,config_digest=config,
                        compatibility_revision=m.inputs()['compatibility_revision'],workflow='.github/workflows/clarin-release.yml',
                        run_id=123,checks=dict(oci='passed',https='passed',configuration='passed'),
                        scan=dict(policy='synthetic-report-v1',disposition='report-only',production_accepted=False,reports=reports))
            (evidence/'release.json').write_text(json.dumps(record))
            https=dict(result='passed',frontend_config_digest=config,source_revision=source)
            (evidence/'https.json').write_text(json.dumps(https))
            with patch.dict(os.environ,EXPECTED_DIGEST=digest,GITHUB_RUN_ID='123'):
                self.assertEqual(verify(root),record)
                (evidence/'release.json').write_text(json.dumps(record|{'compatibility_revision':'b'*40}))
                with self.assertRaises(AssertionError): verify(root)
                (evidence/'release.json').write_text(json.dumps(record))
                for bad in (https|{'result':'failed'},https|{'frontend_config_digest':'sha256:'+'0'*64}):
                    (evidence/'https.json').write_text(json.dumps(bad))
                    with self.assertRaises(AssertionError): verify(root)
                (evidence/'https.json').write_text(json.dumps(https))
                (evidence/'vulnerabilities.json').write_text('{"changed":true}')
                with self.assertRaises(AssertionError): verify(root)

    def test_publication_copies_once_and_refuses_moved_tag_or_denied_registry(self):
        # Exercise the real publisher shell; replace external processes, never a live registry.
        harness = r"""
python3() { printf 'inspect\n' >> "$TRACE"; }
docker() {
  case " $* " in
    *" login "*) cat >/dev/null ;;
    *" list-tags "*)
      if [ "$CASE" = denied ]; then return 1; fi
      if [ "$CASE" = new ]; then printf '{"Tags":[]}';
      else printf '{"Tags":["%s"]}' "$TAG"; fi ;;
    *" inspect "*)
      if [ "$CASE" = moved ]; then printf other; else printf index; fi ;;
    *" copy "*) printf 'copy\n' >> "$TRACE" ;;
  esac
}
export -f python3 docker
bash "$PUBLISHER"
"""
        with tempfile.TemporaryDirectory() as d:
            root=Path(d);(root/'ci/release/image').mkdir(parents=True)
            (root/'ci/release/image/inputs.json').write_text(json.dumps(m.inputs()))
            (root/'output').mkdir()
            for case, code, copies in [('new',0,1),('same',0,0),('moved',1,0),('denied',1,0)]:
                trace=root/'trace';trace.write_text('')
                env=dict(os.environ,CASE=case,TRACE=str(trace),PUBLISHER=str(ROOT/'ci/release/publish.sh'),
                         GHCR_TOKEN='private-test-sentinel',GHCR_USER='fixture',
                         EXPECTED_DIGEST='sha256:'+hashlib.sha256(b'index').hexdigest(),
                         IMAGE=m.inputs()['image'],TAG='sha-'+'a'*40)
                result=subprocess.run(['bash','-c',harness],cwd=root,env=env,capture_output=True,text=True)
                self.assertEqual(result.returncode,code,result.stderr)
                self.assertEqual(trace.read_text().splitlines().count('copy'),copies)
                self.assertIn('inspect',trace.read_text())
                self.assertNotIn('private-test-sentinel',result.stdout+result.stderr+trace.read_text())

    def test_partial_report_upload_resumes_draft_without_overwriting_assets(self):
        import publish_report
        with tempfile.TemporaryDirectory() as d:
            root=Path(d)
            (root/'release.json').write_text('{"verified":true}')
            (root/'https.json').write_text('{"passed":true}')
            record=dict(repository='owner/app',version='sha-'+'a'*40,source='a'*40)
            state={'draft':True, 'assets':{'release.json':(root/'release.json').read_bytes()}}
            calls=[]
            def gh(*args):
                calls.append(args)
                if args[:2]==('api','--paginate'): return record['version']+'\t1'
                if args==('api','repos/owner/app/releases/1'):
                    return json.dumps(dict(tag_name=record['version'],target_commitish=record['source'],
                                          draft=state['draft'],assets=[{'name':name} for name in state['assets']]))
                if args[:2]==('release','upload'):
                    p=Path(args[-1]); self.assertNotIn(p.name,state['assets']);state['assets'][p.name]=p.read_bytes()
                elif args[:2]==('release','download'):
                    name=args[args.index('--pattern')+1]
                    (Path(args[-1])/name).write_bytes(state['assets'][name])
                elif args[:2]==('release','edit'): state['draft']=False
                elif args[0]=='api' and '/commits/' in args[1]: return json.dumps({'sha':record['source']})
                return ''
            with patch.object(publish_report,'command',side_effect=gh):
                publish_report.publish(record,root)
                self.assertFalse(state['draft'])
                self.assertEqual(len([c for c in calls if c[:2]==('release','upload')]),1)
                calls.clear()
                publish_report.publish(record,root)
                self.assertFalse(any(c[:2]==('release','upload') for c in calls))
                state['assets']['release.json']=b'changed'
                with self.assertRaises(AssertionError): publish_report.publish(record,root)

    def test_new_draft_uses_creation_response_when_release_list_is_stale(self):
        import publish_report
        with tempfile.TemporaryDirectory() as d:
            root=Path(d)
            (root/'release.json').write_text('{"verified":true}')
            record=dict(repository='owner/app',version='sha-'+'a'*40,source='a'*40)
            calls=[]
            def gh(*args):
                calls.append(args)
                if args[:2]==('api','--paginate'): return ''  # Listing remains stale.
                if args[:3]==('api','--method','POST'):
                    self.assertIn('draft=true',args)
                    return json.dumps(dict(id=1,tag_name=record['version'],
                                           target_commitish=record['source'],draft=True,assets=[]))
                if args[:2]==('release','download'):
                    (Path(args[-1])/'release.json').write_bytes((root/'release.json').read_bytes())
                if args[0]=='api' and '/commits/' in args[1]:
                    return json.dumps({'sha':record['source']})
                return ''
            with patch.object(publish_report,'command',side_effect=gh):
                publish_report.publish(record,root)
            self.assertEqual(sum(c[:2]==('api','--paginate') for c in calls),1)
            self.assertTrue(any(c[:2]==('release','upload') for c in calls))
            self.assertTrue(any(c[:2]==('release','edit') for c in calls))

    def test_workflow_qualifies_before_publishing_without_private_checkout(self):
        workflow=(ROOT/'.github/workflows/clarin-release.yml').read_text()
        build,publish=workflow.split('\n  publish:\n')
        self.assertNotIn('secrets.',build)
        self.assertNotIn('packages: write',build)
        self.assertNotIn('contents: write',build)
        self.assertNotIn('repository: LUMII-AILab/clarin-dspace-ops',build)
        self.assertIn('needs: build',publish)
        self.assertIn("github.event_name != 'pull_request'",publish)
        self.assertIn('CLARIN_RELEASE_PUBLISH_ENABLED',publish)
        self.assertIn('test_https_runtime.py',build)
        self.assertIn('python3 ci/release/verify_record.py',publish)
        self.assertNotIn('build-push-action',publish)
        self.assertIn('--preserve-digests',(ROOT/'ci/release/publish.sh').read_text())


if __name__=='__main__': unittest.main()
