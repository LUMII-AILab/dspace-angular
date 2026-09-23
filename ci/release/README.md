# CLARIN frontend releases

The CLARIN workflow validates PRs to `clarin-v7` without registry/deployment
credentials. A mainline push builds one OCI artifact, verifies source identity,
provenance and SBOM, scans the image and dependency locks, and qualifies that exact
runtime image with disposable HTTPS fixtures. Publication then waits for owner
approval in `frontend-release` and copies that artifact
without rebuilding, verifies the registry digest, then creates a GitHub release
`sha-FULL_COMMIT` with small JSON reports. No server deployment runs in CI.

`image/toolchain.json` owns pinned Node/Yarn/PM2, APK, Buildx/BuildKit, scanner and
publisher versions. Source revision and package/lock hashes are derived from the
checked-out commit; `image/inputs.json` is generated. The source context is a Git
archive without submodule contents. Frozen dependency installation and persistent
BuildKit `gha` cache retain dependency layers; PRs only read the trusted cache.
A PR build and a mainline build validate different commits. The first mainline run
populates the cache; measure later runs before claiming a warm-cache speedup.

## Activation and retries

The existing GHCR package is `ghcr.io/lumii-ailab/dspace-angular`. Before enabling
publication, review its linked repository, private visibility, deployment reader
access and Actions access for `LUMII-AILab/dspace-angular`. Grant the app repository
write access through the package's **Manage Actions access**, preserving the existing
package/reader. Do not delete/recreate the package or change visibility.
Then set repository variable `CLARIN_RELEASE_PUBLISH_ENABLED=true`. The one-time
switch enables the per-run owner-approval flow; it does not approve a release. Activation was completed on
2026-09-21 after owner confirmation and independent private-package/reader checks.
The ordinary CLI token lacks `read:packages`; do not interpret that token's 403 as
a package visibility or deployment-reader failure.
See [GitHub package access](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility).

Configure `frontend-release` with the owner as required reviewer and a `clarin-v7`
branch restriction before enabling publication. After a push's build and checks
pass, open that run and choose **Review deployments → frontend-release → Approve
and deploy**. GitHub uses a deployment label, but this job only publishes the
already-tested image and release reports. It does not rebuild or deploy a server.
Do not start another workflow to publish a waiting candidate. Optional manual
dispatch starts a new build with the same approval gate; PRs cannot publish.

Merge/push and workflow execution require their own requested publication scope.
Verify a real PR run and a real mainline release before claiming the automation is
operational. The retired ops publisher must not be used for new releases. The
existing Latvian publication remains preserved and its target rollout paused.

If publication fails, use **Re-run failed jobs**, retaining the successful build's
`frontend-candidate-RUN_ID` artifact (30 days). The publisher rechecks its digest,
source, reports and runtime identity. Do not rerun all jobs merely to retry a push:
that recompiles and may produce a different digest. An existing image tag cannot
be moved by this publisher. A full rebuild of the same source needs a deliberate
new source commit/version; the stable release tag must keep its original digest.
Manual dispatch is available for an intentional unreleased commit or recovery.

Report uploads use a draft release and verify every existing asset before publishing.
An interrupted draft can resume; existing different assets are never overwritten.
The GitHub release retains small reports beyond CI archive retention. Ops consumes
`release.json` from the trusted successful mainline workflow, selects the exact
recorded digest, and validates its source/config identity after the target pull.
This is repository/workflow trust, not signature verification. Reports cannot
replace the registry image or a recovery backup.

## Compatibility and security scope

Ops is private. `compatibility/manifest.json` identifies the immutable ops revision
and SHA-256 of the four public frontend/proxy templates plus public paths vendored
here. `compatibility/tests/render.yml` renders only these synthetic fixtures; it
contains no target inventory, credential or private configuration. This avoids
private repository credentials in app PR jobs. The fixture manifest is the single source of its revision and file hashes. Build
inputs derive that revision and verify every listed file; publication checks that
the retained release record matches it. Ops validates trusted release provenance
and successful artifact checks without a second list of approved fixture commits.
Update the manifest and fixture files together when changing the test contract;
existing qualified release records remain valid for rollback.

The HTTPS suite covers mock-backend routing, public configuration sanitization,
forwarding/header rejection, DNS/TLS and restart behavior. It does not establish
integrated DSpace content, authenticated access, browser Anubis behavior or
production acceptance. Ops adds bounded deployment probes and configured synthetic
file fixtures; usability changes still need owner acceptance.

`scan-policy.json` versions the existing **report-only synthetic** policy. Scanner
errors fail the build; findings remain visible in both retained Trivy reports.
No production security acceptance or vulnerability exception is inferred. An
owner-reviewed baseline and exceptions with owner, scope and expiry must precede
a future "new findings" gate; this change does not invent a baseline decision.

Local offline checks:

```sh
python3 -m unittest discover -s ci/release -p test_release.py
bash -n ci/release/scan.sh ci/release/publish.sh
```

The complete artifact test runs in CI. To exercise the disposable harness locally,
use an already-loaded exact config digest with `--frontend`, its source label with
`--source`, and `CLARIN_COMPAT_ROOT=$PWD/ci/release/compatibility`. No implicit pull
or rebuild is performed by the harness. CI explicitly pulls only the pinned proxy
and loads the verified runtime from its OCI archive.

Inherited upstream workflows are preserved byte-for-byte in
`.github/disabled-workflows/upstream/`, including the old customer dispatch,
DockerHub tagging, deployment and triage jobs. They are inactive in this fork.
This also removes obsolete CodeQL actions, an empty workflow and a missing local
reusable deployment workflow from active Actions configuration without upgrading
upstream tooling. CLARIN's focused release workflow is the fork's PR/mainline entry
point; it does not claim to run the upstream full Cypress/backend test matrix.
