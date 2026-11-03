# CLARIN-LV help-page review

## Current status

This records the initial help-content adaptation. The **Deposit section is superseded** by the updated EN/LV v7 guide and [its source record](clarin-lv-deposit-source.md). All nine policy/help pages now have EN/LV sources; [language provenance](clarin-lv-language-sources.md) identifies reused text and AI-assisted drafts. Use the consolidated [AILab review register](clarin-lv-content-review.md) for links and **post-PR** review assignments. Older exclusive-write-scope statements below describe the original subtask, not the entire feature branch.

## Scope and evidence

Implemented on 2026-10-29 under the owner's approval to migrate matching Latvian v5
content and remove obsolete help instructions. This is a content migration, **not
legal approval or verification of current operations**. A match with Latvian v5
is evidence of published wording, not proof that every inherited capability or
commitment applies to LUMII or the v7 deployment.

Exclusive write scope:

- `src/static-files/faq.html`
- `src/static-files/deposit.html`
- `src/static-files/cookies.html`
- `docs/clarin-lv-help-review.md` (this record)

The policy-migration record, UI checkpoint, other policies, translations, licence
files, image assets, runtime code and configuration are untouched. No institution
was renamed to manufacture a Latvian commitment. No v7 workflow or Latvian
translation was invented.

Sources are the existing local captures, with no network access:

- `../.ui-audit/v5-faq.html`, only `#main-contents`, lines 307-616.
- `../.ui-audit/v5-deposit.html`, only `#main-contents`, lines 307-460.
- Cookie-reference evidence only: `../.ui-audit/v5-browser.json`, links at lines
  706-708, and the saved v5 shell's tracking scripts. There is **no captured
  `v5-cookies.html` body**. Shell evidence is not imported as policy content.

The preceding read-only comparison found 19 of 20 FAQ paragraphs identical to v5,
with only the recommended-formats paragraph different; all remaining visible
wording matched. All 16 deposit paragraphs and remaining visible wording matched.
These are pre-edit comparison results, not claims that the shortened pages still
match v5 in full. That comparison excluded scripts/styles and normalized
whitespace and HTML entities.

## FAQ: exact changes relative to v5

The following are the only visible-text departures from the v5 main body:

| Source location | Removal and reason |
| --- | --- |
| TOC lines 345-347 and answer lines 501-507, `how-to-lrt-submissions` | Removed the question about moving records from the LRT collection and its complete answer: creating a tombstone/relocation notice, hiding the record from search, browse and OAI-PMH while retaining PID resolution, linking to the destination repository, and contacting the helpdesk. The collection-specific service is not established for Latvia. No collection name or replacement promise is invented. |
| TOC lines 363-365 and answer lines 573-607, `searching` | Removed the entire search answer, including the OR-default claim, field/negation/scoring and SOLR-syntax advice, Apache documentation link, Examples heading, four example/description pairs, five `discover?query=...` links and scoped `dt` styling. The examples use PDT/WordNet, `dc.title:P?T`, `dc.title:"Czech WordNet"`, and Bojar/Tamchyna with Czech/English language fields. Removing the whole operational answer avoids leaving an unsupported OR claim or a reference to deleted examples. No replacement queries or unverified `/search` syntax are supplied. |
| Sentence in line 547, `what-license-should-i-pick-for-my-datatool` | Removed exactly: “There is a great OPEN License Selector which can guide you through the selection of appropriate license.” Its link to `./deposit#license_selector` and following line break are also removed. Free/CC licence advice, availability during submission and the custom-licence contact instruction remain. |

The pre-edit generic SIS paragraph is restored to v5 line 396 verbatim:

> When uploading language resources, please try to use one of the formats recommended by CLARIN-LV.

“formats recommended by CLARIN-LV” links to
`https://standards.clarin.eu/sis/views/view-centre.xq?id=CLARIN-LV`, with v5's
`target="_blank"`. The generic `recommended-formats-with-search.xq` link is removed.
This restores the published centre-specific recommendation, without checking the
external endpoint or asserting current format support.

All other visible FAQ wording remains as published in v5, including its policy
substance, source grammar, two TOC entries pointing to `new-version`, and the
nonpublic-archiving answer that was already absent from the TOC. The six surviving
helpdesk/contact placeholders now use `mailto:info@clarin.lv`; the seventh was in
the deleted LRT answer. This address is present in v5 About's main body, not guessed.

The historical `ufal-point-faq` identifier is retained for compatibility. It is
not visible institutional branding. The UFAL GitHub new-version guide is retained
as upstream software documentation, not a claim that UFAL operates this service.

## Deposit: source-backed condensation, not a v7 step-by-step guide

The nine numbered UI steps are replaced with unnumbered subject headings. The
surviving `step1`, `step3`, `step4`, `step5`, `step6`, `step8` and `step9` IDs remain
as compatibility anchors, not assertions of a current step sequence. The removed
`step2`, `step7` and `license_selector` anchors no longer describe available UI.

| v5 main-body location | Retained substance and exact removals/condensation |
| --- | --- |
| Intro, lines 328-338 | Retains authenticated-only depositing and helpdesk/local-account assistance, condensed to “If you cannot authenticate or encounter a problem, contact our Help Desk; we can create a local account for you.” Removes the home-organisation Login-dialog instructions, registration at `https://user.clarin.eu/user/register`, and the named “clarin.eu website account” authentication choice. The new-version paragraph is shortened to “For a new version of a resource already available in the repository, see the new version guide.” The upstream URL is unchanged. |
| Step 1, lines 339-346 | The login prerequisite is represented by the authentication section, without a duplicate sentence. Removes “Click Login under My Account in the right menu panel.” |
| Step 2, lines 348-360 | Removes the whole step: the Submissions menu, Submission and Workflow tasks page, incomplete/archive-submission display and “Start another submission” link. |
| Step 3, lines 362-370 | Retains selection of the resource type and basic information such as the title. Removes “You have initiated a new workflow item”, the next-few-steps/“First” sequencing, Corpus/type-button click instruction and Next instruction. |
| Step 4, lines 372-385 | Retains describing the people, organization and projects involved. Condenses “Next add your description, fill the language, etc.” to “Add your description and language information.” Removes the two-step sequence and Next-to-upload instruction. |
| Step 5, lines 387-399 | Condenses to “Upload the content files of your submission. If there are no files, you can skip the upload.” This is the original upload/optional-files guidance, not a newly invented capability. Removes the Next/browse-button/gray drag-and-drop-area directions, file-description dialog, Start Upload/OK instructions, and the UI-specific add/delete/modify-uploaded-files sequence. |
| Step 6, lines 401-437 | Retains the requirement to select a distribution licence when files are uploaded, including the original explanation of why a licence is needed, reading the distribution agreement, and contacting support for another licence. Removes “in this step”, the red-box/green acceptance instruction, licence-dropdown instruction, OPEN License Selector explanation and “Click Next to continue.” The entire “For datasets that require license signing” wording is retained, with a paragraph wrapper and repaired link. |
| Step 7, lines 439-442 | Removes the complete “Leave a note” step and “You can leave a note for the reviewer in this step.” No current note-field capability is asserted. |
| Step 8, lines 444-450 | Retains only “Review your submission before submitting it.” Removes the sub-review panels, Correct navigation, Complete Submission and Save & Exit instructions and save-for-later UI promise. |
| Step 9, lines 452-457 | Removes the Complete Submission/review-step click trigger. Condenses the remainder to editorial review, publication after editor approval and editor contact for further details. No new timing, approval criterion or workflow transition is introduced. |

All ten figures, screenshots and captions are removed: `step1.png` (Menu Login),
`step2.png` (Menu Submissions), `step2_1.png` (Starting a submission), `step3.png`
(Submission info), `step4.png` (Describing item - people and organizations),
`step4_1.png` (Describing item - resource details), `step5.png` (Uploading file),
`step6_1.png` (Distribution license agreement), `step6_2.png` (Selecting license),
and `step6_3.png` (OPEN License Selector). These correspond to Fig1-Fig10 in v5.
The screenshot styles at lines 310-325, inline layout styles and current-only
literal Angular `alt` expressions are removed too. The assets themselves are not
deleted or changed. The preceding audit established that they exist; their defect
here was obsolete guidance, not missing files.

The generic retained guidance above is traceable to v5, but is not a tested
submission procedure. Retained local-account, optional-upload, licensing and
editorial promises still require the operational review below.

## Link changes

The shared loader is unchanged. Current fragments use base-relative `static/NAME`, `static/NAME#id`, `contract` and `licenses` links. The table below records the initial migration; dot-relative and fragment-only forms were subsequently converted to those base-relative hrefs to avoid changing upstream loader behavior.

| Location | Result |
| --- | --- |
| FAQ's 17 surviving TOC links, previously `static/faq#...` | `#...`, matching the v5 same-page convention. |
| FAQ policies, previously `static/about` | `./about`, matching v5. |
| FAQ public licence list, previously/v5 `licenses` | `../licenses`, the existing public Angular route, not the administrative licence table. |
| Six surviving FAQ and two deposit support links, previously `#` | `mailto:info@clarin.lv`. |
| Deposit distribution agreement, previously `contract`, v5 `./contract` | `../contract`, the existing Angular route. |
| Deposit restricted-submissions link, previously `static/item-lifecycle#restricted-submissions` | `./item-lifecycle#restricted-submissions`, matching v5; the target heading exists. |
| New neutral cookie help | `./privacy-policy`, the existing shared static privacy page. |

The obsolete `discover` links and screenshot-dependent selector link are removed,
not redirected to untested equivalents. Surviving licence links, FORCE11/GÉANT
links, and the UFAL upstream guide are not rebranded. External availability,
authorization and backend licence data are not verified by this content edit.

## Cookies: unmatched content replaced, not claimed as a v5 migration

There is no saved v5 cookie-page body with which to establish a text match.
`v5-browser.json:706-708` does record the banner's “More Information” link to
`https://repository.clarin.lv/repository/xmlui/page/cookies`. The captured v5 shell
contains Google Analytics and Matomo scripts. These are historical reference and
integration evidence only; neither proves the old cookie assurances or current
v7 tracking, consent or data-handling behavior. The banner's implied-consent
wording is not transplanted.

The complete previous root cookie page is replaced by two neutral help sentences:

> You can access cookie preferences using Cookie settings in the footer.
>
> For information about personal data, see our privacy policy.

The footer button and its English “Cookie settings” label exist in the current
source; the button opens Klaro settings rather than this static page. Klaro's own
privacy destination is `/info/privacy`. The preceding audit found no inbound
application-source link to `/static/cookies` or `cookies.html`, but the file is
still addressable through the generic static-page route. No navigation or consent
mechanism is changed or added.

### Original claims removed for LUMII review

These refer to the pre-edit `src/static-files/cookies.html`, not an available v5
cookie-policy capture:

- Lines 5-9: site-use statement and the summary that Directive 2009/136/EC permits
  essential cookies and requires permission for all others. The new help text
  makes no legal-compliance or consent-law assertion.
- Line 21: “We use DiscoJuice and Shibboleth cookies” for IdP choice and login
  session ID. Deployment-specific use and classification as strictly necessary
  were not verified.
- Line 23: Google Analytics use, sending a cookie to Google, third-party disclosure
  conditions, lack of influence over those actions, and “We have not allowed
  Google to use the obtained Analytics information for other Google services.”
- Line 24: anonymity “wherever possible”, “Your IP address is not explicitly
  given”, US-server storage, and Google's Safe Harbor membership as an assurance
  of adequate personal-data protection. **The Safe Harbor adequacy assurance is
  obsolete and must not be reintroduced as a current safeguard.** No replacement
  transfer mechanism is invented.
- Line 26: Piwik use, cookie placement, “no personal data will be collected”, and
  assertions that the anonymous session ID is meaningless to others and cannot
  identify an individual. A reference to historical Matomo scripts is not proof
  of those anonymity claims.

The generic cookie definition and browser-control advice at lines 12-17 and 28-29
are also omitted to keep this a short help page, not because their general subject
is disproved. Their `aboutcookies.org` link (including `target="_black"`) and the
Directive PDF link disappear with the replaced body.

LUMII needs a deployment-specific cookie/privacy policy based on an inventory of
actual cookies and similar storage, domains/providers, purposes, lifetimes,
required/optional classification, consent and withdrawal behavior, recipients,
retention and any international transfers. This page is not that inventory, does
not certify that the footer controls every third-party cookie, and does not assert
that any tracker is enabled or disabled. Root English content only is changed;
locale-specific files, including the existing Czech cookie page, are outside this
write scope and are not represented as corrected.

## LUMII review: retained matching policy and operational claims

The following remain because they are source-backed and within the approved
migration, **not because this work has verified them**:

1. **Access and identity:** downloads without login under freely shareable licences;
   login/signature requirements for restricted downloads; the FAQ's “any” EduGAIN
   account claim and institution-search instruction; provision of local accounts;
   the two exact login errors and provider-switch support procedure; email-only
   requirements and GÉANT Data Protection Code of Conduct adherence.
2. **Accepted submissions and licensing:** the scope of linguistic/NLP resources,
   metadata-only records/optional uploads, linked software projects, recommended
   formats, available free/CC licences, custom-licence assistance, electronic
   deposition agreements and rights warranties. Distribution-agreement access and
   licence availability must be checked against actual collections/configuration.
3. **Restricted/nonpublic data:** online licence signing and immediate availability,
   authentication before download, requests for extra user attributes/purpose,
   support for more closed licences, and archiving data that are not publicly
   available. No new automatic embargo-release or self-service access-control
   feature is inferred from the FAQ's question about future availability.
4. **Preservation:** “free and safe”, on-site and off-site backups, regular checking
   and replacement of corrupted copies, and “at least three copies, one of them
   off-site, at all times”. These are substantive commitments requiring confirmation
   of real backup, fixity and recovery arrangements.
5. **Discovery and services:** visibility in google, VLO, DataCite, OLAC, Data Citation
   Index and arXive; extra full-text/tree-query services; ready-to-use one-click
   BibTex/RIS/other citation formats; permanent/future-proof PIDs and the citation
   rationale. The removed Czech search examples are not replaced with assertions
   about the current search engine's configuration.
6. **Curation and publication:** metadata/IPR/licensing checks, reviewer assistance,
   PID assignment, editorial approval before publication and contact for further
   details. The generic deposit summary is not an audited v7 workflow.
7. **Versioning and withdrawal:** new versions/new PIDs for changes, reviewer
   discretion for minor corrections, helpdesk withdrawal and retained administrative
   metadata, plus the prohibition on changing published data in the new-version
   answer. Reconcile the minor-edit exception with that prohibition rather than
   silently rewriting either policy. Removing the LRT-specific relocation service
   does not remove the general withdrawal policy.
8. **Inherited context:** the LRT collection and Czech search examples appeared even
   on Latvian v5; a textual match did not establish local applicability. No Czech
   institutional guarantee is reassigned to LUMII. The retained upstream
   `https://github.com/ufal/clarin-dspace/wiki/New-Version-Guide` needs a separate
   v7-applicability review; keeping attribution is not endorsing every old UI step.

## Review limits

The parent directories, current target files, loader behavior, footer label and
restricted-submissions target were inspected before editing. The bounded diff is
reviewed as source content only. No tests, builds, browser runs, runtime actions,
network requests, commits or pushes are performed for this implementation, as
requested. No claim of live link, authentication, workflow, backup, cookie-consent
or legal validation is made.
