# CLARIN-LV policy content migration

## Scope and status

Reviewed on 2026-10-28 on `feature/clarin-lv-ui-customization`, against checkout baseline
`f0f980620c752f5842a1749b22ab7a9ac660f2b0`.
The owner's new approval supersedes the policy deferral recorded in `clarin-lv-ui-plan.md`
**for this bounded content migration only**. That earlier plan is not edited here.

This is migration of published v5 wording, **not legal approval, a new policy decision,
or verification of current operations**. Czech institutions have not been renamed to
manufacture Latvian commitments. Explicitly Czech-only commitments are omitted and
listed for LUMII follow-up below.

The initial content-migration batch changed these files:

- `src/static-files/about.html`
- `src/static-files/metadata.html`
- `src/static-files/cite.html`
- `src/static-files/item-lifecycle.html`
- `src/static-files/privacy-policy.html` (new)
- `src/static-files/terms-of-service.html` (**already existed**; updated, not newly created)
- `src/static-files/lv/about.html` (new, from the genuinely translated Latvian capture)
- `docs/clarin-lv-policy-migration.md` (this record)

### Integration completed after the initial comparison

- Existing `/info/privacy` and `/info/end-user-agreement` content components select thin EN/LV template components using the existing language selection. Those compile the same root/LV `privacy-policy.html` and `terms-of-service.html` fragments served by static routes. Replaced generic DSpace templates were removed; legal text is not duplicated and no new loading/navigation engine was introduced.
- Generic DSpace “Company”, under-13, unrelated intellectual-property and hosting-country boilerplate was not textually equivalent to v5. It is replaced with the actual published Latvian repository policy/terms, not rebranded into new commitments.
- Terms article 7 links to `static/privacy-policy`, relative to the configured Angular base. This works from both `/info/...` and `/static/...`. Terms use a page-level `h1`; words and historical version remain unchanged.
- **The shared static-page loader, routing, language switching and scrolling/history are unchanged.** The earlier loader rewrite was removed to keep this branch content-focused. Migrated fragments use ordinary base-relative hrefs; the new Help/About links use native page navigation, not custom loading logic.
- FAQ/deposit adaptation and the neutral replacement for obsolete cookie assertions are recorded separately in [help content review](clarin-lv-help-review.md). These are now included in the feature branch.
- Cookie preferences retain the existing upstream behavior. The earlier first-visit-dialog fix and unrelated Contact feedback fix were removed from this branch.
- **No acceptance guards, consent persistence, policy-version values, authentication or backend enforcement were changed.** LUMII/Arnis must decide whether policy-version changes, notification or renewed acceptance are needed before release; migrating wording does not implement those decisions.
- All nine policy/help pages now have EN/LV fragments. Published v5 LV wording is reused where available; missing translations are explicitly documented AI-assisted drafts requiring AILab review after this PR. See the [language provenance](clarin-lv-language-sources.md), [updated v7 deposit source](clarin-lv-deposit-source.md), and consolidated [staff review register](clarin-lv-content-review.md). Neither reused nor new translations are certified legal equivalents.

No commits, pushes or deployment are performed. Dependencies and operational configuration remain unchanged.

## Sources and actual comparison

The supplied `../.ui-audit/v5-*.html` files are **full HTML captures**. Only descendants
of `#main-contents` were used. Navigation, footer, tracking, scripts, styles and the
XMLUI layout were not imported. The historical `ufal-point-faq` heading ID is retained
as an identifier, not institutional wording or a guarantee.

Comparison used Python's standard-library HTML parser, excluding scripts/styles,
and compared visible word/punctuation tokens independently of whitespace and markup.
The paragraph counts below describe the **pre-edit** static files, not an assertion
that two differently branded policies are legally equivalent.

| Capture in `../.ui-audit/` | Main content lines | Existing counterpart and findings |
| --- | --- | --- |
| `v5-about.html` | 307-513 | `about.html`: 10 of 20 existing paragraphs match v5's 18 paragraphs. Substantial shared wording, but the current page names LINDAT/CLARIAH-CZ/UFAL, includes a UFAL biography, extra institutional/certification claims and a ten-year guarantee absent from Latvian v5. v5 names CLARIN-LV and AILab/LUMII itself; it is not a search-and-replace localization. |
| `v5-about-lv.html` | 307-409 | No existing `lv/about.html`. Headings and body are genuinely Latvian, including mission, terms, IPR, metadata and preservation. Imported that text, not a newly authored translation. |
| `v5-privacy-policy.html` | 307-491 | No existing root static privacy page. v5 explicitly identifies the Latvian service, LUMII address and Republic of Latvia, and supplies processing, disclosure, retention and conduct clauses. |
| `v5-terms-of-service.html` | 307-484 | `terms-of-service.html` already exists. 21 of 23 paragraphs match; the differences are resolved repository/provider/address placeholders in the preamble and Latvia/Riga placeholders in article 6. All ten articles otherwise match. |
| `v5-metadata.html` | 307-612 | 9 of 10 paragraphs match; the first differs only in repository name. All 89 table cells match, including fields, status labels and mappings. Links differ: v5 still points to Czech OAI, whereas the current file already uses the loader-supported backend OAI path. |
| `v5-cite.html` | 307-351 | All four paragraphs and the remaining visible text match before editing. Differences are screenshot asset paths/markup, not a Latvian policy variant. |
| `v5-item-lifecycle.html` | 307-402 | All nine paragraphs and the remaining visible text match before editing, **including the inherited LINDAT-specific PID promise**. Publication on Latvian v5 is not evidence that this Czech-named promise applies to LUMII. |

Full-capture SHA-256 fingerprints (not hashes of extracted fragments):

```text
v5-about.html             edba1050cca7da71ce526eda22d20018fa14b3125c3ea54b4c3b34399043adfc
v5-about-lv.html          d120230055dc87b0a39f333d7b500895280911c687f9125809fbd29ae71fa51d
v5-privacy-policy.html    fccdf0becf116b7479793f46a45ac4c090b2491940a76e351ab49f734e0cf8af
v5-terms-of-service.html  00e54849c6c2220a2cf2f3773ec199a33a0403d8a43f2f4e637f57d54e422783
v5-metadata.html          ca25a8f16223257823bc3d9a1830da5688b0be54304c6a46f7ced3e29aa315b0
v5-cite.html              2b23385c52cdf25fc3157b44b4766644efb4ce73492f2f0f871f227a65e866c0
v5-item-lifecycle.html    4b7f38744bdb623342e0b04e4e0f376c9f27afbbbd0075860fd7ea3ee5caac4f
```

## Text and markup changes relative to v5

- English About, Latvian About, privacy, terms and metadata retain the v5 visible
  word/punctuation sequence. Institutional and jurisdiction values in terms are taken
  verbatim from the captured, resolved page, not filled in by inference.
- About follows v5's FAQ link and wording rather than the current Czech page's extra
  collection-contract explanation or new-version-guide wording.
- Privacy uses semantic headings instead of legacy Bootstrap panel wrappers. Its
  unnamed contact and retention wording are preserved, not silently completed.
- Terms article 3.6 has valid paragraph/list boundaries; article 7's existing words
  “data protection policy” now link to the shared privacy page.
- Latvian About repairs the source's self-closing, empty CC0 anchor by linking the
  existing `CC0` text. No translation corrections or new Latvian legal text are made.
- Cite removes both old RefBox/BibTeX screenshots, captions, inline/scoped styling,
  “see RefBox below”, the automatic-citation example pointer, the RefBox-location
  sentence and the image-dependent export/click instructions. The citation principles,
  Handle policy and BibTeX export statement remain. No obsolete assets are imported;
  existing assets elsewhere are untouched.
- Lifecycle removes the example Handle `11858/00-097C-0000-0022-F59C-8` and the sentence
  beginning “The LINDAT repository will ensure” about continued PID resolution after
  infrastructure moves. It retains the general instruction to cite the PID, without
  replacing LINDAT with CLARIN-LV or adding a new guarantee.

## Link migration and route evidence

Current fragments use Angular-base-relative links: `static/NAME`, `static/NAME#id`, `contract` and `licenses`. This makes the hrefs usable without modifying the shared loader. `lv` is a content locale directory, not an additional route segment. The table below records the initial migration; its dot-relative/fragment-only results were subsequently converted to those base-relative forms (Terms article 7 is `static/privacy-policy`).

| Source / previous link | Result | Reason |
| --- | --- | --- |
| `https://repository.clarin.lv/repository/xmlui/page/terms-of-service` (or current `static/terms-of-service`) | `./terms-of-service` | Shared static terms content. |
| `/repository/xmlui/page/privacy-policy?locale-attribute=en` / `lv` (current Czech policy points to `https://lindat.mff.cuni.cz/policy`) | `./privacy-policy` | Shared Latvian-centre privacy content; no legacy locale query. |
| v5 XMLUI `page/contract`, current bare `contract` | `../contract` | Existing Angular collection distribution-contract route. |
| v5 XMLUI `page/licenses`, bare `licenses` | `../licenses` | Existing Angular public licence-list route, not `licenses/manage-table`. |
| Bare `metadata`, `deposit`, `cite`, `faq`; current `static/cite`, `static/metadata`, `static/deposit` | `./metadata`, `./deposit`, `./cite`, `./faq` as applicable | Existing static counterparts; FAQ/deposit contents are owned by the other agent. |
| Current `static/about#…`, `static/metadata#…`, `static/item-lifecycle#…` | `#…` | Same-page anchors, matching v5. |
| Metadata/lifecycle help-desk `href="#"` placeholders | `mailto:info@clarin.lv` | Concrete support address already present in both v5 About captures; link text unchanged. |
| v5 metadata `https://lindat.mff.cuni.cz/repository/oai/request?verb=ListMetadataFormats` | Retain current `/server/oai/request?verb=ListMetadataFormats` | Backend endpoint placeholder supported by existing loader, not an Angular navigation route. |
| Terms article 7, previously unlinked “data protection policy” | `./privacy-policy` | Added link only; clause text unchanged. |

Inspected `src/app/app-routing-paths.ts`, `app-routing.module.ts`,
`license-contract-page/license-contract-page-routing.module.ts` and
`clarin-licenses/clarin-license-routing.module.ts`. `contract` has an
`EndUserAgreementCurrentUserGuard`; the licence list's empty child route is distinct
from administrator-only `manage-table`. `LicenseContractPageComponent` selects a
collection via `collectionId`, or loads authorized collections otherwise. These are
code-level route findings, not a successful live authorization or licence-data test.

`StaticPageComponent` already expands `href="/server/oai…"` against the configured
REST base URL (falling back to `/server/oai`). This backend-specific exception is
retained rather than inventing `../oai`, `../server` or a production backend URL.
Its deployed endpoint and response are not verified here.

External CLARIN, Creative Commons, metadata registry, FORCE11, RDA and GÉANT links
are retained as captured; availability is not asserted. The UFAL-hosted
`https://github.com/ufal/clarin-dspace/wiki/New-Version-Guide` remains in lifecycle:
it is upstream software documentation, not a claim that UFAL operates this repository.
Resource licence files, licence terms, software attribution and notices are untouched.

## LUMII follow-up: omitted Czech-only or unmatched clauses

Do not reintroduce these by changing institutional names:

1. **UFAL's at-least-ten-year access guarantee after loss of funding.** No Latvian
   counterpart exists in either About capture. The separate v5 Latvian statement
   about transfer to another CLARIN centre remains, without a ten-year duration.
2. **Charles University/UFAL identity and institutional history.** The UFAL hosting
   line, biography, teaching/research claims and `/about-lindat-clarin` link have no
   counterpart in Latvian v5 and are not migrated.
3. **Extra preservation/certification assertions.** The current Czech About's
   adherence to OAIS and/or Charles University rules and periodic CLARIN/CTS assessment
   statement (including `https://hdl.handle.net/11234/6-CTS`) are absent from the Latvian
   main content. Only v5's CLARIN-guidelines wording is used. This does not deny any
   Latvian certification; separate certificate/footer work is outside this scope.
4. **The LINDAT-named PID continuity guarantee in lifecycle.** It appears unchanged
   even on Latvian v5. Removed rather than attributed to LUMII. Any local replacement
   requires an explicit owner decision.
5. **Czech OAI service as evidence of Latvian metadata support.** Its URL is not
   carried forward. The inherited CMDI profile history (Sep/Oct 2014, profile creation,
   OLAC/MetaShare and VLO mappings) is textually identical in v5 and the current page;
   that alone does not establish Latvian provenance. LUMII must confirm its local
   applicability rather than treating a matching paragraph as operational evidence.

## LUMII follow-up: retained v5 promises needing review

The following are retained because they are in the supplied Latvian v5 content, not
because this migration verified them:

- **Privacy:** actual IdP attributes and logs, entitlement processing, licence-signature
  records, the no-disclosure-outside-the-team statement, the “no profile” storage claim,
  deletion on request or after five years of inactivity, and GÉANT v1 conduct adherence.
  The “contact person” section supplies only an institution/postal address, although
  another clause says “technical contact above”; an appropriate current privacy contact
  and lawful retention/deletion process need owner review, not an invented contact.
- **Terms:** provider/address accuracy, Latvian governing law and the named Riga District
  Court, identity-provider assumptions, access restrictions, liability exclusions,
  amendment notice, termination and acceptance/EUA handling. The source says “Institute
  of Mathematics and Informatics” here but “Mathematics and Computer Science” in privacy;
  this inconsistency and source wording such as “To archive this goal” are not silently
  rewritten. The historical `v1.0` label is preserved, not a new approval/version.
- **About/preservation:** safe storage, licence enforcement and electronic signing,
  custom licences, fixity checks, on/off-site backups, hardware monitoring, editor
  review, OAI-PMH/crawler discovery, persistent identifiers, version linking, staff
  participation, exports, format migration with originals retained, and transfer to
  another centre on funding withdrawal. Verify actual capabilities and arrangements.
- **Reuse conditions:** review the default non-commercial/private-study permission
  when no licence is attached, citation and robot-harvesting restrictions, and the
  relationship between CC0 metadata and the request to be informed of commercial use.
  These potentially sensitive clauses are preserved rather than reinterpreted.
- **Metadata:** verify CMDI profiles/history, arbitrary supplied CMDI support, available
  OAI formats, English-language requirements, field statuses and all DC mappings
  against the Latvian backend/submission configuration.
- **Citation/lifecycle:** review the retained generic permanent-Handle claim, RDA
  implementation claim, BibTeX support, editorial/IPR checks, case-by-case deletion and
  minor edits, persistent tombstones, OAI-PMH/OAI-ORE exposure, e-signature tracking and
  embargo release. Reconcile About's prohibition on published-data changes with the
  lifecycle allowance for minor edits; this migration does not resolve that tension.
- **Latvian wording:** preserve the existing translation pending owner review. It is
  not certified equivalent to the English: for example, “drošības pārbaudes” renders
  fixity checks, the format/compression wording differs, and the final paragraph refers
  to activity stopping rather than specifically withdrawal of funding. Other linked
  policies remain English fallback content; no Latvian privacy/terms translation was
  supplied or invented.

## Validation

- Standard-library HTML parsing and token comparison passed for all seven fragments.
  English/Latvian About, privacy, terms and metadata exactly match v5's visible tokens;
  cite has only four documented deletion spans and lifecycle only the documented
  example/guarantee deletion. All 89 metadata table cells also match the pre-edit file.
- Checked balanced tags, unique IDs, same-page anchor targets, existing static targets,
  `./` and `../` URL resolution at `/repository/static/`, absence of unresolved template
  placeholders, legacy XMLUI links, shell elements, scripts, styles and screenshots.
- Scoped `git diff --check` passed. No Angular build, browser/loader suite, live endpoint
  probe, legal assessment or operational audit was run; runtime code is unchanged and
  integration/loader testing belongs to the other agent.
