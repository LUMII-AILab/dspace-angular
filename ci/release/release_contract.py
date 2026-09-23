"""Version 1 frontend release record, validated offline before any target mutation."""
import re

REPOSITORY = 'LUMII-AILab/dspace-angular'
IMAGE = 'ghcr.io/lumii-ailab/dspace-angular'
WORKFLOW = '.github/workflows/clarin-release.yml'


def validate(record, reference=None):
    def require(test, message):
        if not test:
            raise ValueError(message)
    require(isinstance(record, dict) and record.get('schema') == 1, 'Invalid release schema')
    require(record.get('repository') == REPOSITORY and record.get('image') == IMAGE,
            'Unexpected release publisher/image')
    for field, pattern in [('source', r'[a-f0-9]{40}'),
                           ('compatibility_revision', r'[a-f0-9]{40}'), ('digest', r'sha256:[a-f0-9]{64}'),
                           ('config_digest', r'sha256:[a-f0-9]{64}')]:
        require(isinstance(record.get(field), str) and re.fullmatch(pattern, record[field]),
                'Invalid release ' + field)
    require(record.get('version') == 'sha-' + record['source'], 'Version/source mismatch')
    require(reference is None or reference == IMAGE + '@' + record['digest'], 'Release digest mismatch')
    require(record.get('workflow') == WORKFLOW and type(record.get('run_id')) is int
            and record['run_id'] > 0, 'Invalid workflow identity')
    require(record.get('checks') == {'oci': 'passed', 'https': 'passed', 'configuration': 'passed'},
            'Release qualification incomplete')
    require(isinstance(record.get('scan'), dict), 'Invalid security disposition')
    require(record.get('scan', {}).get('policy') == 'synthetic-report-v1'
            and record['scan'].get('disposition') == 'report-only'
            and record['scan'].get('production_accepted') is False,
            'Unexpected security disposition')
    return record
