# Admin Web Current UI Implementation State v1

This document is the current source of truth for Admin Web UI implementation status and handoff. It complements the contract and guardrail documents, and future UI tasks must read it before implementation.

## 1. Purpose

Use this document to prevent future Codex or ChatGPT sessions from drifting away from the accepted Admin Web UI direction, reusing rejected references, or redoing already accepted work.

This file records:

- What UI work is accepted.
- What visual contracts are active.
- What has been explicitly rejected.
- What remains deferred.
- What reference pack must be used.
- What task should come next.

If this document conflicts with actual code, inspect the code and report the conflict before editing.

## 2. Current Accepted Visual Foundation

- Admin Web MVP is light-only.
- No dark mode.
- No theme toggle.
- No `next-themes`.
- No app-level `prefers-color-scheme` theme switching.
- Admin Web owns its visual system and does not inherit the Public Web theme.
- Public Web rose, pearl, or champagne colors must not be used as the Admin Web base.
- The accepted direction is a light neutral workspace, dark navy sidebar, and blue/cyan AI skin-analysis accent.
- `docs/admin-web-theme-token-contract.md` is the source of truth for theme tokens.
- `docs/admin-web-brand-visual-direction.md` is the source of truth for brand and visual direction.
- Visual Spec Pack v2 Clarity is the current reference source:
  `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/visual-spec-v2/`
- Visual Spec Pack v1 shell images are rejected and must not be used.

## 3. Accepted UI Checkpoints

Accepted foundation and docs checkpoints:

- Admin Web UX/UI + Architecture Contract v1.
- Admin Web Screenshot Artifact Rule Addendum v1.
- Admin Web Scaffold v1.
- Admin Web Visual Baseline Review / separator canonical fix.
- Admin Web Tailwind Canonical Classes Cleanup.
- Admin Web Brand & Visual Direction Addendum v1.
- Admin Web Rejected Shell Cleanup v1.
- Admin Web Light-Only Theme Token Contract v1.
- Admin Web Light Theme Token Cleanup v1.

Accepted component UI checkpoints:

- Sidebar Only v1:
  - Dark navy sidebar.
  - Grouped nav labels.
  - Blue/cyan active state.
  - Temporary front-facing AI skin-scan brand mark.
  - Footer/profile rhythm.

- Topbar Only v1:
  - Light Admin topbar.
  - Hamburger/menu affordance.
  - Search field and shortcut pill.
  - Notification/help/profile placeholders.
  - No real behavior or API integration.

- Main Surface + Page Header Only v1:
  - Light neutral main workspace.
  - Main content max-width/container rhythm.
  - Page header hierarchy.
  - Generic placeholder surface/card rhythm.
  - No dashboard card implementation yet.

## 4. Current Implemented Files and Responsibilities

- `app/globals.css`: Admin Web light-only semantic tokens only. It must not contain app-level dark mode, theme toggle, `next-themes`, or `prefers-color-scheme` theme switching.
- `components/layout/sidebar.tsx`: Desktop sidebar panel, brand area, nav grouping, icon mapping, and footer/profile area.
- `components/layout/nav-item.tsx`: Sidebar nav item state, active styling, hover styling, and active cyan rail.
- `components/layout/brand-mark.tsx`: Temporary vector Logo B-inspired front-facing AI skin-scan brand mark. It is not the final semi-realistic brand asset.
- `components/layout/topbar.tsx`: Light topbar, menu affordance, search placeholder, shortcut pill, and notification/help/profile placeholders.
- `components/layout/admin-shell.tsx`: Shared shell wrapper, light main workspace background, and main content container rhythm.
- `components/layout/page-header.tsx`: Admin content studio eyebrow, page title, subtitle, and optional permission badge placement.
- `components/layout/placeholder-page.tsx`: Generic placeholder surface for scaffold pages, including scaffold-state section and deferred-content tiles.
- `components/dashboard/dashboard-placeholder.tsx`: Still a placeholder. Dashboard Card Rhythm Only v1 remains pending.
- `lib/permissions/menu.ts`: Current scaffold menu metadata and route-to-permission mapping.
- `types/admin.ts`: Permission, role, user, session, menu icon, and menu item types.

## 5. Explicitly Deferred / Not Implemented

- Dashboard Card Rhythm Only v1.
- Login Page UI v1.
- Login auth flow.
- Real API integration.
- Blog/Tips list UI.
- Blog/Tips editor shell.
- Block editor.
- Media Library UI.
- Taxonomy/Authorship UI.
- Revalidation Events UI.
- Final semi-realistic Logo B asset.
- Mobile drawer/search behavior.
- Dark mode.
- Theme toggle.

## 6. Rejected / Do Not Use

- Do not use Visual Spec Pack v1 shell images.
- Do not use old generated shell references.
- Do not treat previous rejected shell outputs as accepted.
- Do not use Public Web theme or colors as the Admin Web base.
- Do not use rose, pearl, or champagne as the Admin Web system palette.
- Do not implement broad shell/page redesigns.
- Do not implement multiple page archetypes in one task.
- Do not copy reference images into the repository.
- Do not include reference images in changed-files zips.

## 7. Visual Spec Pack v2 Rules

Use only:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/visual-spec-v2/
```

For every UI implementation task:

- Use the full source image, the relevant crop, the upscaled crop, and the notes.
- Do not use a small crop alone.
- Use only the specific folder, crop, and notes for the current scoped task.
- Do not use Visual Spec Pack v1.
- Do not copy reference images into the repository.
- Do not include reference images in changed-files zips.
- Generate screenshots outside the repository.
- Compare screenshots against the selected Visual Spec Pack v2 references.
- If the Visual Spec Pack v2 path is missing, stop and ask the user to provide it.

## 8. Component-by-Component Workflow

Required sequence:

1. Sidebar Only v1 - accepted.
2. Topbar Only v1 - accepted.
3. Main Surface + Page Header Only v1 - accepted.
4. Dashboard Card Rhythm Only v1 - next recommended task.
5. Login Page UI v1.
6. List Page Pattern v1.
7. Media Library UI v1.
8. Editor Shell v1.

Rules:

- Do one component or page archetype at a time.
- Use allowlist files only.
- If a task needs files outside scope, stop and report before editing.
- Do not combine dashboard card rhythm, login, list pages, media library, editor shell, and mobile shell into one task.

## 9. Screenshot / Visual QA Rules

- Screenshots must be written outside the repository.
- No dark mode screenshots are required because Admin Web MVP is light-only.
- Every UI implementation task must include screenshot evidence unless the task is docs-only or screenshots are impossible for a clearly reported reason.
- Compare screenshots against the selected Visual Spec Pack v2 full source image, crop, upscaled crop, and notes.
- Final UI reports must include a visual match checklist.
- If any visual match checklist item is `NEEDS_FIX`, the overall result cannot be `PASS`.
- Do not include screenshots or browser artifacts in changed-files zips.

## 10. Next Recommended Task

Next task:

```text
Admin Web Dashboard Card Rhythm Only v1
```

It should use dashboard-specific Visual Spec Pack v2 crops:

- `01-crops/dashboard-kpi-cards-reference.png`
- `01-crops/content-card-rhythm-reference.png`
- `01-crops/recent-posts-table-reference.png`
- `01-crops/quick-actions-reference.png`
- `01-crops/revalidation-status-reference.png`
- `01-crops/latest-revalidation-events-reference.png`

It should also use the matching files under `01-crops-upscaled-3x/` and the relevant dashboard/card notes.

Expected scope:

- Modify only dashboard-specific component files.
- Do not modify sidebar.
- Do not modify topbar.
- Do not modify login.
- Do not modify API/auth behavior.
- Do not modify theme tokens.
- Do not implement real backend data.

## 11. Handoff Notes for Future ChatGPT/Codex Sessions

For future Admin Web UI tasks:

1. Read `AGENTS.md` first.
2. Read this current-state document second.
3. Read the relevant contracts:
   - `docs/admin-web-theme-token-contract.md`
   - `docs/admin-web-brand-visual-direction.md`
   - `docs/admin-web-ux-ui-contract.md`
   - `docs/admin-web-architecture.md`
   - `docs/admin-web-route-map.md`
   - `docs/admin-web-visual-qa-contract.md`
4. Read the Visual Spec Pack v2 root instructions.
5. Read only the scoped task notes and crops for the current task.
6. Inspect current code before editing.
7. Do not assume missing context.
8. Do not continue from rejected outputs.
9. If prior summaries conflict with actual code, trust actual code and report the mismatch before editing.
