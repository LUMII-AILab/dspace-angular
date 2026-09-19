
<!-- dspace-skills:begin -->
## Private team playbooks (dataquest)

This repo vendors dataquest's private AI knowledge base as the `.dspace-skills/` git submodule. **If
`.dspace-skills/` is present**, treat **`.dspace-skills/AGENTS.md`** as the authoritative agent guide for this repo:
read it first, then load the matching profile (`.dspace-skills/profiles/frontend.md` for dspace-angular,
`.dspace-skills/profiles/backend.md` for DSpace) and pull skills from `.dspace-skills/skills/` on demand. Start any
PR/backport/test task from `.dspace-skills/SKILLS.md`.

If `.dspace-skills/` is empty (you don't have access, e.g. an outside contributor), ignore this section
and proceed with the public project conventions.

To enable: `git submodule update --init .dspace-skills` (requires access to
`dataquest-dev/dspace-skills`).
<!-- dspace-skills:end -->

## CLARIN local development

When using the sibling `clarin-dspace-ops` checkout, read its
[agent entry point](../clarin-dspace-ops/AGENTS.md) and
[local development runbook](../clarin-dspace-ops/docs/local-development.md).
Run `make dev-*` from ops and edit this frontend checkout. The runbook owns path
configuration, pinned container tooling, live reload, SSR and lifecycle recovery.
Check the existing environment state before starting work; preserve local data
and user changes. Initialization and destruction are explicit lifecycle actions,
not routine fixes for frontend errors.
