#!/usr/bin/env python3
"""Create a compact digest-bound report only after all exact-artifact gates pass."""
import hashlib
import json
import os
from pathlib import Path
from frontend_image import inputs
from release_contract import validate

root = Path('output/evidence')
data = inputs()
identity = json.loads((root / 'identity.json').read_text())
https = json.loads((root / 'https.json').read_text())
assert identity['source_revision'] == data['source_revision']
assert https['result'] == 'passed'
assert https['source_revision'] == identity['source_revision']
assert https['frontend_config_digest'] == identity['config_digest']
# Preserve the existing report-only synthetic policy; no new security acceptance.
policy = json.loads(Path('ci/release/scan-policy.json').read_text())
assert policy['id'] == 'synthetic-report-v1' and policy['findings'] == 'report-only'
assert policy['scanner_errors'] == 'fail' and policy['production_accepted'] is False
assert policy['exceptions'] == []
reports = {}
for name in ('vulnerabilities.json', 'dependency-vulnerabilities.json'):
    path = root / name
    report = json.loads(path.read_text())
    assert report.get('SchemaVersion') == 2 and 'Results' in report
    reports[name] = hashlib.sha256(path.read_bytes()).hexdigest()
record = dict(schema=1, repository='LUMII-AILab/dspace-angular', image=data['image'],
              version='sha-' + data['source_revision'], source=data['source_revision'],
              digest=identity['index_digest'], config_digest=identity['config_digest'],
              compatibility_revision=data['compatibility_revision'],
              workflow='.github/workflows/clarin-release.yml', run_id=int(os.environ['GITHUB_RUN_ID']),
              checks=dict(oci='passed', https='passed', configuration='passed'),
              scan=dict(policy='synthetic-report-v1', disposition='report-only',
                        production_accepted=False, reports=reports))
validate(record)
(root / 'release.json').write_text(json.dumps(record, indent=2) + '\n')
with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as summary:
    summary.write(f"Frontend `{record['version']}`\n\n`{record['image']}@{record['digest']}`\n\n"
                  'Configuration, OCI provenance/SBOM and exact-image HTTPS checks passed. '
                  'Scan reports retained; report-only synthetic policy, no production acceptance.\n\n'
                  f"After publication, from the ops checkout: `task release-select COMPONENT=frontend VERSION={record['version']}`. Selection does not deploy.\n")
