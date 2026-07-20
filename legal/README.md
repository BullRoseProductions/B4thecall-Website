# B4C Trust Center

Static site. No build step, no dependencies. Deploy the folder as-is.

## Deploy

Intended for `b4thecall.com/legal` (subpath, not a subdomain — same entity,
same trust). Drop the folder in and point the route at it.

## Structure

    index.html                          CMP-001  Welcome / hub
    governance/                         GOV-001
    company/                            CMP-003, 004, 005
    legal/                              LEG-001 … 008
    trust/                              TRU-001 … 004
    data/                               DAT-001, 002, 003
    operations/                         OPS-001
    assets/css/b4c-trust.css            all styling
    assets/js/b4c-trust.js              section navigator, scroll spy, mobile rail

## Self-contained pages

Every page carries its own CSS and JS inline. Nothing is loaded from a
sibling file, so a page renders correctly opened straight from disk, from
any folder, on any host. `assets/` is kept as the editable source of truth
but is not referenced by the pages.

To change the brand: edit `assets/css/b4c-trust.css`, then re-run
`build.py` to push the change into all 21 pages.

## Editing

Page content is plain HTML inside `<main class="doc">`. Sections are
`<section><h2 id="sN"><span class="n">NN</span> Title</h2> … </section>`.
The section navigator builds itself from those headings at page load, so
adding or removing a section needs no other change. Keep `id` and the
`.n` number in sync when you reorder.

The left rail is repeated in each file. If you add a document, add it to
every page's rail — or regenerate from the build script.

## Reconciled during the build

- `AI-001` → `TRU-002`. The Responsible AI Policy was renumbered; every
  cross-reference now points at TRU-002 and the document itself carries a
  `Supersedes: AI-001` field in its control block.
- `CMP-005` is titled **Platform Definitions** everywhere (was referenced
  in places as "Definitions & Glossary").
- `LEG-004` is titled **Billing & Subscription Policy** everywhere (was
  referenced in places as "Billing Terms").
- DAT documents live under `data/`, not `legal/`.

## Still open before publication

1. **Unwritten documents** — CMP-002, OPS-002, OPS-003, OPS-004 appear in
   the rail dimmed and unclickable. KB-001 and OPS-007 are referenced in
   document text but have no page. Write them or remove the references.
2. **Effective dates** — every page reads "19 July 2026". Set the real
   publication date.
3. **Business hours** — LEG-008 §4 refers to hours "as published". They
   are not published anywhere.
4. **Security contact** — TRU-004 invites private vulnerability reports.
   Consider `security@b4thecall.com` separate from support.
5. **Subprocessors** — LEG-002 §8, LEG-006 §6, TRU-001 §9, TRU-003 §11 all
   describe third-party providers in the abstract. Confirm the list matches
   the real stack.
6. **Export capability** — DAT-003 §4–5 describes self-service export and
   six file formats. Confirm that matches what the platform actually does.
7. **Attorney review** — LEG-001 and LEG-002 especially. Every page is
   badged "Working draft · v1.0.0" until that happens.
