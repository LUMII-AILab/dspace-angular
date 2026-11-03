# AI Lab review checklist: policies and guides

**Purpose:** check that the new repository says the right things for CLARIN-LV. This content review is planned **after the UI pull request (PR)**. Visual approval does not mean the policies or translations have been approved.

**How to review:** open each page and check **both English and Latvian** using the language buttons. For each item, reply **“OK”**, **“change needed”** (with suggested wording), or **“needs a decision”** (and who should decide).

## Where to review

**Staff should use the Test server links; no local development environment is needed. The revised policies and guides will be visible there only after this build is deployed.** Until then, a test link may show older content or a missing page. Wait for the deployment confirmation before reviewing.

To reach the test server, connect to the AI Lab VPN and add this entry to your computer's hosts file (ask IT for help if needed):

```text
85.254.210.69 repository.clarin.lv
```

This makes `repository.clarin.lv` resolve to the **new test server** on your computer instead of the current public v5 server. Use the HTTPS links below, not the IP address in the browser. Remove the entry when you need to access the current public site or compare the original v5 pages—the override affects those links too.

**Local dev environment** links are retained for developers only; they require the development stack on that computer. [Detailed sources and intended public links](clarin-lv-content-review-details.md) are available if needed.

## Pages to review

### 1. About and policies
[Local dev environment](https://repository.dev.test:8443/repository/static/about) · [Test server — after deployment](https://repository.clarin.lv/repository/static/about)
- **How we made it:** copied the English and Latvian text from our old v5 repository, updating links and presentation. Czech institutional details and promises without a Latvian equivalent were left out.
- **Please check:** our description, rules for using data, and promises about preserving data or transferring it elsewhere if the service closes. Can we still stand behind these statements?

### 2. Privacy policy
[Local dev environment](https://repository.dev.test:8443/repository/static/privacy-policy) · [Test server — after deployment](https://repository.clarin.lv/repository/static/privacy-policy)
- **How we made it:** copied our v5 English and Latvian policies. Corrected the wrong repository name in the Latvian heading. This text also replaces the generic privacy text supplied with DSpace.
- **Please check:** who is responsible and how to contact them; what personal information we collect, share and keep; and whether the stated deletion periods are correct.

### 3. Terms of service
[Local dev environment](https://repository.dev.test:8443/repository/static/terms-of-service) · [Test server — after deployment](https://repository.clarin.lv/repository/static/terms-of-service)
- **How we made it:** used our v5 English terms, which largely matched the inherited v7 terms, keeping Latvia-specific provider, address and legal details. Added an **AI-assisted Latvian translation** because the old Latvian page actually contained English text. The same terms replace DSpace's generic agreement text.
- **Please check:** organisation name, address, applicable law/court, user obligations and liability. The Latvian translation needs particular legal and language review.

### 4. Metadata guide — describing a resource
[Local dev environment](https://repository.dev.test:8443/repository/static/metadata) · [Test server — after deployment](https://repository.clarin.lv/repository/static/metadata)
- **How we made it:** retained the largely matching v5/v7 English guidance, with CLARIN-LV references and updated links; kept the fuller v7 explanation of metadata discovery. Added an **AI-assisted Latvian translation**; no published Latvian body was found in v5.
- **Please check:** required fields, the requirement to describe resources in English, and rules for reusing these descriptions. Ask the repository specialist to confirm the technical tables and supported formats.

### 5. Citation guide
[Local dev environment](https://repository.dev.test:8443/repository/static/cite) · [Test server — after deployment](https://repository.clarin.lv/repository/static/cite)
- **How we made it:** copied the relevant v5 English and Latvian guidance, removing old screenshots and instructions tied to them.
- **Please check:** the advice on citing resources, permanent links and citation export. Some inherited Latvian wording is awkward or incorrect and needs correction.

### 6. What happens to a deposited resource
[Local dev environment](https://repository.dev.test:8443/repository/static/item-lifecycle) · [Test server — after deployment](https://repository.clarin.lv/repository/static/item-lifecycle)
- **How we made it:** reused the v5 English and Latvian descriptions. Removed old examples and a guarantee about links surviving infrastructure moves rather than assigning that promise to our team.
- **Please check:** review before publication, corrections/new versions, restricted access, withdrawal and deletion. Does this describe how our team actually handles deposits?

### 7. Frequently asked questions
[Local dev environment](https://repository.dev.test:8443/repository/static/faq) · [Test server — after deployment](https://repository.clarin.lv/repository/static/faq)
- **How we made it:** reused our v5 English and Latvian answers, removing obsolete search instructions and Czech-specific services. Added a small **AI-assisted Latvian explanation of new versions**.
- **Please check:** login/support advice, private or restricted deposits, withdrawal, and the promise of at least three backup copies, including one off-site. Review the Latvian wording too.

### 8. How to deposit
[Local dev environment](https://repository.dev.test:8443/repository/static/deposit) · [Test server — after deployment](https://repository.clarin.lv/repository/static/deposit)
- **How we made it:** adapted the Czech centre's current v7 deposit guide to our interface, keeping suitable wording from v5. Removed Czech-specific details and screenshots. Latvian combines reused v5 phrases with **AI-assisted translations of the updated steps**.
- **Please check:** have a staff member familiar with depositing confirm the steps, available options, agreements/licences and what happens after submission. This is a draft guide, not a verified description of every collection's workflow.

### 9. Cookies help
[Local dev environment](https://repository.dev.test:8443/repository/static/cookies) · [Test server — after deployment](https://repository.clarin.lv/repository/static/cookies)
- **How we made it:** wrote a short new explanation pointing to Cookie settings and the privacy policy, with an **AI-assisted Latvian translation**. Removed outdated Czech cookie/tracking claims; no matching v5 policy was available to copy.
- **Please check:** the wording. **This is not a complete cookie policy**—the team still needs to confirm which cookies/tracking services are used and what must be disclosed.

## Linked pages: not new policies

The test links here require the same VPN/hosts setup. The revised privacy and agreement wording appears only after this build is deployed.

- **Privacy screen** — [Local dev environment](https://repository.dev.test:8443/repository/info/privacy) · [Test server](https://repository.clarin.lv/repository/info/privacy). Same text as item 2; no separate text review needed.
- **User-agreement screen** — [Local dev environment](https://repository.dev.test:8443/repository/info/end-user-agreement) · [Test server](https://repository.clarin.lv/repository/info/end-user-agreement). Same text as item 3; no separate text review needed.
- **Deposit agreements** — [Local dev environment](https://repository.dev.test:8443/repository/contract) · [Test server](https://repository.clarin.lv/repository/contract). Texts were **not changed or translated** here. Confirm suitability and language availability separately; login may be required.
- **Resource licences** — [Local dev environment](https://repository.dev.test:8443/repository/licenses) · [Test server](https://repository.clarin.lv/repository/licenses). Texts were **not changed or translated** here. Confirm suitability and language availability separately.
- **Contact** — [Local dev environment](https://repository.dev.test:8443/repository/contact) · [Test server](https://repository.clarin.lv/repository/contact). Unchanged page; confirm support details.

## Decisions to record

- Review **both reused and newly translated Latvian**; publication on v5 does not guarantee that its wording was correct.
- Czech-only promises, such as ten years of access after funding ends, were **not turned into Latvian commitments**. Flag anything our repository still needs to promise or explain.
- Before release, LUMII/Arnis must decide whether users need notice of changed policies or must accept the terms again. This UI work does not make that decision.

**PR follow-up note:** AI Lab staff will review the nine English/Latvian pages above after this PR, covering policy accuracy, real repository practices and translation quality. Record corrections and unresolved decisions. This PR does not claim legal approval or authorize deployment.

For exact old-page links, proposed text, detailed questions and technical test results, see the [supporting review record](clarin-lv-content-review-details.md). Staff can use this short checklist without reading that technical record.
