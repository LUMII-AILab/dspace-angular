# CLARIN-LV deposit guide: sources and validation

Date: **2026-10-30**. Branch inspected: `feature/clarin-lv-ui-customization`.
Local frontend HEAD: `f0f980620c752f5842a1749b22ab7a9ac660f2b0` (verified with
`git rev-parse HEAD`); comparison also includes the pre-existing working-tree UI
customisations. This is not an upstream or deployed-server commit identifier.

## Scope and source selection

This bounded content migration changes only `src/static-files/deposit.html`, adds
`src/static-files/lv/deposit.html`, and adds this record. No workflow, navigation
component, loader, policy, dependency, configuration or runtime changes are made.
Existing unrelated work is left intact. This record supersedes the **deposit-only**
condensation described in `clarin-lv-help-review.md`; that historical record and
all other documents remain unchanged.

Primary source, read anonymously on 2026-10-30:

- **https://lindat.mff.cuni.cz/repository/static/deposit** — public LINDAT/CLARIAH-CZ
  guide. The GET response's Date header was `Fri, 30 Oct 2026 11:44:14 GMT`.
  The text explicitly describes upper-right Login, Your submissions / +,
  Describe / Upload files / Deposit license / Pick license, and Deposit /
  Save for later. This is the updated interface guidance, not the older checked-in
  v5 instructions. Retrieval date is not a publication date.
- Tried **https://github.com/ufal/clarin-dspace-angular** and
  **https://api.github.com/repos/ufal/clarin-dspace-angular** anonymously: both
  returned HTTP 404. No publicly accessible source tree, branch, source commit,
  publication date or mapping from the live deployment to a commit was verified.
  A 404 does not establish whether the repository is private, absent or renamed.
  The guide is therefore attributed to the live public page, not a guessed branch.

Additional sources:

- **https://repository.clarin.lv/repository/xmlui/page/deposit?locale-attribute=lv**,
  read anonymously on 2026-10-30: published **v5 Latvian** wording. Its right-panel
  login, type buttons, Next pages, upload dialog and Complete Submission flow are
  not carried over as v7 instructions.
- `../.ui-audit/v5-deposit.html`, main body lines 327–457: previously captured
  CLARIN-LV v5 English guide, used for historical comparison only.
- Local v7 templates and `src/assets/i18n/en.json5` / `lv.json5`, as below.

## Adaptation and local source comparison

**Source inspection is not an authenticated workflow test.** Submission definitions,
fields, licences, permissions and editorial processing depend on the backend and
collection. Both guides say this explicitly and defer to the displayed form.
Numbered headings are a reading sequence, not a new multi-page wizard.

| Guide topic | Local frontend evidence and adaptation |
| --- | --- |
| Login | `src/app/clarin-navbar-top/clarin-navbar-top.component.html` has the upper-right `/login` link, labelled by `login.title`. Retained updated login instructions; removed the promise of a particular identity provider, clarin.eu registration path or local-account creation. Support is `info@clarin.lv`. |
| Start / resume | `src/app/my-dspace-page/my-dspace-page.component.ts` defines `/mydspace`; its template gates new submissions by Submitter role. `my-dspace-new-submission/my-dspace-new-submission-dropdown/my-dspace-new-submission-dropdown.component.html` supplies the + button and New submission label, with entity-dependent variants. Link directly to the existing Your submissions route instead of assuming LINDAT's left-menu arrangement. Collection choice is conditional. |
| Sections / description | `src/app/submission/form/submission-form.component.html` renders the configured section list; `sections/form/section-form.component.html` renders a dynamic form model. Existing translation keys supply Describe, Upload files, Deposit license and Pick license. Retain resource type, title, people, organisations, projects, description and language guidance, without asserting an exact local list of fields or mandatory flags. Corpus is only an example among offered options. |
| Upload | `src/app/shared/upload/uploader/uploader.component.html` supports browse and drag/drop; `submission/form/submission-upload-files/submission-upload-files.component.html` connects it to submission. `submission/sections/upload/section-upload.component.html` renders files and collection access conditions. Retain upload and file-management guidance; replace unconditional skipping of uploads with a collection/form-dependent instruction. No v5 Start Upload / OK dialog instructions. |
| Deposit agreement | `src/app/submission/sections/clarin-license-distribution/clarin-license-distribution.component.html` links the agreement with `collectionId` and provides the acceptance toggle. Direct users to that collection-specific link in the form, rather than a generic contract page that could show a different agreement. Click to accept / Accepted match existing translations. |
| Resource licence | `src/app/submission/sections/clarin-license-resource/section-license.component.html` has the licence dropdown, `/licenses` link and OPEN License Selector button. Its TypeScript `clickLicense()` delegates to the `license-text` integration; merely finding the button does not prove the selector works in the deployment. Selector availability is conditional. No promise to add a requested licence or configure restrictions automatically. |
| Restricted data | Replaces unconditional promises to enforce authentication/signatures and collect additional user attributes with an instruction to confirm support **before uploading**. Retains the existing `./item-lifecycle#restricted-submissions` link, without changing that policy or validating its operational claims. |
| Note | The public v7 guide describes a Note field below Pick license. Local forms are dynamic; neither its presence nor its position was verified for the intended collection. Both guides say “if offered” and avoid asserting placement. |
| Review / save / deposit | `src/app/submission/sections/container/section-container.component.html` has valid/warning/error icons and messages. `submission/form/footer/submission-form-footer.component.html` and `.ts` implement Save for later and Deposit; Deposit is workspace-scope dependent. Retain those actions and advise checking confirmation/errors. Describe icon shapes and messages rather than relying only on colours. No claim of a successful upload, save, deposit or resumed draft. |
| Editorial review | Retain the upstream review/approval/contact explanation **only if the collection requires editorial review**. No approval timetable, automatic-publication guarantee or verified local editorial configuration is asserted. |
| New versions | Retain the upstream software guide URL `https://github.com/ufal/clarin-dspace/wiki/New-Version-Guide` as background and add the existing `./faq#new-version` link. Do not prescribe the live site's branch icon / Create new version action as tested locally. |

Paths abbreviated in the table remain under `src/app/`. Links use the existing
static-page relative-link convention (`../mydspace`, `../licenses`, `./faq`,
`./item-lifecycle`), compatible with the current loader's root/subpath handling.
No custom navigation is introduced. Existing `step1`, `step3`–`step6`, `step8`
and `step9` anchors survive; `step2`, `step7` and `license_selector` are restored
as text anchors. The licence-selector anchor is not a new widget.

## Screenshot inspection, provenance and rights

**No screenshots or other image assets are reused in the delivered pages.**
All ten live image files were downloaded temporarily into the scoped deposit image
directory, viewed visually, and removed after evaluation. No image was cropped,
rebranded, translated, retouched or presented as a local capture.

Exact live asset URL prefix:
**https://lindat.mff.cuni.cz/repository/assets/images/static-pages/**
Append the filenames below. All were retrieved on 2026-10-30. Byte comparisons
found that **all ten differ** from their namesakes in the local
`src/assets/images/static-pages/` directory. The live filenames alone are not
used as evidence of interface version.

| Live filename | Visual observation / reason not to reuse |
| --- | --- |
| `step1.png` | Upper-right Login, LINDAT/CLARIAH-CZ and DARIAH branding; not the CLARIN-LV header. |
| `step2.png` | Dark Management / New / Submissions sidebar with LINDAT branding; do not imply an identical local menu. |
| `step2_1.png` | Your submissions page, plus button, LINDAT navigation and branding; not a local capture. |
| `step3.png` | Describe accordion, resource-type dropdown and Save for later / Deposit footer: updated UI, but collection field options are unverified locally. |
| `step4.png` | Authors, contact and funding fields; shows the “AI Models” collection and its required fields. |
| `step4_1.png` | Description, language, keywords, size and media type; same foreign collection-specific form. |
| `step5.png` | Top drop/browse area and Upload files section; “AI Models” collection and empty file list. |
| `step6_1.png` | Deposit license accordion, validation message and Click to accept toggle; updated UI, but no verified reuse licence. |
| `step6_2.png` | Pick license accordion, selector and dropdown; also promises adding a licence, which is not verified for CLARIN-LV. |
| `step6_3.png` | Choose a License dialog with questions and licence results; no verified local integration behaviour or reuse licence. |

For reproducibility, representative live-image SHA-256 digests:

- `step1.png`: `7f23683827241ba78c0f4a37c301aac8985f058eb8e0a58ee9ae142b545b1d5e`
- `step3.png`: `c7a972ad6a69cacbbbf49627d94a6d95301c884516a440346006f27628892533`
- `step6_1.png`: `d0e25accf2e126862f59d75ef68cb8dbbd35f0a873fc9441df7254dcbcf445ea`

Also visually inspected the **existing local** `step1.png`, `step3.png` and
`step6_1.png`: they show My Account / Login, resource-type tiles and the numbered
Basic Info → … → Complete wizard. These are old-interface screenshots and were
not imported or relabelled as v7. Existing assets are untouched.

The live page footer credits “website © 2025 by ÚFAL” and separately credits
Smashicons / Freepik icons under CC 3.0 BY. That icon credit does **not** establish
permission to redistribute these screenshots. No explicit screenshot or guide-text
reuse licence was verified from the inaccessible upstream repository or live page.
This implementation uses the public procedural information in locally adapted
prose, retains applicable existing text, and records its source; it does not copy
the live HTML, artwork or foreign shell. Attribution is not a claim of permission.
Image reuse would require confirmed rights and an applicability review; text-only
instructions avoid distributing unlicensed or misleading screenshots now.

The repository's BSD 3-Clause `LICENSE` (LYRASIS copyright), `NOTICE`,
`LICENSES_THIRD_PARTY`, acknowledgements and existing footer software attribution
are untouched. LINDAT/CLARIN and UFAL remain credited as upstream sources, not
renamed to imply CLARIN-LV authorship of the software.

## Foreign references and unsupported claims excluded

- LINDAT helpdesk and source-site navigation, Czech institutional/partner/funding
  references, certification badges, branding, footer and announcement are not
  imported. All guide support links use `mailto:info@clarin.lv`.
- No “AI Models” collection name or screenshot-specific mandatory metadata list
  is transferred to Latvia.
- No assumed clarin.eu website-account authentication, automatic local-account
  creation, automatic licence installation, enforced signing, additional user
  attribute collection or unconditional editorial workflow is promised.
- Obsolete v5 right-panel login, Start another submission, type tiles, Next,
  Start Upload / OK, Correct, Complete Submission and Save & Exit actions are not
  reinstated. The mention of Next only explains that the updated form uses sections.
- The upstream new-version documentation link is deliberately retained as software
  documentation; it is not a foreign service/helpdesk substitution.

## Latvian wording and post-PR review

`src/static-files/lv/deposit.html` is a **draft for AILab linguistic/content review
after the PR**, not an approved translation or a prerequisite for preparing the PR.

Reuse from published v5 Latvian includes applicable step headings (new submission,
describe item, file upload), “Vispirms aprakstiet ar vienumu saistītos cilvēkus,
organizāciju un projektus”, licence-dropdown/helpdesk wording, and editorial-contact
terminology. Obsolete navigation and mistranslated drag/drop wording are excluded.
The title uses “deponēt” rather than v5 “noguldīt”, consistent with the v5 navigation's
“Deponēt”. Updated v7 actions and all qualifications are faithful draft translations
of this adapted English guide, not purported verbatim v5 text.

Quoted controls match the **existing** Latvian UI dictionary, including
“Pieslēgties”, “Jūsu iesniegumi”, “Jauns iesniegums”, “Aprakstiet”,
“Augšupielādēt failus”, “Ievietot licenci”, “Izvēlēties licenci”,
“Noklikšķiniet, lai piekristu”, “Pieņemts”, “ATVĒRT licenču atlasītāju”,
“Saglabāt vēlākam” and “Ievietot”. Awkward existing labels are not silently renamed
in the guide or changed in the dictionary. The configuration-dependent Note field
is explained in Latvian with its upstream English label, not an invented local label.

AILab should review terminology, fidelity, licensing distinctions and the operational
qualifications after the PR. Any later dictionary cleanup is separate work.

## Validation performed and remaining gaps

Performed without authentication or data creation:

- Anonymous public guide/image reads and visual review described above.
- Read-only comparison with existing frontend templates, routes and EN/LV labels.
- In-memory Python standard-library check of both HTML fragments: balanced markup,
  language attributes, one h2 and nine h3 headings, unique matching step anchors,
  allowed static elements only, no event handlers or Angular interpolation, nonempty
  links, EN/LV link-order parity, expected link allowlist, existing FAQ/lifecycle
  fragment targets, and relative-link resolution at `/` and `/repository/`: **passed**.
- Checked twelve quoted UI labels per language against active entries in the existing
  dictionaries, and the `/mydspace` and `/licenses` route definitions: **passed**.
- `git diff --check -- src/static-files/deposit.html src/static-files/lv/deposit.html`:
  **passed**. New-file markup was covered by the in-memory check; untracked files
  are not included in ordinary `git diff`.
- Confirmed no downloaded screenshot directory/assets remain.

No application build, browser/SSR rendering test or authenticated submission test
was run. No servers, containers or runtime settings were changed. No login, new
submission, upload, save, deposit, licence acceptance or editor action was performed.
Presence in source does not establish deployed functionality.

Outstanding validation: EN/LV rendering and language switching through the existing
loader; actual submitter permissions and collection choice; resource-type options,
metadata requirements, optional-file submissions and Note field; successful uploads,
editing/removal and save/resume; collection-specific agreement content, licence
inventory and selector integration; restricted-access/signature enforcement; deposit
confirmation, editorial routing and publication; new-version permissions/actions.
These require a separately authorised operational review, not broader changes in
this content migration.
