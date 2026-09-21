#!/usr/bin/env python3
"""Fail closed before publisher receives a candidate as an accepted release."""
import hashlib
import json
import os
from pathlib import Path
from frontend_image import inputs, inspect_archive
from release_contract import validate


def verify(root=Path('output')):
    record = validate(json.loads((root / 'evidence/release.json').read_text()))
    assert record['source'] == inputs()['source_revision']
    assert record['digest'] == os.environ['EXPECTED_DIGEST']
    assert record['run_id'] == int(os.environ['GITHUB_RUN_ID'])
    identity = inspect_archive(root / 'frontend.oci.tar', record['digest'], root / 'evidence')
    assert record['config_digest'] == identity['config_digest']
    https = json.loads((root / 'evidence/https.json').read_text())
    assert https['result'] == 'passed' and https['frontend_config_digest'] == record['config_digest']
    assert https['source_revision'] == record['source']
    for name in ('vulnerabilities.json', 'dependency-vulnerabilities.json'):
        assert record['scan']['reports'][name] == hashlib.sha256((root / 'evidence' / name).read_bytes()).hexdigest()
    return record


if __name__ == '__main__':
    verify()
