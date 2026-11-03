# CLARIN-LV UI customization — review handoff

## Current status — 2026-11-03

Branding, navigation and nine EN/LV policy/help page pairs are implemented in
[PR #5](https://github.com/LUMII-AILab/dspace-angular/pull/5), targeting `clarin-v7`.
The initial reviewed PR head was `30474d509566ef816a90a98844fbc472501f8128`. Owner visual
inspection was approved; the code review found no actionable correctness defects.

The owner subsequently requested three local simplifications: store Help links
as base-relative paths, remove unused footer fields/service dependencies, and
condense this handoff. They are applied and validated on `codex/review-pr-5`. A final
code and simplification review found no further actionable issues. The owner
authorized committing and pushing this follow-up to the existing PR source branch,
`feature/clarin-lv-ui-customization`.

## Implemented scope

- CLARIN-LV header/home branding, seven localized partner links, Latvia-specific
  B-centre/CoreTrustSeal badges, support details and retained software/asset credit.
- Repository, Browse, Corpus Search, Help and About navigation. Corpus Search opens
  `https://korpuss.lv/search` in a new tab with `noopener noreferrer`. Help links
  appear only in the header; existing account and language controls are retained.
- Nine English/Latvian page pairs: About, Privacy, Terms, Metadata, Cite, Lifecycle,
  FAQ, Deposit and Cookies. Suitable v5 text is reused; deposit guidance is adapted
  to v7 and obsolete screenshots/Czech-only commitments are removed.
- Privacy and user-agreement screens compile the same EN/LV source fragments as
  their static pages. The small language components avoid duplicating policy text.

Help and policy links use native base-relative hrefs under `/repository/`.
Shared static loading, routing/history, language switching, cookies, authentication,
policy acceptance/versioning and backend workflows are unchanged. Collection
agreements and resource licence texts are linked, not rewritten or translated.

## Validation and remaining limits

The November 3 review of the PR head passed 15 focused tests, changed-file ESLint,
configuration checks, production browser/server compilation, 106 static target/anchor
checks and bounded live-preview browser checks. The managed Karma runner exited 0;
an earlier single-run shutdown hang was a harness issue, resolved by that rerun.
After simplification, all 15 focused tests passed again with runner exit 0, as did
TypeScript/template ESLint, configuration checks, production browser/server
compilation, documentation links and whitespace checks. Fresh browser checks
verified all six namespaced Help destinations, native Deposit navigation and EN/LV
footer rendering. All eight local services remain healthy at `ready`.

The original implementation also recorded 27 customization browser checks and
122 internal href checks. These historical results cover different check sets;
they are not additional tests rerun during the November 3 review.

Authenticated submission, legal accuracy, translation approval, external-link
availability and SSR runtime acceptance are not certified. Historical SSR probes
observed English initial HTML with LV cookies and HTTP 429 during repeated loads;
cache/rate-limit causes were suspected, not proven or repaired. Production
compilation does not resolve those runtime observations.

## Staff review and provenance

Start with the [AI Lab checklist](clarin-lv-content-review.md) for page links and
review questions. The [supporting record](clarin-lv-content-review-details.md)
retains detailed scope and open decisions. Source evidence remains in:

- [Policy migration](clarin-lv-policy-migration.md)
- [Language sources and translation status](clarin-lv-language-sources.md)
- [Help-page comparison](clarin-lv-help-review.md)
- [Deposit-guide adaptation](clarin-lv-deposit-source.md)
- [Logo and badge provenance](../src/assets/images/clarin-lv/README.md)

Staff must review both reused and newly translated text, operational promises and
real submission steps. LUMII/Arnis must decide on policy notice or renewed acceptance
before release. Test-server content becomes reviewable only after deployment.

## Local testing and next steps

Use the original checkout and the ops [local development runbook](../../clarin-dspace-ops/docs/local-development.md).
The existing environment is at `ready` in live-preview mode:
<https://repository.dev.test:8443/repository/>. Preserve data and saved authentication;
stop development before changing frontend branches. No initialization or reset is needed.

Continue owner testing and staff content review. Merge, release publication, ops
image selection and target deployment remain separate requested actions; no
deployment has occurred for this PR.

## Historical evidence

The [original audit and session record at the reviewed commit](https://github.com/LUMII-AILab/dspace-angular/blob/30474d509566ef816a90a98844fbc472501f8128/docs/clarin-lv-ui-plan.md)
preserves the October 28–31 observations, superseded proposals and test checkpoints.
Its resume instructions and permission statements are historical, not current tasks.
Raw audit captures/profiles remain outside application Git in `.ui-audit/`.
