#!/usr/bin/env python3
"""Resume draft report uploads; publish only after all verified assets are present."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
from verify_record import verify


def command(*args):
    return subprocess.check_output(['gh', *args], text=True).strip()


def publish(record, evidence=Path('output/evidence')):
    repo, version = record['repository'], record['version']

    def find_release():
        rows = command('api', '--paginate', f'repos/{repo}/releases', '--jq',
                       '.[] | [.tag_name, .id] | @tsv')
        for row in rows.splitlines():
            tag, identifier = row.split('\t')
            if tag == version:
                return json.loads(command('api', f'repos/{repo}/releases/{int(identifier)}'))
        return None

    release = find_release()
    if release is None:
        # Use the creation response: listing immediately afterward can be stale.
        release = json.loads(command('api', '--method', 'POST', f'repos/{repo}/releases',
                '-f', f'tag_name={version}', '-f', f'target_commitish={record["source"]}',
                '-f', f'name={version}', '-F', 'draft=true', '-f',
                'body=Exact-image checks passed. Synthetic rehearsal only; scan findings remain report-only.'))
    assert release and release['tag_name'] == version
    assert release['target_commitish'] == record['source'], 'Release target changed'
    names = {asset['name'] for asset in release['assets']}
    for path in sorted(evidence.glob('*.json')):
        if path.name not in names:
            # An interrupted draft is resumable; a published release is immutable here.
            assert release['draft'], 'Published release is missing a required report'
            command('release', 'upload', version, '-R', repo, str(path))
        with tempfile.TemporaryDirectory() as directory:
            command('release', 'download', version, '-R', repo, '--pattern', path.name, '--dir', directory)
            assert (Path(directory) / path.name).read_bytes() == path.read_bytes(), 'Existing report differs'
    if release['draft']:
        command('release', 'edit', version, '-R', repo, '--draft=false')
    commit = json.loads(command('api', f'repos/{repo}/commits/{version}'))
    assert commit['sha'] == record['source'], 'Published Git tag/source mismatch'


if __name__ == '__main__':
    record = verify()
    publish(record)
    with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as summary:
        summary.write(f"Published [{record['version']}](https://github.com/{record['repository']}/releases/tag/{record['version']}) "
                      f"at `{record['image']}@{record['digest']}`. No target deployment.\n\n"
                      f"From the ops checkout: `task release-select COMPONENT=frontend VERSION={record['version']}`. Selection does not deploy.\n")
