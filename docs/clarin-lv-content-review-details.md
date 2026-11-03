# CLARIN-LV content review: supporting evidence

**Start with the [short AI Lab checklist](clarin-lv-content-review.md).** This supporting record preserves exact sources, technical details and detailed review questions; it is not required reading for the initial staff review.

Prepared 2026-10-30 for the UI-customisation PR. **AILab staff content, operational, linguistic and legal review is assigned AFTER this PR**, not as a prerequisite for preparing it. This is a review list, not legal approval, a new policy version or a deployment record.

## How to use this list

**Staff test-server access:** follow the [short checklist's access instructions](clarin-lv-content-review.md#where-to-review). Connect to the AI Lab VPN and add `85.254.210.69 repository.clarin.lv` to your computer's hosts file. With that override, the intended-public URLs below open the test server; revised content appears only after this build is deployed. Links labelled local are for the local development environment, not staff remote access. Remove the override before comparing the original v5 source URLs, since they share the same hostname.

- Open each **local rendered** link below, select English and Latvian using the existing language selector, and compare the linked EN/LV source fragments. Both languages use the **same rendered route**; there is no `?lang=` URL or `/lv/` route segment.
- **Public links are intended destinations, NOT deployed yet.** Local EN/LV rendering of the nine migrated page pairs passed the focused preview checks. These checks establish presentation, not policy approval or backend capabilities.
- Source-file links contain the exact proposed text. The construction notes explain reuse, omissions and draft translation without reproducing whole policies. Historical v5 URLs use `locale-attribute=en/lv`; that parameter is provenance only, not current routing.
- “Reused” means published wording retained; “adapted” means the identified source was changed; “AI-assisted draft” means new wording/translation requiring staff review. None means approved, legally equivalent or operationally verified.
- Detailed evidence: [policy migration](clarin-lv-policy-migration.md), [help review](clarin-lv-help-review.md), [deposit sources](clarin-lv-deposit-source.md), [language sources](clarin-lv-language-sources.md). Deposit sources supersede the old deposit condensation; language sources supersede old English-fallback statements. Their substantive review flags remain.
- Only main-content fragments are reused, not v5 navigation, tracking, scripts, styles or screenshots. Source snapshots referenced by those records live in the sibling `.ui-audit` directory, not deployed assets.

## Added / modified policies and guides — EN and LV

### 1. About and policies — EN modified; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/about) · [intended public — not deployed](https://repository.clarin.lv/repository/static/about).
- Exact proposed text: [EN](../src/static-files/about.html) · [LV](../src/static-files/lv/about.html).
- v5 sources: [EN](https://repository.clarin.lv/repository/xmlui/page/about?locale-attribute=en) · [LV](https://repository.clarin.lv/repository/xmlui/page/about?locale-attribute=lv).
- **EN/LV reused, links/markup adapted:** genuine published bodies cover mission, terms, contracts, IPR, privacy, metadata and preservation. Institutional wording comes from Latvian-centre v5, not a Czech-name substitution. LV's empty CC0 anchor is repaired around existing text; no new translation is claimed.
- **AILab questions:** Are the default no-licence permission, citation/robot restrictions, custom licences, signing, preservation and transfer-to-another-centre promises supportable? Is commercial-use notification consistent with CC0? Review LV fixity/compression wording and “activity stopping” versus EN withdrawal of funding.

### 2. Privacy policy — EN and LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/privacy-policy) · [intended public — not deployed](https://repository.clarin.lv/repository/static/privacy-policy).
- Exact proposed text: [EN](../src/static-files/privacy-policy.html) · [LV](../src/static-files/lv/privacy-policy.html); also used by the shared Info view below.
- v5 sources: [EN](https://repository.clarin.lv/repository/xmlui/page/privacy-policy?locale-attribute=en) · [LV](https://repository.clarin.lv/repository/xmlui/page/privacy-policy?locale-attribute=lv).
- **EN/LV reused, markup adapted:** semantic headings replace panels; LV's erroneous heading brand `PASSENGER-LV` becomes `CLARIN-LV`. Other inherited wording is not silently legally repaired.
- **AILab questions:** Confirm controller/address and an actionable privacy contact (the source gives only an institution), actual IdP attributes/logs/signatures, nondisclosure outside the team, “no profile” storage, deletion on request/five-year inactivity and GÉANT v1 adherence. Review LV entitlement parenthesis, “lietotāja atļauja”, “dienesta”, “Piekritība” and request wording.

### 3. Terms of service — existing EN modified; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/terms-of-service) · [intended public — not deployed](https://repository.clarin.lv/repository/static/terms-of-service).
- Exact proposed text: [EN](../src/static-files/terms-of-service.html) · [LV](../src/static-files/lv/terms-of-service.html); also used by the shared EUA view below.
- v5 sources/checks: [EN](https://repository.clarin.lv/repository/xmlui/page/terms-of-service?locale-attribute=en) · [LV-locale response](https://repository.clarin.lv/repository/xmlui/page/terms-of-service?locale-attribute=lv), whose recorded body is **English**, not a published LV translation.
- **EN reused/adapted:** resolved v5 provider/address/Latvia/Riga wording, all ten articles and historical `v1.0`; valid list structure and page heading. Article 7 links existing words via `href="static/privacy-policy"`, deliberately base-relative for both static and Info views.
- **LV AI-assisted draft:** translation of current EN, preserving numbering, category/condition codes, obligations, limitations, notice and termination provisions. “To archive this goal” is interpreted as “Lai sasniegtu šo mērķi”, not a new obligation.
- **AILab questions:** Confirm provider-name inconsistency with privacy, court designation (“Riga District Court of Law” / “Rīgas rajona tiesa”), jurisdiction/injunctions, IdP definitions, noncommercial “or” / “vai”, LOC question mark, SA reciprocity, liability and legal equivalence. Consent version/notification policy is a separate owner decision, not implemented here.

### 4. Metadata guide and policy — EN modified; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/metadata) · [intended public — not deployed](https://repository.clarin.lv/repository/static/metadata).
- Exact proposed text: [EN](../src/static-files/metadata.html) · [LV](../src/static-files/lv/metadata.html).
- v5 sources/checks: [EN](https://repository.clarin.lv/repository/xmlui/page/metadata?locale-attribute=en) · [LV-locale response](https://repository.clarin.lv/repository/xmlui/page/metadata?locale-attribute=lv), recorded with an **English body** and older VLO wording.
- **EN reused/adapted; LV AI-assisted draft from current EN:** retains three tables, fields/statuses, DC mappings, profile IDs, technical values and fuller VLO/concept explanation. `/server/oai/request?verb=ListMetadataFormats` is the loader's backend placeholder, not the old Czech service or a newly invented public API URL.
- **AILab questions:** Verify CC0/commercial notification, English-only metadata requirement, 2014 profile history, arbitrary CMDI support, current fields/required flags, mappings and actual OAI formats. Review LV public-domain and metadata terminology; translating help does not change submission language requirements.

### 5. Citation guide / policy — EN modified; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/cite) · [intended public — not deployed](https://repository.clarin.lv/repository/static/cite).
- Exact proposed text: [EN](../src/static-files/cite.html) · [LV](../src/static-files/lv/cite.html).
- v5 sources: [EN](https://repository.clarin.lv/repository/xmlui/page/cite?locale-attribute=en) · [LV](https://repository.clarin.lv/repository/xmlui/page/cite?locale-attribute=lv).
- **EN/LV reused/adapted:** removes both RefBox/BibTeX screenshots, captions/styles, location/example pointers and screenshot-dependent click/export directions. Citation principles, permanent-Handle statement, RDA implementation claim and BibTeX statement remain.
- **AILab questions:** Are those implementation/export/permanence claims accurate? Correct inherited LV “Datu šifrēšanas darba grupas” (linked Data Citation Work Group), “Citāta turis” and “Tura sistēma” through staff review, not an assumption of translation equivalence.

### 6. Deposited item lifecycle — EN modified; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/item-lifecycle) · [intended public — not deployed](https://repository.clarin.lv/repository/static/item-lifecycle).
- Exact proposed text: [EN](../src/static-files/item-lifecycle.html) · [LV](../src/static-files/lv/item-lifecycle.html).
- v5 sources: [EN](https://repository.clarin.lv/repository/xmlui/page/item-lifecycle?locale-attribute=en) · [LV](https://repository.clarin.lv/repository/xmlui/page/item-lifecycle?locale-attribute=lv).
- **EN/LV reused/adapted:** omits each source's example Handle and infrastructure-move/PID-resolution guarantee; EN's LINDAT-named guarantee is not rebranded. LV also omits its generic “Repozitorijs” counterpart. General PID advice stays; LV adds EN's upstream new-version URL to existing words.
- **AILab questions:** Confirm editorial/IPR checks, deletion discretion/tombstones, OAI-PMH/OAI-ORE exposure, signature records, custom licences and embargo release. Reconcile minor edits with About/FAQ's published-data prohibition; review LV “bitu plūsma”, IIT/IĪT and harvesting terminology.

### 7. FAQ — EN modified; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/faq) · [intended public — not deployed](https://repository.clarin.lv/repository/static/faq).
- Exact proposed text: [EN](../src/static-files/faq.html) · [LV](../src/static-files/lv/faq.html).
- v5 sources: [EN](https://repository.clarin.lv/repository/xmlui/page/faq?locale-attribute=en) · [LV](https://repository.clarin.lv/repository/xmlui/page/faq?locale-attribute=lv).
- **EN/LV reused/adapted:** removes LRT relocation, the entire obsolete search answer/examples/TOC entry and unconditional selector recommendation. Retains CLARIN-LV format recommendation, nonpublic-archiving answer and six support mailto links. **LV AI-assisted addition only:** current EN's `new-version` heading/paragraph and two TOC entries, absent from the LV capture.
- **AILab questions:** Verify EduGAIN/local-account/login-error claims, immediate restricted access, nonpublic archiving, discovery services, citation exports, withdrawal and “at least three copies, one off-site”. Review LV `eppn` mistranslation as “e-pasta ziņojumu”, no-use versus no-abuse wording, “bezmaksas”, “Glabātājam”, credit/citation and grammar.

### 8. Deposit guide — EN modified; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/deposit) · [intended public — not deployed](https://repository.clarin.lv/repository/static/deposit).
- Exact proposed text: [EN](../src/static-files/deposit.html) · [LV](../src/static-files/lv/deposit.html).
- Historical v5 comparison: [EN](https://repository.clarin.lv/repository/xmlui/page/deposit?locale-attribute=en) · [LV](https://repository.clarin.lv/repository/xmlui/page/deposit?locale-attribute=lv); neither supplies the current v7 workflow.
- **EN adapted procedural draft:** [public LINDAT deposit guide](https://lindat.mff.cuni.cz/repository/static/deposit), recorded retrieval 2026-10-30, plus local templates/UI labels and applicable existing prose. No upstream commit was verified; no live HTML/artwork/screenshots are imported and no reuse licence is asserted. **LV reused + AI-assisted draft:** applicable v5 phrases plus translations of updated EN actions/qualifications using existing LV dictionary labels.
- Construction: nine reading steps, not a new wizard; upper-right Login, Your submissions / +, form sections, upload, collection-specific agreement, resource licence, optional selector/Note, save/deposit and conditional editorial review. Restricted-data support must be confirmed **before uploading**; selecting a licence alone is not access enforcement.
- **AILab questions:** Validate submitter roles/collections, fields/uploads, save/resume, actual agreement, selector integration, restrictions/signatures, Note, deposit confirmation/editorial routing and version actions. Review “deponēt”, licence distinctions and awkward dictionary labels separately; source inspection is not an authenticated workflow test.

### 9. Cookies help — EN replaced; LV added

- Rendered: [local](https://repository.dev.test:8443/repository/static/cookies) · [intended public — not deployed](https://repository.clarin.lv/repository/static/cookies).
- Exact proposed text: [EN](../src/static-files/cookies.html) · [LV](../src/static-files/lv/cookies.html).
- Historical references only: [v5 EN URL](https://repository.clarin.lv/repository/xmlui/page/cookies?locale-attribute=en) · [v5 LV URL](https://repository.clarin.lv/repository/xmlui/page/cookies?locale-attribute=lv). **No verified equivalent cookie-policy body** is available in either language; these are not matched translation sources.
- **EN neutral constructed help / AI-assisted draft, not migrated policy:** “You can access cookie preferences using Cookie settings in the footer.” / “For information about personal data, see our privacy policy.” **LV AI-assisted translation:** “Sīkdatņu preferences varat atvērt, izmantojot kājenē esošo pogu Sīkdatņu iestatījumi.” / “Informāciju par personas datiem skatiet mūsu privātuma politikā.”
- **AILab questions:** Confirm wording and actual preference/withdrawal behaviour. Footer Cookie settings invokes the unchanged upstream cookie action, not this static help route. A deployment-specific cookie inventory/policy is still needed; neither tracker configuration nor compliance is certified.

## Shared views and linked dynamic pages — not additional translated policy bodies

| Route / status | Local rendered URL | Intended public URL — NOT deployed yet | Exact construction / staff check |
| --- | --- | --- | --- |
| `/info/privacy` — modified shared view | [local](https://repository.dev.test:8443/repository/info/privacy) | [public](https://repository.clarin.lv/repository/info/privacy) | [Component](../src/app/info/privacy/privacy-content/privacy-content.component.ts) selects compile-time EN/LV privacy fragments from entry 2 using the active language. No separate legal text; verify selector and cookie-dialog destination. |
| `/info/end-user-agreement` — modified shared view | [local](https://repository.dev.test:8443/repository/info/end-user-agreement) | [public](https://repository.clarin.lv/repository/info/end-user-agreement) | [Component](../src/app/info/end-user-agreement/end-user-agreement-content/end-user-agreement-content.component.ts) selects compile-time EN/LV terms fragments from entry 3. Verify both languages and article 7 link; acceptance guards/persistence/version values are not changed by content migration. |
| `/contact` — linked, unchanged | [local](https://repository.dev.test:8443/repository/contact) | [public](https://repository.clarin.lv/repository/contact) | Existing [contact view](../src/app/contact-page/contact-page.component.html), translated UI labels/configured email and feedback link, not a newly authored policy. Confirm support destination; do not treat it as an invented privacy contact. |
| `/contract` — linked, dynamic legal content unchanged | [local](https://repository.dev.test:8443/repository/contract) | [public](https://repository.clarin.lv/repository/contract) | [Source](../src/app/license-contract-page/license-contract-page.component.ts) loads collection agreement via `collectionId`, or authorised collections. About links here; Deposit directs readers to their form's collection-specific agreement. Verify access and actual EN/LV availability; do not assume translated backend text. |
| `/licenses` — linked, dynamic legal content unchanged | [local](https://repository.dev.test:8443/repository/licenses) | [public](https://repository.clarin.lv/repository/licenses) | [Source](../src/app/clarin-licenses/clarin-all-licenses-page/clarin-all-licenses-page.component.ts) loads backend licences for the public list, not the admin table. Confirm inventory, restrictions and language availability independently. |

Generic DSpace “Company”, under-13 and unrelated hosting/IP boilerplate was replaced in Info views by the shared repository text, not localised into new promises. **Resource legal texts are not blanket-rebranded:** dataset licences, third-party rights, software attribution and notices remain intact; this list does not audit every dataset licence.

## External linked software, policy and standards guidance

These exact destinations occur in the reviewed EN/LV fragments (except the separately identified deposit source). They remain external references, not CLARIN-LV-authored or translated policies. Availability, target language and current applicability were not network-checked here.

| Reference and exact link(s) | Used by / review purpose |
| --- | --- |
| [AILab EN](http://www.ailab.lv/en/) / [AILab LV](http://www.ailab.lv/); [CLARIN Short Guide](http://www.clarin.eu/sites/default/files/centres-CLARIN-ShortGuide.pdf) | About: institutional attribution and mission background; verify current destinations. |
| [CC0](http://creativecommons.org/about/cc0); [Creative Commons licences](http://creativecommons.org/licenses/); [Open Source licences](http://opensource.org/licenses) | About/Metadata and FAQ: general reuse/licensing guidance, not an enumeration of resource licences; review CC0/notification tension. |
| [GÉANT v1 conduct](http://www.geant.net/uri/dataprotection-code-of-conduct/v1); [GÉANT conduct](http://www.geant.net/uri/dataprotection-code-of-conduct) | Privacy and FAQ respectively: confirm applicable commitment/version, not just the existence of a link. |
| [CLARIN-LV recommended formats](https://standards.clarin.eu/sis/views/view-centre.xq?id=CLARIN-LV) | FAQ: restored centre-specific recommendation; confirm present format support. |
| [CMDI introduction](http://clarin.eu/cmdi); [OAI DC schema](http://www.openarchives.org/OAI/2.0/oai_dc.xsd) | Metadata: standards guidance; backend format support remains separately unverified. |
| [Current profile p_1403526079380](https://catalog.clarin.eu/ds/ComponentRegistry?registrySpace=published&itemId=clarin.eu:cr1:p_1403526079380); [older profile p_1349361150622](https://catalog.clarin.eu/ds/ComponentRegistry?registrySpace=published&itemId=clarin.eu:cr1:p_1349361150622) | Metadata: inherited profile selection/history needs local confirmation. |
| [Profile p_1288172614026](https://catalog.clarin.eu/ds/ComponentRegistry?registrySpace=published&itemId=clarin.eu:cr1:p_1288172614026); [component c_1349361150621](https://catalog.clarin.eu/ds/ComponentRegistry?registrySpace=published&itemId=clarin.eu:cr1:c_1349361150621) | Metadata: historical XPath/component-mapping explanation, not newly validated Latvian provenance. |
| [ISOcat](http://www.isocat.org); [CCR](https://www.clarin.eu/conceptregistry/); [DCMI terms](http://purl.org/dc/terms); [abstract](http://purl.org/dc/terms/abstract) | Metadata: retained concept-registry history, including explicitly retired ISOcat. |
| [VLO](https://vlo.clarin.eu/); [VLO mappings](https://vlo.clarin.eu/mapping); [legacy VLO address](http://catalog.clarin.eu/vlo/) | Metadata and lifecycle: verify mapping and harvesting claims; legacy address is still linked. |
| [FORCE11 citation](https://www.force11.org/datacitation); [endorsements](https://www.force11.org/datacitation/endorsements); [Data Citation Principles](https://www.force11.org/group/joint-declaration-data-citation-principles-final) | FAQ and Cite: citation guidance/endorsement, not proof of local implementation. |
| [RDA](https://rd-alliance.org); [Data Citation Work Group](https://rd-alliance.org/groups/data-citation-wg.html) | Cite: review claimed implementation and incorrect inherited LV group name. |
| [UFAL CLARIN-DSpace New Version Guide](https://github.com/ufal/clarin-dspace/wiki/New-Version-Guide) | Lifecycle, FAQ and Deposit: retained upstream software documentation; review v7 applicability, not UFAL service ownership. |
| [LINDAT deposit guide](https://lindat.mff.cuni.cz/repository/static/deposit) | Provenance for adapted Deposit, not an in-page external link or a tested local procedure; no source commit or reuse rights inferred. |

## Unmatched Czech-only / obsolete clauses — explicit post-PR decisions

Do not restore these by replacing institutional names. The policy/help evidence records contain exact deletion details.

- **Ten-year access after funding loss:** UFAL guarantee has no Latvian About counterpart. Retained transfer-to-another-CLARIN-centre wording has no ten-year duration; staff must confirm that separate promise.
- **Charles University/UFAL identity/history:** hosting, biography, teaching/research and `/about-lindat-clarin` material is omitted, not reassigned to AILab.
- **OAIS/Charles University rules and periodic CLARIN/CTS assessment:** extra Czech About assertions, including `https://hdl.handle.net/11234/6-CTS`, are absent from Latvian main content. Do not infer Latvian certification; certificate/footer work is separate.
- **LINDAT PID continuity guarantee and Czech OAI endpoint:** omitted rather than attributed to LUMII. Remaining generic Handle permanence and CMDI history still require review, even where v5 wording matched.
- **LRT relocation and XMLUI/SOLR search guidance:** removed wholesale, including Czech/localised examples and unsupported OR-default/query claims. No substitute relocation service or search syntax is invented.
- **Unmatched cookie assertions:** removed Directive-law summary, DiscoJuice/Shibboleth classification, Google Analytics disclosures/US storage/anonymity, Piwik “no personal data” and Safe Harbor adequacy assurance. **Safe Harbor must not return as a current safeguard.** Historical shell scripts prove neither current trackers nor consent behaviour.
- **Foreign deposit promises/UI:** no automatic account creation/licence installation/signature enforcement, foreign collection fields, helpdesk, badges or old XMLUI screenshots are transferred. The updated guide's conditional selector is distinct from the removed unconditional FAQ recommendation.

## Operational and translation review — AILab after the PR

- Assign staff owners for legal/privacy, repository operations and Latvian language review; record corrections and decisions against entries 1–9, including inherited translations, not only new drafts.
- Confirm retention/deletion/contact and IdP/logging facts; reconcile institution names, Latvia/Riga legal terms and policy acceptance. **Policy/consent version, user notification and renewed acceptance remain a separate LUMII/Arnis decision before release**, not an automatic consequence of translation or the retained `v1.0` label.
- Verify backup/fixity/recovery evidence, three-copy/off-site promises, preservation/export/format migration and funding-withdrawal transfer arrangements. Published v5 wording is not evidence that these operations currently exist.
- Reconcile About/FAQ/lifecycle/editorial claims with Deposit's collection-dependent qualifications, especially restricted access, signatures, metadata-only submissions, publication, minor corrections, new PIDs and withdrawal/tombstones.
- Validate metadata fields/profiles/OAI, discovery/citation exports, authentication and version-guide applicability against the actual deployment. Review all LV terminology flagged above; reused Latvian is not certified equivalent English.
- Prepare a separate cookie/storage inventory: providers/domains, purposes, lifetimes, required/optional classification, consent/withdrawal, recipients, retention and international transfers. Neutral help is not this policy and does not promise control of every third-party cookie.

## Copy-ready PR follow-up

> **Post-PR owner: AILab staff (LUMII), with legal/privacy, repository-operations and Latvian-language reviewers.** After this PR, review the nine EN/LV policies/guides, shared Info views, linked dynamic agreements/licences and external references listed in `docs/clarin-lv-content-review.md`. Confirm inherited operational/legal promises, assess omitted unmatched Czech clauses, and correct both reused translations and AI-assisted drafts. Record decisions and follow-up changes; this PR does not assert legal approval or deployment. Resource legal texts and upstream attribution are not blanket-rebranded. LUMII/Arnis must separately decide policy/consent versioning, user notification and any renewed acceptance before release. This branch is limited to branding, visual/navigation presentation and migrated EN/LV content. Shared static-page loading, routing/history, language switching, cookie behavior, authentication and backend workflows are unchanged. Focused customization checks passed; this is not a general DSpace acceptance test.

## Validation handoff

**Final change-focused checks, 2026-10-31:**

- **15 customization unit tests passed, exit 0**, across header, footer, shared CLARIN-LV links and the two shared EN/LV Info policy presentations. The harness no longer runs Contact, cookie-service, shared-loader or HTML-service suites.
- **27 focused live-preview browser checks passed, exit 0:** logo/partner/certificate assets, corpus target/new-tab attributes, Help de-duplication, narrow layout, nine EN/LV migrated page pairs and link namespaces, actual new Help-link navigation between content pages, shared Info policies and no uncaught exceptions during this smoke run.
- **122 migrated internal hrefs checked** across 18 fragments, including static target files and fragment IDs; all relative file links in the six review documents resolve. This does not assert external website availability or authorization to dynamic routes.
- `git diff --check` passed. Shared static loader, Contact and cookie-service files have no diff against HEAD. No global routing/history/cache/rate-limit or locale-service change is part of this branch.
- `task start-dev` succeeded; local stack is back in live-preview mode, preserving data. No commits, pushes or deployments.

Earlier broad SSR probes observed English initial HTML for LV cookies and HTTP 429 during repeated browser loads. Those failed runs remain documented in the [historical checkpoint](https://github.com/LUMII-AILab/dspace-angular/blob/30474d509566ef816a90a98844fbc472501f8128/docs/clarin-lv-ui-plan.md#previous-checkpoint--2026-10-30-paused-at-owner-token-limit-request-historical), not presented as passes. Per the owner's narrowed scope, their suspected upstream cache/rate-limit causes are **not being investigated or fixed in this branch**; no additional broad SSR suite is required here. Earlier production compilation passed before the final scope reduction; the final reduced patch was validated by the focused tests and live preview, not a fresh production rebuild.

Authenticated workflows, dynamic agreement/licence data, upstream history/scrolling, external destinations and operational/legal/translation approval are outside this customization regression check. AI Lab's content review remains explicitly assigned after the PR.

The November 3 review and subsequent local simplification checks are tracked in the
[current handoff](clarin-lv-ui-plan.md#validation-and-remaining-limits); they supersede
the older production-compilation status above without resolving SSR runtime acceptance.
