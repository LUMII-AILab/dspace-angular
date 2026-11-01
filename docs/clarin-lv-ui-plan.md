# CLARIN-LV UI customization — review plan and session handoff

## Status: branding and EN/LV content implemented; change-focused validation and review handoff

Audit date: **2026-10-28**. Owner decisions: Corpus Search is `https://korpuss.lv/search`; reuse v5 assets where suitable; remove Czech branding/funding. **Latest approval supersedes the earlier policy deferral:** compare inherited v7 content against Latvian v5, migrate matching Latvia-specific policies, and record Czech-only/unmatched clauses for LUMII follow-up rather than inventing Latvian commitments.

Latest navigation requests implemented: **Help links now appear only in the header dropdown; Corpus Search opens in a new tab** with `noopener noreferrer` and an EN/LV screen-reader hint.

Owner visual inspection is approved and local commits are authorized. No new sign-in-guide route; retain existing login access. Push, PR creation, publication and deployment remain separate, unauthorized steps. Older proposal/deferral and uncommitted-state sections below are historical, not the current scope.

User owns Latvian UI customization. Preserve useful v5 content, particularly partners, certification, support and policy links, but use v7 layouts/components instead of copying old styling. Remove inappropriate centre identity, not legitimate software credit, licence text or resource metadata.

## Commit handoff — current

Owner approved visual inspection and requested focused local commits, with PR preparation afterwards. Branch: `feature/clarin-lv-ui-customization`; author: Eduards Lasmanis <lasmaniseduards@gmail.com>.

1. `da8dcd385` — `feat(ui): apply CLARIN-LV branding and navigation`: header/footer/home styling, partners/certification/assets and provenance, EN/LV UI labels, navigation and related tests.
2. `31ed641e2` — `feat(content): adapt CLARIN-LV policies and guides in English and Latvian`: nine EN/LV page pairs, shared Info privacy/terms templates and their tests. Default DSpace behavior is unchanged.
3. `docs: prepare AI Lab policy review and UI handoff`: this final documentation commit groups the plain-language checklist, full source evidence, translation/review questions, local/test links with VPN/hosts instructions and session checkpoint.

Existing final-source evidence: 15 focused unit tests, 27 customization browser checks, migrated-link checks and owner visual approval. No application edits were made while organizing commits; no broad tests were rerun. Local audit scripts/logs/profiles are outside this repository and excluded. The unrelated ops toolchain edit is untouched.

**Next:** provide commit breakdown, then draft the PR when requested. Do not push, create a PR or deploy merely because commits exist. Staff policy/translation review remains a post-PR assignment; test-server content becomes reviewable only after this build is deployed. The sections below preserve the development history and earlier validation, not instructions to repeat that work.

## Latest scope checkpoint — 2026-10-31 (pre-commit record)

**Owner narrowed scope: branding, visual/navigation edits and EN/LV policy/help content with AI Lab provenance/review handoff. Do not test or fix unrelated upstream UI features. This supersedes ALL older SSR/cache/history investigation and broad-test next steps below.**

- Removed our unrelated Contact feedback fix and cookie preferences behavior change, including their tests. Both now match HEAD.
- Removed our shared static-page loader rewrite and its tests/template edits; all three files now match HEAD. No custom routing, loading, scrolling/history or language-service behavior is introduced.
- Migrated content uses ordinary Angular-base-relative hrefs (`static/about#section`, `static/faq`, `contract`, etc.). New Help/About links use native base-relative hrefs so these content pages load through the existing loader without adding route-reuse logic. Existing language selector already reloads through DSpace's language workflow; it is unchanged.
- Keep shared EN/LV Info policy templates, logos/partners/certification, localized branding and Corpus Search new-tab behavior. Content/source/translation questions remain for AI Lab after the PR.
- Existing cache-language and rate-limit observations are recorded only, not branch blockers or work items. No more broad SSR probes, upstream navigation/history testing or infrastructure repairs.
- **Validation complete for this reduced scope:** 15 tests passed across five customization spec files (header, footer, shared LV links, privacy/terms presentation), exit 0. No contact, cookie-service, loader, search, authentication or submission regression suites.
- **27 focused live-preview browser checks passed, exit 0:** branding/partner/certificate images, corpus destination/new-tab protection, Help de-duplication, narrow layout, all nine EN/LV content pairs, namespaced hrefs, native Help navigation and shared Info presentation. An initial smoke caught our leftover native-link click handler returning false; removed it and reran successfully. No uncaught exceptions in the final smoke. Evidence: `.ui-audit/preview-customization-checks.json`.
- **122 migrated internal hrefs checked** across 18 fragments, with static target/fragment-ID verification; relative file links in all six review documents resolve. `git diff --check` passed; static loader, Contact and cookie-service files have no remaining diff against HEAD.
- `task start-dev` succeeded, preserving data. **Current runtime is live preview**, https://repository.dev.test:8443/repository/. No test/helper process is intentionally left running. Earlier production compilation predates this scope reduction; no new SSR build/probe is planned.
- Branch remains `feature/clarin-lv-ui-customization`, all uncommitted. Preserve ops toolchain pin edit. Staff register and related source documents now reflect unchanged default behavior and base-relative content links.

- Staff checklist now labels every local link **Local dev environment** and pairs it with a test-server link. It documents the VPN and `85.254.210.69 repository.clarin.lv` hosts entry, warns that this also redirects v5 source links, and states that revised content is available only after deploying this build. Documentation only: no actual hosts-file change or deployment.

### Next handoff, not another testing expansion

Owner visual inspection approved. The next authorized step is preparing for Arnis's eventual PR review; commit/push/PR authorization is still required. `docs/clarin-lv-content-review.md` is now a plain-language staff checklist: nine linked pages, two bullets each (how made / what to check), both-language review and post-PR AI Lab assignment. The full original register, exact sources/public URLs and technical validation are preserved in `docs/clarin-lv-content-review-details.md`. This was a documentation-only simplification; policy text and application code are unchanged. Do not restart the historical SSR/cache/history investigations below. No further code changes are planned unless review identifies a regression caused by this customization. No commit, push, PR, publication or deployment without authorization.

## Previous checkpoint — 2026-10-30, paused at owner token-limit request (historical)

**Resume here. SSR validation is NOT complete. No application code changed in this session.** Branch remains `feature/clarin-lv-ui-customization`; all customization and documents are uncommitted. No commit, push, PR, deployment, initialization or data reset. Preserve unrelated ops `dev/toolchain.json` edit (ops main is behind origin/main by four commits).

### Verified this session

- Read frontend/ops AGENTS and runbooks; `.dspace-skills` remains empty.
- `task status ENV=dev`: phase `ready`, all five services running and healthy. Previous `task start-dev MODE=ssr` completed successfully; **stack remains in SSR mode**, not live preview. Local URL: https://repository.dev.test:8443/repository/.
- `git diff --check` passed. Earlier 71 targeted unit tests, type-check/lint and 100 live-preview browser passes remain valid prior-session evidence; not rerun here.
- `/usr/bin/python3 .ui-audit/ssr-checks.py` **exited 1**: 24 responses HTTP 200, but all 11 LV policy/help/Info heading checks failed; EN checks passed. LV returned the same HTML byte counts as EN. The home check merely searches CLARIN-LV and does not establish localization. Evidence: `.ui-audit/ssr-raw-checks.json`, raw `.ui-audit/ssr-{en,lv}-*.html` captures.
- `node .ui-audit/local-ui-checks.cjs ssr languages` **exited 1**: passed through seven complete EN/LV page checks and EN Terms, then timed out waiting for LV Terms. Its report contains **HTTP 429 for JS chunks, brand assets and fonts**, so this is not yet evidence of a Terms-content regression. Evidence: `.ui-audit/ssr-languages-checks.json` (partial results and network errors).
- SSR policies and shell browser suites have **not** been rerun in this session.

### Investigation — observations, not permission to expand scope

- Existing `server.ts:getCacheKey()` returns only `req.url`, with no language-cookie variation. Tracked `config/config.yml` enables bot cache (2000 entries/one day) and anonymous cache (200 entries/10 seconds), both allowing stale responses. The raw probe uses Python's default user agent and requests identical URLs first in EN, then LV. **Shared SSR cache is the leading explanation, not yet confirmed experimentally**; request `Cache-Control: no-cache` does not bypass the existing application cache code.
- Existing `ServerCookieService.get()` supports the probe's plain `dsLanguage=lv` cookie; `LocaleService` reads it. No cookie-name correction is indicated.
- The browser helper disables cache and bypasses service workers to avoid the earlier stale audit-profile issue, but repeated full navigations/reloads create a large request burst. Existing Express rate limiting covers static resources too (`server.ts`); example/default limit is 500 requests/minute, actual runtime setting not checked yet. Do not disable rate limiting to obtain a pass.
- Attempted backup copies to `ssr-raw-shared-cache-checks.json` and `ssr-languages-rate-limited-checks.json` **failed with authorization channel closed**; do not assume backups exist. Original reports above remain the evidence to preserve before rerunning.

### Next actions, in order

1. Preserve the two failing audit reports outside Git before overwriting them. No need to repeat the content audit or migration.
2. Confirm shared-cache diagnosis with a small TLS-verified raw probe using distinct, fresh audit query keys per EN/LV request (same `dsLanguage` cookies). This is diagnostic cache isolation, NOT a new language URL feature or a repair. Strengthen the home assertion to check localized text. Record both normal-URL failure and isolated rendering results honestly. If isolated LV still fails, inspect the failing path before editing application code.
3. Split browser language tests into smaller bounded batches and allow rate-limit cooldown between batches; keep the isolated Chrome profile serial, normal TLS verification and existing per-run deadline. Preserve partial failure evidence. Do not run raw/browser request-heavy suites concurrently. Then run SSR policies and shell with appropriate cooldown. Do not implement custom history, cache or rate-limit changes as part of this UI branch.
4. If inherited SSR language-cache behavior is confirmed, record it explicitly for Arnis as a separate issue/acceptance limitation; browser client-side LV rendering does not prove the initial server HTML is localized. Do not describe all SSR checks as passed.
5. Review final diff and documentation links. Update `docs/clarin-lv-content-review.md` validation and copy-ready PR text with exact outcomes and limitations; currently its earlier pending text is superseded by the checkpoint note added this session.
6. Return to owner live preview using `task start-dev` from ops, after `task status ENV=dev`, serial lifecycle only. Preserve data; record final mode and verify preview. This switch has **not** happened yet.
7. Final owner report: branch scope, local preview, actual test results, staff review register and post-PR AILab content/legal/translation assignment. No commit/push/publication/deployment without permission.

No test, build or helper process is intentionally left running. The local application stack is still running in SSR mode.

## Previous progress — 2026-10-30, before final SSR checks (historical)

- **Fresh 71 targeted tests passed (exit 0); type-check and targeted lint passed.** This is after the scroll/history removal and final one-class-per-file EN/LV template split.
- **Fresh live-preview browser checks: 100 passed** across `languages` (56), `policies` (20), and `shell` (24). All nine EN/LV static pages and both Info views rendered the expected source headings, had correct internal namespace links, switched language and retained LV on reload. No uncaught browser exceptions.
- Browser harness was corrected to wait for new documents on reload and disable its stale cache/service worker. An initial check saw the older Deposit content from the reused audit profile; direct TLS-verified HTTP confirmed current content. Final browser results use fresh network content, not stale artifacts.
- Inherited async scroll behavior is **observed, not repaired or falsely passed**: direct reload can leave the anchor below the viewport, and Back can restore top rather than prior reading position. URL/content navigation works. Recorded in `preview-policies-checks.json` under `scrollObservations`.
- `task start-dev MODE=ssr` is now running as the sole lifecycle action. After success, raw SSR probes must run with explicit public dev CA and both dsLanguage cookies, followed by SSR browser checks. Return to live preview for review afterwards. All changes remain uncommitted; no deployment.

- Custom scroll/history handling is removed; do not reintroduce it. Global Angular router behavior is unchanged.
- Interrupted LV source review completed; all nine page pairs exist. `docs/clarin-lv-language-sources.md` distinguishes reused v5 LV text from AI-assisted drafts and flags inherited errors for post-PR review.
- **Consolidated staff register created:** `docs/clarin-lv-content-review.md`, with local/intended-public links, EN/LV source files, provenance, adaptations, unchanged linked dynamic/external policies and copy-ready post-PR AILab review text. Runtime validation still marked pending there.
- `/info/privacy` and `/info/end-user-agreement` now select thin compile-time EN/LV template components using existing TranslateService language. Source fragments remain shared with static routes; no new fetch/navigation/consent logic. Four small language wrapper files satisfy the repository's one-class-per-file lint rule.
- Initial reduced-scope + EN/LV unit run: 71 passed. That run preceded the one-class-per-file split; a fresh run/type-check/lint and live-preview startup are in progress. Browser tests need an EN/LV content batch and must record inherited scroll quirks as observations, not custom-history requirements.
- Remaining: fresh test results, browser language checks, SSR raw/rendered validation, update older provenance statements and the review register's validation status, final checkpoint/report. No commits/push/deployment.

## Previous handoff — 2026-10-30 (historical; current progress above supersedes completed steps)

### Latest owner requirements

- Keep this branch to UI/branding and relevant page-content migration. **No custom scroll/history mechanism.**
- Maintain a **single AILab staff review register** of every added/modified/linked policy and guide, with rendered links, EN/LV availability, source URLs/files, how content was assembled/adapted, and open questions.
- **Both English and Latvian options must exist**, including the existing `/info/privacy` and `/info/end-user-agreement` screens—not merely translated navigation labels or silent English fallback.
- Staff content/policy review is planned **after this PR**, and that follow-up must be explicitly noted in the eventual PR description. Do not describe current text/translations as legally approved. No commit/push/PR creation/deployment authorized.

### Work completed since the previous checkpoint

1. **Custom scrolling removed:** helper completed cleanup of `src/app/static-page/static-page.component.ts` and its spec. All added `ViewportScroller`, Router `Scroll`, scroll state and post-render scrolling removed; no global router edits. Namespace href normalization and needed route/locale refresh remain. Scoped whitespace check passed, but no fresh Angular/browser tests have run after cleanup.
2. **Live Czech v7 guide is newer than our old checkout.** Verified public https://lindat.mff.cuni.cz/repository/static/deposit has updated v7 instructions. All ten live screenshot files differ from local legacy assets and were visually inspected; none were retained because of foreign branding, collection-specific forms and unverified reuse rights. Do not repeat the earlier claim that the Czech live site still has v5 screenshots.
3. **EN/LV Deposit guide updated:** `src/static-files/deposit.html` and `lv/deposit.html` now adapt that live guide, source-checking controls against local v7 templates and qualifying configuration-dependent behavior. Detailed source, adaptations, screenshot decisions and post-PR review gaps: **`docs/clarin-lv-deposit-source.md`**. No authenticated submission testing performed.
4. **LV policy/help files saved, but interrupted before completion review:** directory now contains all nine files: `about`, `cite`, `cookies`, `deposit`, `faq`, `item-lifecycle`, `metadata`, `privacy-policy`, `terms-of-service`. The LV helper was cancelled by the token-limit interruption; **its final report and `docs/clarin-lv-language-sources.md` are missing**. Inspect its saved content/provenance artifacts before claiming translations verified. Do not overwrite/retranslate blindly.
5. Verified live v5 **does have Latvian privacy and deposit content** at `/repository/xmlui/page/NAME?locale-attribute=lv`; earlier EN-only source assumptions are superseded. V5 LV privacy has an obvious `PASSENGER-LV` heading typo; correct brand to CLARIN-LV and document. Other questionable translation/legal wording requires staff review, not invented commitments.
6. Branch unchanged: `feature/clarin-lv-ui-customization`. All work saved and uncommitted; `git diff --check` passed at this pause. No tests/build/lifecycle operations run in this latest content batch. Last known stack mode: SSR with an older compiled bundle; it does **not** include the latest cleanup/LV/deposit edits.

### Next actions — follow this list, not obsolete tasks below

1. Read relevant AGENTS and Git status. Preserve current work and unrelated ops pin changes. No ongoing helper work is expected.
2. Finish interrupted LV content/provenance review. Resume helper session `682ad427-cd65-4ad4-b83f-076ff12d7c3f` if available, narrowly asking it to finish `docs/clarin-lv-language-sources.md` and review its saved seven LV files (exclusive scope excluding about/deposit). Prefer actual v5 translations; explicitly identify AI-assisted draft translations/adaptations for post-PR AILab review. Ensure matching omissions/links vs approved EN pages and no copied shell/scripts/old screenshots. Existing `lv/about` came from v5; deposit has separate provenance.
3. **Wire both languages into `/info` privacy/terms.** Current components still compile EN-only static files directly; merely adding `lv/*.html` does not localize those two screens. Use the smallest presentation-only reuse of the EN/LV source fragments, with existing language selection. No changes to consent, acceptance guards, backend, routing/history or legal-policy versions. An option to assess—not implemented—is thin EN/LV template components selected by the current TranslateService language, avoiding a new fetch/navigation engine or duplicated legal text. Add focused language-switch tests.
4. Create the consolidated review register, suggested `docs/clarin-lv-content-review.md`. Include all nine policy/help pages, `/info/privacy`, `/info/end-user-agreement`, and linked Contact, collection distribution agreement (`/contract`), resource licences (`/licenses`) and upstream new-version guide. Distinguish modified text, shared views and unchanged linked dynamic/legal content. For each include v7 route, local rendered URL, intended public URL (not yet deployed), EN/LV source-file links, source URL(s), reuse vs adaptation vs translation, and staff review questions. **EN/LV use the same rendered route with the existing language selector; do not invent unsupported `?lang=` URLs.** Confirm both actually render before marking complete.
5. Add a feature-specific PR handoff/description draft (or a clearly labelled section in the register) that explicitly assigns **post-PR AILab policy/guide/translation review**. Do not modify a global PR template unnecessarily or create a PR. Include unresolved operational promises, consent/version rollout decision and untested authenticated workflow. Review after PR does not mean legal approval or production acceptance has already happened.
6. Bring existing docs up to date: remove obsolete post-render-scroll claims from `clarin-lv-policy-migration.md`, replace EN-only fallback claims after actual integration, link the consolidated review register and deposit provenance. Treat older deposit condensation in `clarin-lv-help-review.md` as superseded by the new guide.
7. Run nine-spec harness `python3 .ui-audit/run-ui-unit-tests.py`, container type-check/lint, and bounded browser checks. Add/assert EN/LV content for all changed routes and `/info` views. Classify inherited async scroll quirks as separate observations, not failed scope requirements to fix with new machinery. Rebuild local SSR only after source tests pass; use explicit dev CA for `.ui-audit/ssr-checks.py`. Current raw-SSR probe with explicit CA is still unrun.
8. Checkpoint after each batch. Finish with precise changed-content/test summary and owner visual review request, without committing/pushing/deploying or changing repository data.

Completed helper sessions: static cleanup `c785929b-fbd1-43dc-9ba2-c764c3101d74`; updated deposit `9aef59be-aa1a-41cd-a4a8-31738c24d856`. Interrupted LV helper `682ad427-cd65-4ad4-b83f-076ff12d7c3f`. Its files exist, but its provenance document does not.

## Earlier handoff — 2026-10-30 (historical; latest section above supersedes)

### Latest scope decision — supersedes scrolling work below

The owner correctly questioned why a policy-content migration was adding navigation/history logic. We agreed to **back out the added custom scroll/history handling**, rely on Angular's existing `scrollPositionRestoration: 'enabled'` and `anchorScrolling: 'enabled'` (`src/app/app-routing.module.ts:295–296`), keep approved text/UI work and only narrowly necessary link corrections, and record inherited async-page scrolling limitations separately for Arnis. **Do not continue implementing a custom history mechanism.**

### Actual state at pause

- Branch is still `feature/clarin-lv-ui-customization`; everything is saved but **uncommitted**, including checkpoint documents. No push, PR, publication or deployment.
- **The rollback has NOT been performed yet.** The cancelled static-loader helper nevertheless wrote a further implementation into the working tree. Current `static-page.component.ts` contains `ViewportScroller`, Router `Scroll`, `navigationId`, `scrollEvent`, `contentScrollPending`, a router-event subscription and `scrollAfterRender()`. Its spec has corresponding additional tests. Treat these latest edits as unvalidated and remove the out-of-scope scroll machinery rather than polishing it.
- Last verified `task status ENV=dev`: all five services running and healthy, phase `ready`. Stack is in **SSR mode**, using the previous compiled bundle, NOT the latest unbuilt history-handling edits. Live preview is `https://repository.dev.test:8443/repository/`; do not confuse working-tree state with the running SSR bundle.
- `git diff --check` passed at pause. No background agent or test process is intentionally running.

### Next session — ordered, bounded steps

1. Read this top section, repository instructions and Git status. Preserve all approved customization and the unrelated ops `dev/toolchain.json` edit. Do not reset the repo or repeat the v5 audit.
2. **Reduce the static-page change to the agreed scope.** Compare against `git show HEAD:src/app/static-page/static-page.component.ts` and its HTML/spec. Remove our `ViewportScroller`/`Scroll` imports/injection, scroll bookkeeping, `scrollAfterRender()` and any earlier unconditional `scrollToAnchor` call. Remove tests of custom scroll behavior. Do not change global Angular router settings. Review the remaining route/locale/loading changes critically: keep only fixes demonstrably necessary for the approved migrated links/content, not a broader loader rewrite. Keep real hrefs correct under `/repository/`, including new-tab behavior, without inventing history state. **Do not blindly restore all three files:** that would also discard valid namespace/link corrections and tests.
3. Update documentation to match the reduced scope. `docs/clarin-lv-policy-migration.md` currently says the loader scrolls after rendering; remove that claim once the code is removed. Its content migration and LUMII follow-up inventory remain useful. Keep `docs/clarin-lv-help-review.md`. Record the inherited asynchronously loaded-page anchor/history limitation as a separate issue rather than a blocker that invites new code in this feature.
4. Run targeted tests using the now-working **local-only** harness: `python3 .ui-audit/run-ui-unit-tests.py` from workspace root. It runs nine spec files with pinned container dependencies and workstation Chrome; 240s total budget, clean managed-server/container cleanup, authoritative nonempty Karma aggregate. It writes `ui-unit-tests.result.json`, `ui-unit-tests.karma.json`, and `.log`. Do not reinstall dependencies or extend timeout automatically.
5. Run container type-check and targeted ESLint, then browser checks against the reduced source. `task start-dev` switches back to live preview without deleting data; inspect status first and run lifecycle actions serially. Browser helper: `node .ui-audit/local-ui-checks.cjs preview shell` / `preview policies`. It saves each assertion immediately. Adjust its custom scrolling acceptance assertions to the agreed scope: keep URL/link/navigation checks, report inherited scroll quirks separately—do not falsely mark them passed or add code merely to satisfy them.
6. Rebuild SSR with `task start-dev MODE=ssr` after source changes, then run browser smoke checks and `/usr/bin/python3 .ui-audit/ssr-checks.py`. The raw-HTML script initially failed default Python TLS trust; it now explicitly trusts the prepared **public** `~/.config/clarin-dspace/dev/frontend/ca.crt`. **That corrected probe has not run yet.** Keep certificate verification enabled and never read/share private keys.
7. Return to live preview (`task start-dev`) if appropriate for owner review; record final mode and test results here. Do not initialize/reset the empty repository or create data/accounts. Finish with a concise owner-facing summary and visual review request. No commits/push/deployment unless explicitly requested.

### Validation evidence — do not overstate freshness

- **72 Angular tests passed, exit 0**, before the final cancelled helper's history changes. Type-check passed; lint had zero errors and two pre-existing cookie-service/spec warnings in untouched lines. These results must be refreshed after the scope reduction.
- **24/24 browser shell checks passed** in live-preview and SSR: language/title/footer/destinations/persistence, menu keyboard and mobile widths 320/390/768, no horizontal overflow, cookie dialog, assets, Browse/back/forward/Search rendering, no uncaught exceptions.
- **19/19 initial SSR policy/contact checks passed** on the prior bundle. Added reading-position history test then reproduced a failure: saved position ~1857px restored to anchor ~1630px. Latest `ssr-policies-checks.json` therefore includes a failure; it does NOT represent a wholly passing latest run. The owner chose scope reduction rather than a custom history fix.
- Browser evidence: `.ui-audit/{preview,ssr}-{shell,policies}-checks.json`; screenshots `*-home-en.png`, `*-mobile-lv.png`. Local profiles/logs/raw captures remain outside Git.
- Source fixes to retain: footer Help de-duplication, Corpus Search new-tab attributes, shared migrated privacy/terms templates, Contact feedback root route, cookie preferences `show(config, true)` with a no-consent-write regression test, approved branding/partner/assets/text/help changes.
- Remaining review/acceptance gaps: LUMII policy applicability and consent rollout/version decision; English-only privacy/terms fallback; authenticated account/submission/download behavior untested (local dataset empty); existing Matomo/root-favicon/missing search-config HTTP 404s. Do not silently expand this patch to repair those systems.

Useful completed sessions only if a focused question is needed: static-loader `c785929b-fbd1-43dc-9ba2-c764c3101d74` (latest request cancelled after edits); unit harness `353d264c-caae-4a8b-bcf4-df04ccd80fab`; read-only review `35943f8d-02aa-4db6-88a3-1194d4ff17fb`. No new delegation is needed to resume.

## Prior checkpoint — 2026-10-30 (historical; latest scope decision above controls)

- **72 targeted Angular tests passed; harness exit 0**, nine spec files including contact, cookie preferences and static deep-link regressions. Corrected local-only harness uses the standard Karma runner plus a complete nonempty aggregate; managed-server cleanup succeeded. `.ui-audit/ui-unit-tests.result.json` records the authoritative result. Earlier timeout caveat is resolved for this run (historical results below remain).
- **24/24 live-preview shell browser checks passed**: EN/LV titles/footer/destinations, locale persistence, Help-only-in-header, new-tab attributes, dropdown keyboard focus/Escape, mobile 320/390/768 widths with no overflow, menu focus restoration, cookie preferences, brand/certificate images, browse/back/forward/search rendering. `.ui-audit/preview-shell-checks.json` and screenshots retain evidence.
- **18/18 live-preview policy browser checks passed** in the preceding batch: all nine policy/help routes, real anchor hrefs and scrolling, deep-link reload, Latvian About and shared `/info` policies. `.ui-audit/preview-policies-checks.json`. No uncaught browser exceptions. Contact feedback root link corrected after discovering `/contact/info/feedback`; new unit regression passes, final browser recheck pending.
- Cookie preferences now call Klaro `show(config, true)` explicitly: previously the footer button showed only the initial notice for a visitor without consent. No consent is changed by opening the dialog; unit test verifies no cookie/account write.
- Container TypeScript check passed again. Targeted lint: zero errors; two pre-existing warnings in unrelated lines of cookie service/spec remain (floating promise and any-typed concatenation), not silently changed.
- Local stack was stopped overnight; `task start-dev` succeeded again, preserving ready data/configuration. **`task start-dev MODE=ssr` then succeeded** (production build/SSR startup). Local stack is currently in SSR mode; next verify raw server HTML and browser behavior, then return to live preview. Do not start any production operation.
- Known browser HTTP failures: existing `repository/matomo.js` and root `favicon.ico` 404s; search also requests missing `bulkedit.export.max.items` config. These are not brand/certificate asset failures; record for ops/upstream follow-up rather than broadening this UI patch.

### In-progress SSR follow-up — 2026-10-30

- SSR mode build/start succeeded; initial browser reruns passed 24 shell and 19 policy/contact checks, including corrected feedback href.
- Added an additional history-position regression after code review. **Confirmed failing**: About#preservation-policy → scroll farther → header FAQ → Back restores the anchor (~1630px), not saved position (~1857px). Fix delegated to static-loader session; requires fresh unit/browser checks and rebuilt SSR before final acceptance. Existing direct-anchor/reload checks pass.
- Raw HTTP SSR probe initially failed TLS trust in Python (browser already trusted). `.ui-audit/ssr-checks.py` now explicitly uses the prepared public `dev/frontend/ca.crt`, retaining certificate verification; rerun pending.
- Current stack remains SSR until an explicitly recorded switch. Do not claim final SSR acceptance yet.

### Earlier 2026-10-29 checkpoint (superseded by results above)

- Footer Help de-duplication and Corpus Search new-tab behavior implemented, with updated unit tests and translations.
- `/info/privacy` and `/info/end-user-agreement` now compile the same migrated static privacy/terms files; replaced obsolete component templates removed after successful compilation/tests. No consent guards or authentication logic changed. Terms-to-privacy link is base-relative `static/privacy-policy`, valid on both route families.
- Static loader now normalizes actual hrefs SSR-safely before rendering (including native new-tab/fragment links), updates on reused routes/language changes, ignores stale responses, and cleans up subscriptions. New regression coverage added.
- FAQ/deposit adapted against v5: stale screenshots, XMLUI-specific clicks, Czech search examples and unverified LRT promise removed; matching policy substance retained. Cookie help now points to existing controls/privacy rather than making obsolete tracker/Safe Harbor assertions. See `docs/clarin-lv-help-review.md` for exact changes and LUMII follow-ups.
- `task status ENV=dev` found the ready stack stopped; `task start-dev` succeeded without reinitialization. Live preview running.
- Container type-check passed. Targeted lint had no errors and four warnings; their causes were subsequently corrected, rerun pending.
- **44 targeted tests passed** (header/footer/links/static loader/HTML service/privacy/terms), but manual-browser Karma shutdown hung until the local harness's 240s timeout. This is NOT a clean command exit. `.ui-audit/ui-unit-tests.log` contains the full completed test results and shutdown warning. No longer timeout has been requested/run.
- Updated local homepage browser capture rendered successfully; screenshot visually reviewed. Header/footer layout and new local assets look correct at desktop width, but this is not interaction acceptance. Screenshot: workspace `.ui-audit/local-browser.png`.
- Owner requested continuing tests while allowance remains, with recoverable checkpoints. Source changes are saved, all uncommitted. No commits/push/deployment. No background agent is working. Local live preview is running.
- Latest container type-check and targeted ESLint rerun both passed with no warnings/errors.
- Browser helper now completed at `.ui-audit/local-ui-checks.cjs` (the attempted rename was cancelled; no `.incomplete` file exists). Run `node .ui-audit/local-ui-checks.cjs preview shell` or `preview policies` from workspace root. Each check is checkpointed immediately into `preview-{shell,policies}-checks.json`. Helper uses an isolated browser profile and a 150s deadline; it can change only that profile's locale/cookie preferences, never repository data.

### Resume here — remaining work only

1. Read frontend/ops instructions and Git status; preserve the current feature branch and unrelated ops pin edit. Do not repeat the v5/v7 content audit.
2. Rerun targeted container lint after the four warning fixes (return the `compileComponents()` promise in both policy specs; definite-assignment variables in the static-page spec). The container TypeScript check already passed before these trivial fixes.
3. Finish browser-interaction checks. Use the now-complete `.ui-audit/local-ui-checks.cjs` and read its incrementally saved results before rerunning a batch. Check EN/LV, mobile dropdown/focus/Escape/overflow, policy hrefs/anchors, direct reload and back/forward, header Help routes, new-tab behavior, cookie controls, images and network/runtime errors. Existing `.ui-audit/browser-audit.cjs local` still works for captures.
4. The targeted unit harness `.ui-audit/run-ui-unit-tests.py` now includes seven spec files and reports 44 passes, but hangs during manual Chrome shutdown until its 240s cap. Do not call that a clean exit or increase the timeout without the owner choosing to do so. If fixing the external harness, preserve actual Karma failure reporting rather than forcing success. Unit log is `.ui-audit/ui-unit-tests.log`.
5. Run documented production/SSR validation serially, after browser checks: `task status ENV=dev`, then `task start-dev MODE=ssr` (rebuilds production) or `scripts/development.py build` as appropriate. Verify server-rendered policy content and links; return to live preview with `task start-dev` if successful. No initialization/reset or data fixtures.
6. Update `docs/clarin-lv-policy-migration.md`: its original write-scope section still describes only the earlier content subtask. Add shared `/info` template integration, removal of generic DSpace boilerplate, actual-href normalization, terms link now `static/privacy-policy`, and link to new `docs/clarin-lv-help-review.md`. No legal consent/version/guard logic was changed; LUMII must decide acceptance/version rollout separately. English privacy/terms fallback is deliberate; only About has a migrated Latvian translation.
7. Review diffs and run final `git diff --check`. Then report exact tests passed vs gaps, local preview URL, remaining LUMII policy/operational follow-ups and no publication. Record final state here.

Completed helper sessions (no ongoing work): static navigation `c785929b-fbd1-43dc-9ba2-c764c3101d74`; help content `dc8a664d-6548-4ba7-b0fc-c1ac48e84bd7`. Reuse only for a focused follow-up if necessary. No need to repeat their comparisons.

## Previous checkpoint — 2026-10-28 (historical next-actions below are superseded where completed above)

### Implemented, all uncommitted

- Shared EN/LV partner/navigation links; CLARIN-LV themed header with responsive dropdowns; localized footer with seven Latvian partners, support, Latvia B-centre/CoreTrustSeal links and retained software/icon attribution; homepage logos and EN/LV titles. Bundled original v5 logo/badges with provenance.
- Policy migration added in this session: updated `src/static-files/{about,metadata,cite,item-lifecycle,terms-of-service}.html`; added `privacy-policy.html` and genuinely translated `lv/about.html`. See **[policy comparison and follow-up record](clarin-lv-policy-migration.md)** for exact sources, changes, unmatched clauses and LUMII review items. Terms already existed; privacy is new.
- Comparison evidence: citation/lifecycle originally matched v5 (including stale LINDAT references); metadata differed mainly in name, all 89 table cells matched; terms had 21/23 matching paragraphs with unresolved local placeholders in the other two. About shares substantial text but Czech-only institutional history and ten-year guarantee are NOT Latvian policies. Those clauses were omitted and documented, not renamed to LUMII.
- Policy migration is source-content work, NOT legal/operational approval. Existing v5 retention, backups, licences, metadata mappings etc. still need LUMII verification. No new Latvian legal translation was invented.
- Logo is 141×48: suitable at native display size; vector/higher-resolution artwork would be needed for enlargement. Default favicon unchanged.

### Validation and environment

- Local `task start-dev` previously succeeded; live-preview stack was left running with data preserved at `https://repository.dev.test:8443/repository/`. Verify status before further lifecycle actions. Initial Chrome shell rendering succeeded. Empty local repository limits record/download/submission acceptance.
- Before the latest policy edits: `scripts/development.py test` (configuration tests only), container `tsc --noEmit -p tsconfig.spec.json`, targeted ESLint passed.
- Angular targeted shell tests: **11 tests passed**, using `.ui-audit/run-ui-unit-tests.py` with `--source-map=false` to avoid the pre-existing `sourceMap.hidden` schema incompatibility. The run also printed a Chrome disconnect message during shutdown; do not hide this caveat. Shared Angular configuration was not changed.
- Policy migration subagent reported text/HTML/anchor/link and scoped whitespace checks passed; parent has inspected the migration record and selected source files, but **Angular/browser/SSR checks have NOT been rerun after policy edits**.
- No production compilation/SSR validation or full implementation browser-interaction testing yet. Audit helpers/logs/profiles remain outside Git in workspace `.ui-audit/`.

### Exact next actions — do not repeat the full audit

1. Remove footer Help duplication: remove `*ngFor` using `helpLinks` in `src/app/footer/footer.component.html`; remove its constant import/property from `.ts`; adjust footer spec to assert the Help destinations are absent there. Keep header dropdown and footer policy/cookie/support/partner links. Consider changing the footer heading from repository/help if it no longer fits.
2. In `src/themes/dspace/app/header/header.component.html`, add `target="_blank" rel="noopener noreferrer"` to `[href]="corpusSearch"`, and test this in the header spec. This request is approved but not implemented.
3. **Integrate the migrated policies into existing `/info` pages.** `/info/privacy` and `/info/end-user-agreement` still render unrelated generic DSpace boilerplate from their `*-content.component.html` templates. They are used by cookie/acceptance flows, so linking About to new static policies alone is incomplete. Reuse a single source of truth; preserve guards, consent/versioning behavior and cookie controls. No code changes to these components yet.
   - A possible minimal approach (not implemented/validated): point the two content components' `templateUrl` to `../../../../static-files/privacy-policy.html` and `../../../../static-files/terms-of-service.html`, removing replaced obsolete templates only after tests. Policies are English except About, so existing EN fallback is deliberate. Ensure the terms-to-privacy link also works when rendered at `/info/...`, not only `/static/...`. Do not duplicate full legal text or change authentication behavior.
4. **Check static navigation before claiming it works.** `StaticPageComponent` currently intercepts only dot-relative links on ordinary clicks, and resolves them at `/repository/static/`; the migrated fragments use `./name`, `../contract`, `../licenses`, and `#id`. Native new-tab/context-menu links and fragment links may resolve against Angular's `<base href="/repository/">` incorrectly. Fix the root href handling if reproduced, with tests and SSR-safe code, while preserving external/resource-licence links. Also check switching between static routes and EN/LV without full reload: loader currently initializes in `ngOnInit` only.
5. FAQ/deposit content is unchanged. Assess which policies embedded there match v5 and any leftover Czech branding/legacy instructions; do not fabricate v7 workflow steps. `src/static-files/cookies.html` has unmatched/outdated DiscoJuice, analytics/Piwik/Safe Harbor assertions; record this explicitly for LUMII follow-up rather than asserting current usage. Existing `/info` boilerplate differences also need a migration-record entry.
6. Update `docs/clarin-lv-policy-migration.md` to cover integration work; its initial scope describes only the content subtask. Do not claim unavailable Latvian privacy/terms translations have been migrated.
7. Rerun targeted header/footer/shared/policy/static-loader specs, container type-check and targeted lint. Complete local browser EN/LV, mobile/keyboard, anchors, deep-link/reload/back-forward, cookie, images and network checks. Then documented production build/SSR validation, serial lifecycle actions only. No initialization/reset or fixture creation without scope.
8. Review full diff, record exact results/gaps, and present for owner visual review / Arnis PR review. No commits, pushes or deployment.

Delegated policy work session: `608402c4-0f6f-409b-b034-4d694aab2569` (completed). Its exclusive write scope was the seven static policy fragments plus policy migration document. No other agent is currently working. Earlier read-only review delegation was cancelled and produced no findings.

## Workspace and continuity

- Frontend branch: **`feature/clarin-lv-ui-customization`**, created from `clarin-v7` at `f0f980620c752f5842a1749b22ab7a9ac660f2b0`.
- During audit only this plan was added. Implementation now proceeds on the same feature branch; inspect Git status for current edits. No commits or pushes are authorized.
- Preserve the separate uncommitted ops `dev/toolchain.json` change from earlier dependency setup. Upstream has a different fix; reconciling it is outside this UI audit.
- Other repository updates were fetched, not merged. For latest migration status use fetched workbook `origin/main`, not its older checked-out files.
- At audit start, local development checkpoint was `ready`, all application services stopped. No local stack was started or reinitialized.
- Frontend `.dspace-skills` is empty. Follow frontend/ops `AGENTS.md`, local-development runbook and relevant public guides.
- User removed `85.254.210.69 repository.clarin.lv` from `/etc/hosts` and flushed caches. Verified public DNS now resolves to **`92.240.80.87`**, serving v5.
- v5: `https://repository.clarin.lv/repository/xmlui/` through normal DNS.
- v7: `https://repository.clarin.lv/repository/` with a **per-request/browser** address override to `85.254.210.69`, over VPN. Keep the system-wide override removed. TLS validation was retained.
- Audit artifacts are outside application Git, in workspace-parent `.ui-audit/`: legacy HTML snapshots, `v5-browser.png`, `v7-browser.png`, `v7-mobile.png`, browser DOM/link inventories, route probes and a bounded CDP helper `browser-audit.cjs`. Do not commit browser profiles, logs or raw captures.

## Evidence and limitations

- Both live homepages rendered in Chrome. The v7 browser completed its ordinary Anubis challenge; no security controls or certificates were bypassed.
- Inspected legacy EN/LV homepage/footer, EN About, FAQ, Deposit, Cite, Submission Lifecycle, Sign-in, Privacy, Terms and Metadata pages, plus LV About.
- Inspected v7 rendered header/footer/homepage, live EN→LV switching, narrow viewport, route responses and public configuration, along with source components/static pages.
- Active v7 theme is `dspace`; active languages EN/LV, default EN. Do not mistake inactive sample themes or historical translation comments for rendered UI.
- No authenticated sessions, submissions, mail tests, downloads of repository datasets, deployments or backend changes were performed.
- These are baseline observations, NOT a claim that the full UI or future changes pass acceptance.

## 1. Preserve and adapt the Latvian footer (proposed: required)

Use a responsive footer with three clearly labelled areas: **Partners, coordination and funding**, **Repository/help**, and **CLARIN/certification**. Translate headings and link labels; do not hardcode English-only text.

### Exact partner inventory from v5

| English label | Latvian label | Existing EN destination | Existing LV destination |
| --- | --- | --- | --- |
| Institute of Mathematics and Computer Science of the University of Latvia | Latvijas Universitātes Matemātikas un informātikas institūts | `http://www.lumii.lv/?lang=en` | `http://www.lumii.lv` |
| Institute of Literature, Folklore and Art of the University of Latvia | Latvijas Universitātes Literatūras, folkloras un mākslas institūts | `http://lulfmi.lv/en/` | `http://lulfmi.lv` |
| University of Latvia | Latvijas Universitāte | `https://www.lu.lv/en/` | `https://www.lu.lv` |
| Rīga Stradiņš University | Rīgas Stradiņa universitāte | `https://www.rsu.lv/en` | `https://www.rsu.lv` |
| RTU Liepaja Academy | RTU Liepājas akadēmija | `https://www.rtu.lv/en/liepaja` | `https://www.rtu.lv/lv/liepaja` |
| RTU Rezekne Academy | RTU Rēzeknes akadēmija | `https://www.rtu.lv/en/rezekne` | `https://www.rtu.lv/lv/rezekne` |
| National Library of Latvia | Latvijas Nacionālā bibliotēka | `https://www.lnb.lv/en` | `https://www.lnb.lv` |

Prefer verified HTTPS equivalents. `https://www.lumii.lv/?lang=en` and `https://lulfmi.lv/en/` returned HTTP 200 (the latter redirects to `/en`). Recheck all final destinations during implementation. Preserve existing names unless the owner supplies updated official wording; do not invent funder affiliations or extra logos.

### Repository/support links

| v5 content | Proposed v7 mapping |
| --- | --- |
| Main page | Angular home route (`/home`, rendered under `/repository/`), not bare `/` |
| Contact | Local `/contact`, with optional separate link to CLARIN-LV portal contacts |
| Help Desk | `mailto:info@clarin.lv`; verify backend-driven `lr.help.mail` agrees rather than silently changing server config |
| Submission Lifecycle | `/static/item-lifecycle` with v7 instructions |
| FAQ | `/static/faq` |
| About and Policies | `/static/about` |
| How to Sign in | Add `/static/how-to-sign-up` or equivalent existing help section, adapted to v7 institutional/local login |
| CLARIN | `https://www.clarin.eu/` |
| Deposit, Cite, Metadata | Keep accessible from Help and relevant policy pages, using `/static/deposit`, `/static/cite`, `/static/metadata` |

Legacy portal contact destinations: EN `http://clarin.lv/en-us/contacts`; LV `https://www.clarin.lv/lv/kontakti`. HTTPS EN/LV versions on `www.clarin.lv` returned HTTP 200 during audit.

## 2. Preserve the correct certification, not Czech certificates (required; owner verifies applicability)

- **CoreTrustSeal:** preserve the Latvia seal and the exact current v5 certificate destination:
  `https://office.clarin.eu/v/CE-2026-2681-2029-04-21-CLARIN-LVrepository-CoreTrustSealRequirements2023-2025.pdf`
- v5 logo asset: `/common/public/img/CoreTrustSeal.png` on production. Prefer a locally bundled approved asset with useful alt text; no hotlink to a Czech centre.
- **CLARIN B-centre:** preserve badge and Latvia certificate:
  `https://www.clarin.eu/sites/default/files/B-centre-certificate_CLARIN-LV.pdf`
- Both certificate links returned HTTP 200. This verifies availability, not certification scope; Arnis/owner should confirm continued use for the migrated service.
- Remove the current v7 **K-centre badge** unless a separate Latvian entitlement is confirmed; v5 did not show one.
- Replace current v7 CoreTrustSeal link `https://hdl.handle.net/11234/6-CTS` (Czech repository), not simply its label.

## 3. Replace centre branding throughout the visible shell (required)

- Replace LINDAT/CLARIAH-CZ header and homepage logos with approved CLARIN-LV branding. Reuse v5's existing logo if no preferred original/vector asset is supplied.
- Keep appropriate CLARIN ERIC branding/link, with accurate alt text. Current homepage incorrectly gives the CLARIN logo LINDAT alt text.
- Make the main repository brand link return to the v7 home route, not `/` or `/lindat`.
- Correct browser titles and metadata prefixes in EN/LV:
  - Current EN: `LINDAT/CLARIAH-CZ Repository Home`.
  - Current LV after switching: `DSpace Repository :: DSpace Angular :: Sākums`.
  - Proposed: `CLARIN-LV Repository — Home` / `CLARIN-LV repozitorijs — Sākums`, with page-specific suffixes.
- Review favicon/apple-touch icon/webmanifest branding. Current public config points to default DSpace assets; use CLARIN-LV assets consistently if approved.
- No need to recreate v5's exact colour scheme or layout. Keep useful dynamic v7 content and responsive styling.

## 4. Simplify and fix primary navigation (required)

Proposed navigation: **Repository · Browse · Corpus Search · Help · About**, plus EN/LV and existing account controls.

- Repository → `/home`.
- Browse → `/community-list` (or owner-approved search entry); existing home search/advanced search remains.
- Corpus Search → existing Latvian KonText service, **destination needs confirmation** (see blocker below).
- Help dropdown → Deposit, Cite, FAQ, Submission Lifecycle, Sign-in guide, Contact.
- About → distinguish local repository/policies from external CLARIN-LV portal (`https://www.clarin.lv/en-us/`, corresponding LV destination to verify).
- Keep login/profile/logout and session-loading behavior intact; no authentication redesign.
- Remove inherited Education/Projects/Tools/Services and Czech About dropdown entries unless the owner supplies actual Latvian destinations. Retain genuinely useful destinations, not empty placeholder links.
- Remove DARIAH badge/participation links by default as inherited centre branding, unless the owner confirms they should represent this repository.
- Implement dropdown/mobile state through Angular-supported bindings/components; avoid inline DOM `onclick` toggles. Ensure keyboard support and correct expanded-state announcements.

### Confirmed live v7 broken targets

| Current link | Live response |
| --- | --- |
| Catalog → `/services/catalog` | HTTP 404 |
| Services → `/en/services` | HTTP 404 |
| About → Partners → `/partners` | HTTP 404 |
| Mission Statement → `/files/mission-en.pdf` | HTTP 404 |
| Homepage LINDAT logo → `/lindat` | HTTP 404 |

Other inherited root-level links (`/#education`, `/#projects`, `/#tools`, `/integration`, `/partnership`) are inappropriate Czech-portal destinations and must be reviewed/replaced, not claimed individually tested here.

## 5. Remove misleading Czech institutional content (required)

From the active footer, remove/replace:

- LINDAT flyer, mission, advisory board, events, acknowledgements and service-status links.
- Czech partner list: Charles University, Masaryk University, University of West Bohemia, Terezín bodies, Czech Academy institutions and Czech archives/libraries/galleries.
- `lindat-help@ufal.mff.cuni.cz`, Czech feedback form and Czech hosting-institution/ROR link.
- Czech Twitter/social link and LINDAT account/login logo.
- Czech ministry/project funding block (`LM2023062`, etc.). Do not invent a replacement funding statement.
- Misleading `website © 2025 by ÚFAL` as operator identity; retain any legally required software/asset attribution separately.

**Do not blanket-delete every “LINDAT”, “ÚFAL” or Czech URL.** Preserve software provenance/licences, attribution required for retained icons, and legitimate dataset licence/metadata links. For example, rendered resource licence definitions link to LINDAT and are not partner branding. The legacy site itself includes a modest upstream-software acknowledgement; propose retaining an accurate equivalent for CLARIN-DSpace v7.

## 6. Help and policy migration — DEFERRED by owner; PR follow-up for LUMII

Current v7 `src/static-files/about.html` is Czech-centre content: UFAL/Charles University hosting, Czech privacy links, institutional history and preservation promises. The generic `/info/privacy` page also contains boilerplate (e.g. “Company”, “Children under the age of 13”) rather than the published Latvian policy.

- Use the actual v5 CLARIN-LV About, Terms, Privacy, Metadata, Cite, FAQ and Lifecycle content as the starting point.
- Preserve policy meaning; flag retention/security/licensing commitments for Arnis/owner rather than drafting new commitments.
- Example requiring confirmation: v5 privacy states deletion on request or after five years' inactivity. This is not evidence that v7 implements that retention policy.
- Adapt Deposit/Sign-in instructions and screenshots to v7. Do not carry obsolete v5 menu steps or authentication-error wording verbatim.
- Replace stale foreign examples where they describe this repository. v5 Lifecycle itself still says “The LINDAT repository” and uses an `11858/...` example. Use an approved real CLARIN-LV `20.500.12574/...` example, preserving actual resource identifiers.
- Rewire in-page links and anchors to namespaced v7 routes, including contract/licence pages; don't leave `/repository/xmlui/...` paths in migrated help.
- Align About/privacy/cookie notice/sign-in policy destinations so users see one consistent approved policy, not contradictory texts.
- Add missing Latvian help content. Current static assets have only root EN and `cs/`; missing LV falls back to EN. EN/LV footer/title/help localization belongs in scope; retranslation of the whole application does not.
- Keep existing locale switching, search facets, newest/most-viewed items, item records and licence enforcement dynamic. Do not replace server data with a snapshot of v5 content/counts.

## 7. Observations to flag, not silently expand scope

1. **Corpus Search TLS:** v5 links to `http://kontext.korpuss.lv/corpora/corplist`; the HTTPS equivalent failed validation with a self-signed certificate on this workstation. Do not bypass TLS or silently change the link to a broken HTTPS destination. Ask for the supported public URL or an operator fix; retaining the legacy HTTP link would need explicit owner acceptance.
2. **Static-page SSR/Anubis:** a read-only request to v7 `/repository/static/about` returned 200 but embedded “Making sure you're not a bot!” in the content. This is a baseline observation, not a confirmed root cause. Recheck direct navigation, client-side transitions and refresh during implementation. Coordinate with Arnis if SSR/internal fetching is involved; do not disable Anubis to hide it.
3. **Contact feedback route:** template uses relative `routerLink="info/feedback"` from Contact; verify actual navigation and the feedback-enabled setting. Do not promise/send test email as part of the UI audit.
4. **Anubis customization:** latest workbook contains a separate planned Anubis UI/policy work package. Keep Angular branding and gateway customization as distinct scopes/PRs; preserve required Anubis/Techaro/artist attribution.
5. **Dataset differences:** old/new homepage counts and newest records differ. Data refresh is migration work, not a UI defect to “fix” by hardcoding records.

## Owner decisions requested

1. Approve the seven-partner list and preservation of the existing Latvia B-centre/CoreTrustSeal links (Arnis confirms applicability).
2. Approve the compact navigation/help structure; provide a working Corpus Search URL or decision on the existing HTTP destination.
3. Confirm CLARIN-LV logo source (default: existing production artwork), whether any DARIAH/K-centre/social/funding content should remain, and whether the existing EN default stays (recommended: yes).
4. Approve migration of existing LV/EN policy/help content with v7-specific instruction updates; identify who signs off legal/retention wording. Default support address: `info@clarin.lv`.

## Implementation batches after approval

1. **Shell:** CLARIN-LV header/footer, partner data, badges, browser titles, navigation and locale strings/assets. Keep changes focused; prefer existing theme/component/i18n extension points and no new dependencies.
2. **Help and policies:** adapt approved EN/LV content and routes, repair affected relative/fragment navigation, update instructions/screenshots where needed. Keep policies distinct from upstream licence texts.
3. **Validation and polish:** targeted tests, desktop/mobile/browser/SSR checks; fix regressions caused by these changes. Report unrelated blockers to Arnis rather than silently modifying infrastructure.

Use Angular router links for internal destinations under the configured `/repository` namespace, HTTPS for verified external URLs, and maintainable shared link/partner data rather than scattered duplicate literals. Source images locally where permissions allow. Keep `target`/`rel` behavior consistent, headings semantic and logo alt text useful.

### Likely frontend write areas (not permission to edit before approval)

- `src/themes/dspace/app/header/header.component.{html,ts,scss}` (active theme).
- `src/app/footer/footer.component.{html,ts,scss}` and tests (active footer).
- `src/app/home-page/home-page.component.html` / affected styling and tests.
- `src/assets/i18n/en.json5`, `lv.json5`, approved image/favicon assets/configuration.
- `src/static-files/` and proposed `lv/` help content; existing info/privacy components if aligned with approved policy.
- Contact/static-page link handling only where required by the approved navigation/content work.

## Acceptance checklist after implementation

- [ ] Relevant header/footer/home/contact/static-page unit tests, including exact partner/support/certification destinations and EN/LV state changes.
- [ ] Existing `development.py test` configuration checks and `development.py build` production compilation; these are not substitutes for affected feature tests.
- [ ] Live preview and SSR render consistently; direct deep links, reload, new tab, back/forward and page anchors work under `/repository/`.
- [ ] Header/footer/help links resolve; no invented routes or leftover XMLUI URLs; external URLs checked without TLS bypass. Test Contact/feedback route without sending mail.
- [ ] Search, filters, browse, community/collection, item/Handle pages and public file links still work; don't alter metadata or licence enforcement.
- [ ] EN/LV switch updates footer/menu/title/help without reload; refresh preserves language; fallbacks are deliberate.
- [ ] Desktop/tablet/mobile layout, menu open/close, keyboard focus/Escape, screen-reader labels/expanded states, contrast, touch targets, image dimensions and horizontal overflow.
- [ ] Preserve cookie preferences and existing login/profile/logout/session-loading UI. Authenticated submission/restricted-file acceptance only with separately authorized local synthetic credentials/data; never send reset/verification mail without scope.
- [ ] No broken assets, unexpected console/network errors or unapproved Czech-centre identity in visible shell/help. Preserve legitimate software and resource licence attributions.
- [ ] Check favicons/title/metadata, loading/empty/error states, and browser re-entry after Anubis challenge where authorized.
- [ ] Owner visual/usability review and Arnis PR review, with a clear list of remaining external/ops/policy blockers.

## Release boundaries

`feature/clarin-lv-ui-customization` → reviewed PR into frontend **`clarin-v7`** → mainline CI builds/qualifies one candidate → owner approval in `frontend-release` publishes that exact artifact as `sha-FULL_COMMIT` → separately reviewed ops immutable release selection → authorized deployment. CI publication is not server deployment.

No commits to main/master/clarin-v7; no direct deployment from the feature branch. Commit, push and PR creation require explicit scope. The user intends Arnis to review before release.

## Resume instructions

1. Read this file, relevant `AGENTS.md`, and Git status/branch. Preserve user edits and other repositories.
2. Apply the latest approval and exact next actions at the top: shell plus matching v5 policy migration, footer Help de-duplication and Corpus Search in a new tab. Earlier policy deferral is superseded only for this bounded migration; unmatched clauses and legal/operational approval remain LUMII follow-ups.
3. Do not repeat the full audit or restore the system-wide hostname override. Existing artifacts support the findings; recheck only facts relevant to the next change.
4. Before local lifecycle work, inspect `task status ENV=dev`; preserve initialized data/checkpoints. Start only the documented dev environment, never production provisioning.
5. Update this checkpoint after each implementation/validation batch, including exact commands/outcomes and next action. Distinguish local tests, live target observations and owner acceptance.
