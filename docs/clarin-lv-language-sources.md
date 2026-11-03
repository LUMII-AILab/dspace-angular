# CLARIN-LV policy/help language sources

## Scope and review status

Prepared on 2026-10-30 for `feature/clarin-lv-ui-customization`. The owner now requires
both EN and LV content for these seven pages. Existing root EN files remain unchanged;
their adapted scope and omissions govern the new `src/static-files/lv/` counterparts.
This supersedes the earlier English-fallback status for these pages in
[policy migration](clarin-lv-policy-migration.md), not its substantive review flags.
The [help review](clarin-lv-help-review.md) remains the source of the FAQ/cookie omissions.
Neither earlier document is edited here.

**AILab staff content, linguistic and legal review happens AFTER this PR.** Published
v5 text is provenance, not approval or proof of present operations. New translations
identified below are **AI-assisted drafts**, not certified equivalents or new policy
versions. No new commitments or legal remedies are intended. Existing translation
errors and legal/operational questions are flagged rather than silently rewritten.

Only the seven LV files below and this document are owned by this change. Existing
LV About and Deposit, EN pages, other documents, loaders and Info components are not
edited. Main owns Info-screen integration through compile-time EN/LV template
components; this record does not claim that integration has been tested.

## Per-page provenance

### `src/static-files/lv/privacy-policy.html` — published LV reused

- Exact source: <https://repository.clarin.lv/repository/xmlui/page/privacy-policy?locale-attribute=lv>.
  Genuine Latvian body, saved as `../.ui-audit/v5-privacy-policy-lv.html`.
- Reuses the body text. The **only wording correction** is the erroneous heading
  brand `PASSENGER-LV` → `CLARIN-LV`. Legacy panels become semantic headings; empty
  paragraphs/layout wrappers are removed and the log introduction becomes a paragraph.
- Post-PR review: the IdP-entitlement parenthesis says “attiecībā uz personas datiem”
  rather than identifying IdPs; “lietotāja atļauja”, “dienesta”, “Piekritība” and the
  contact/request wording need linguistic/legal review. The institutional address is
  not a named technical contact. Confirm actual attributes/logging, nondisclosure,
  no-profile storage claim, deletion on request/five-year inactivity and GÉANT v1
  adherence. None is newly verified or legally repaired here.

### `src/static-files/lv/terms-of-service.html` — AI-assisted EN translation draft

- Exact v5 check: <https://repository.clarin.lv/repository/xmlui/page/terms-of-service?locale-attribute=lv>.
  The shell is Latvian but the body is **English**, saved as
  `../.ui-audit/v5-terms-of-service-lv.html`; it is not a published LV translation.
- Translation source: current `src/static-files/terms-of-service.html`. Preserves
  the preamble, all ten articles, numbered clauses, historical `v1.0`, rights and
  obligations, category/condition codes, restrictions, liability exclusions,
  amendment notification/continued-use acceptance and termination notice.
- Article 7 deliberately uses **`href="static/privacy-policy"`**, matching EN and
  resolving against the application base for both Info and static views, rather
  than `./privacy-policy`. No acceptance/versioning mechanism is changed.
- Post-PR review: full legal/linguistic equivalence, provider/address, identity-provider
  definitions, the source's noncommercial “or” wording (retained as “vai”), LOC's
  question mark, SA reciprocity, Latvia/Riga court designation, injunctive measures,
  liability and acceptance handling. “Riga District Court of Law” is drafted as
  “Rīgas rajona tiesa”, not independently verified. The source's “To archive this
  goal” is rendered by its apparent intended meaning (“Lai sasniegtu šo mērķi”);
  this is a translation choice, not a new obligation.

### `src/static-files/lv/metadata.html` — AI-assisted EN translation draft

- Exact v5 check: <https://repository.clarin.lv/repository/xmlui/page/metadata?locale-attribute=lv>.
  **English body**, saved as `../.ui-audit/v5-metadata-lv.html`.
- Translation source: current `src/static-files/metadata.html`, including its fuller
  VLO/concept-link explanation; the live LV-locale response has older English VLO
  wording and is not substituted for the current EN source.
- Translates prose, field labels and statuses. Retains the three tables, all fields
  and mappings, required/repeatable/type-dependent status distinctions, CMDI profile
  identifiers, DC codes, ISO 639-3, resource-type strings, `own/national/eu`, dates,
  PUB/ACA/RES and URLs. Retains the backend-specific
  `/server/oai/request?verb=ListMetadataFormats`, not the old Czech OAI URL.
- Post-PR review: terminology (including CC0/public domain), commercial-use
  notification alongside CC0, inherited 2014 profile history and VLO mappings,
  arbitrary CMDI support, actual OAI formats and field requirements. The English
  metadata-submission requirement remains; a Latvian help page does not change it.

### `src/static-files/lv/cite.html` — published LV reused with EN omissions

- Exact source: <https://repository.clarin.lv/repository/xmlui/page/cite?locale-attribute=lv>.
  Genuine Latvian body, saved as `../.ui-audit/v5-cite-lv.html`.
- Removes both XMLUI screenshots/captions, styling, the RefBox parenthesis/location
  sentence, automatic-citation example pointer and screenshot-dependent export/click
  instructions, matching EN. Citation principles, Handle claim, BibTeX statement
  and external links remain.
- Post-PR review: source “Datu šifrēšanas darba grupas” incorrectly names the linked
  Data Citation Work Group; “Citāta turis”/“Tura sistēma” terminology also needs
  review. These are inherited, not newly translated. Confirm RDA implementation,
  permanent-Handle and BibTeX claims; publication on v5 does not verify them.

### `src/static-files/lv/item-lifecycle.html` — published LV reused with EN omissions

- Exact source: <https://repository.clarin.lv/repository/xmlui/page/item-lifecycle?locale-attribute=lv>.
  Genuine Latvian body, saved as `../.ui-audit/v5-item-lifecycle-lv.html`.
- Removes the LV example Handle `http://hdl.handle.net/20.500.12574/11` and the
  infrastructure-move/PID-resolution guarantee, matching EN's omission. Unlike EN's
  inherited LINDAT sentence, LV already says “Repozitorijs”; it is still omitted,
  not treated as authority to restore a guarantee. The general PID citation advice stays.
- Uses `./deposit`, `../licenses`, `#restricted-submissions` and the established
  support mailto. Adds EN's upstream new-version-guide URL to the existing Latvian
  words “jauna vienuma versija”, without adding a workflow claim.
- Post-PR review: “bitu plūsma”, IIT/IĪT and harvesting terminology; editorial/IPR
  checks, deletion discretion, persistent deletion records, minor edits/versioning,
  OAI-PMH/OAI-ORE, e-signatures and embargo release. Reconcile minor edits with the
  FAQ/About prohibition on changing published data. Review upstream guide applicability.

### `src/static-files/lv/faq.html` — published LV reused; small EN-derived draft addition

- Exact source: <https://repository.clarin.lv/repository/xmlui/page/faq?locale-attribute=lv>.
  Genuine Latvian body, saved as `../.ui-audit/v5-faq-lv.html`.
- Matches EN omissions: removes the LRT relocation question/answer and TOC entry,
  the entire search answer/TOC entry/examples/styles, and the obsolete licence-selector
  sentence/link. LV search examples were localized, but still describe the removed
  XMLUI/SOLR guidance; they are not retained as current instructions.
- Retains the nonpublic-archiving answer but omits its TOC entry to match EN.
  The `new-version` heading, paragraph and two TOC entries are absent from this LV
  capture: these alone are **AI-assisted translations of current EN**, retaining
  its upstream guide URL. All other surviving visible wording is reused.
- Preserves IDs, `./about`, external links and the CLARIN-LV format recommendation;
  uses `../licenses` and six `mailto:info@clarin.lv` links instead of placeholders.
- Post-PR review: the translated login error substitutes “e-pasta ziņojumu” for
  `eppn` and is not an exact operational error message; “neizmantosim datus” differs
  from EN's no-abuse wording. Review “bezmaksas” versus free licensing, “Glabātājam”
  versus depositor, credit/citation wording and grammatical defects. Confirm login/
  local-account, immediate restricted access, discovery/citation, backup/three-copy,
  nonpublic archiving, licensing and withdrawal promises. No silent legal or
  operational correction is made; the new-version draft also needs staff review.

### `src/static-files/lv/cookies.html` — AI-assisted neutral-help translation draft

- Historical page URL: <https://repository.clarin.lv/repository/xmlui/page/cookies?locale-attribute=lv>.
  **No verified published equivalent or LV body is available**; this URL is a
  provenance reference, not a claim that a cookie policy was fetched or matched.
- Translation source: current `src/static-files/cookies.html`, exactly its two
  neutral help paragraphs and heading. “Sīkdatņu iestatījumi” matches the existing
  LV footer label; the privacy link remains `./privacy-policy`.
- No tracker inventory, implied consent, anonymity, Safe Harbor or legal-compliance
  assurance is added. Post-PR review: wording and actual preference behavior;
  deployment-specific cookie/privacy policy remains a separate staff follow-up.

## Shared adaptation and bounded verification

Only main-content fragments are reused, never the v5 navigation/footer, scripts,
styles or screenshots. The six distinct `v5-*-lv.html` snapshots above are local
source evidence outside the frontend checkout, not application assets. A Latvian
shell/locale query alone was not accepted as proof of a Latvian body.

Static sibling links now use `static/NAME`, application links use `contract`/`licenses`, and same-page anchors use `static/NAME#id`, relative to Angular's existing base URL. This supersedes the initial dot-relative forms and requires no shared-loader changes. Terms article 7 uses `static/privacy-policy`; metadata retains the existing backend OAI placeholder. `lv` is a content directory,
not an added URL route segment. Support uses the already documented
`mailto:info@clarin.lv`; no new privacy contact is invented.

Read-only standard-library HTML/content inspection of the saved files confirmed:

- Balanced fragments, unique IDs, existing same-page anchors/static targets and
  EN/LV ID, href and paragraph-count parity for all seven pages.
- Reused visible word/punctuation tokens match the saved LV sources after exactly
  the adaptations above; FAQ's separately translated new-version material is excluded
  from that source-token comparison.
- Terms article/paragraph numbering and condition codes are intact. Metadata table
  dimensions, status sequence, profile identifiers, DC codes and technical values
  are preserved; all hrefs match EN, including the terms privacy exception.
- No legacy XMLUI links, removed examples/selector links, shell, scripts, styles,
  screenshots or trailing whitespace in the seven fragments.

These are source-content checks, not certification of translation or legal equivalence.
No application tests, builds, runtime/browser actions, live destination checks or
full-site re-audit were run. No dependencies, commits, pushes or deployments were added.
