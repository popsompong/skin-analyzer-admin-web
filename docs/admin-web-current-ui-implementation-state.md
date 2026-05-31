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
  - No feature-specific dashboard data implementation.

- Dashboard Card Rhythm Only v1:
  - Dashboard visual rhythm and static placeholder cards.
  - KPI card row, recent-posts/list rhythm, content-by-type rhythm, quick actions rhythm, and revalidation/status rhythm.
  - CSS-only donut placeholders.
  - No real analytics, navigation, API behavior, backend integration, or final feature page state.

- Login Page UI v1:
  - Visual UI only for `app/login/page.tsx`.
  - Replaced the scaffold placeholder with a light-only private admin sign-in panel.
  - Added an AI skin-scan brand visual and login form control rhythm.
  - No authentication, API call, cookies, sessions, CSRF handling, or route behavior.

## 4. Current Implemented Files and Responsibilities

- `app/globals.css`: Admin Web light-only semantic tokens only. It must not contain app-level dark mode, theme toggle, `next-themes`, or `prefers-color-scheme` theme switching.
- `app/login/page.tsx`: Login Page UI v1 visual-only sign-in page. It owns the light-only admin login layout, local temporary AI skin-scan visual, and inert form controls, but it does not own authentication behavior.
- `components/layout/sidebar.tsx`: Desktop sidebar panel, brand area, nav grouping, icon mapping, and footer/profile area.
- `components/layout/nav-item.tsx`: Sidebar nav item state, active styling, hover styling, and active cyan rail.
- `components/layout/brand-mark.tsx`: Temporary vector Logo B-inspired front-facing AI skin-scan brand mark. It is not the final semi-realistic brand asset.
- `components/layout/topbar.tsx`: Light topbar, menu affordance, search placeholder, shortcut pill, and notification/help/profile placeholders.
- `components/layout/admin-shell.tsx`: Shared shell wrapper, light main workspace background, and main content container rhythm.
- `components/layout/page-header.tsx`: Admin content studio eyebrow, page title, subtitle, and optional permission badge placement.
- `components/layout/placeholder-page.tsx`: Generic placeholder surface for scaffold pages, including scaffold-state section and deferred-content tiles.
- `components/dashboard/dashboard-placeholder.tsx`: Dashboard Card Rhythm Only v1 static visual rhythm. It uses placeholder/demo data, CSS-only visual charts, inert quick-action rows, and non-integrated revalidation placeholders.
- `lib/permissions/menu.ts`: Current scaffold menu metadata and route-to-permission mapping.
- `types/admin.ts`: Permission, role, user, session, menu icon, and menu item types.

## 5. Explicitly Deferred / Not Implemented

- Final dashboard feature page with real data, loading states, empty states, error states, permissions, API integration, and backend wiring.
- Admin Web Login Auth Flow v1.
- Real email/password submission.
- Backend login API call.
- HttpOnly cookie/session handling.
- CSRF integration.
- `/auth/me` bootstrap.
- Route guard and redirect behavior.
- Permission-aware redirect after login.
- Login validation state, loading state, error state, and forgot-password flow.
- Real API integration.
- Blog/Tips list UI.
- Blog/Tips editor shell.
- Block editor.
- Media Library UI.
- Taxonomy/Authorship UI.
- Revalidation Events UI.
- Final semi-realistic Logo B asset.
- Mobile drawer/search behavior.
- Permission-aware real menu/profile behavior.
- Loading, empty, and error states for feature pages.
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

## 7. Deferred Visual Notes / Not Final Yet

### Technical PASS is not visual acceptance

- Codex technical `PASS` does not automatically mean user visual acceptance.
- Only user or ChatGPT gatekeeper review can decide whether UI output becomes accepted current state.
- Future UI implementation tasks must not treat their own screenshots as final acceptance unless the result is explicitly accepted afterward.

### Rejected references and outputs

- Visual Spec Pack v1 shell images are rejected.
- Do not use old Visual Spec Pack v1 generated shell images as the source of truth.
- Previous Modern Shell Direction, Modern Shell Correction, and Shell Spec Implementation attempts were visually rejected or cleaned up and must not be used as the baseline.
- Use Visual Spec Pack v2 Clarity only.

### Scoped accepted work is not whole-product final

- Sidebar Only v1 is accepted only for sidebar, navigation, and temporary brand mark scope.
- Topbar Only v1 is accepted only for topbar, search, and action placeholders.
- Main Surface + Page Header Only v1 is accepted only for main workspace, page header, and generic placeholder surface rhythm.
- Dashboard Card Rhythm Only v1 is accepted only for dashboard visual rhythm and static placeholder cards.
- Login Page UI v1 is accepted only for `app/login/page.tsx` visual layout and controls, not for auth behavior.
- These scoped acceptances do not make the entire Admin Web UI final.

### Dashboard Card Rhythm Only v1 caveats

- Dashboard Card Rhythm Only v1 is accepted for visual rhythm only.
- All dashboard data remains static placeholder/demo data.
- Donut charts are CSS-only placeholders, not real analytics or chart implementation.
- Quick Actions are inert visual rows, not real navigation or API behavior.
- Revalidation status and events are visual placeholders, not backend-integrated.
- Mobile dashboard stack is acceptable for v1 readability but is not final mobile dashboard UX.
- Dashboard is not a final feature page until real data, loading states, empty states, error states, permissions, API integration, and backend wiring are implemented.

### Login Page UI v1 caveats

- Login Page UI v1 is accepted as visual UI only.
- The accepted scope is `app/login/page.tsx` visual layout and controls.
- It replaced the scaffold placeholder with a light-only admin sign-in panel.
- It added an AI skin-scan brand visual and form control rhythm.
- It kept the work scoped without auth, API, cookies, sessions, CSRF, or route behavior.
- `/login` is not a final authenticated feature page.
- There is no real authentication.
- There is no form validation.
- There are no loading states.
- There are no error states.
- There are no empty states.
- There is no forgot-password behavior.
- There are no cookies, sessions, or CSRF handling.
- There is no Admin Backend call.
- There is no route redirect behavior.
- Login auth flow remains deferred.
- Login UI visual output was accepted with notes.
- Technical PASS is not final feature acceptance.
- Future auth-flow work must not assume Login Page UI v1 completed real authentication.
- Future visual changes to `/login` should use Visual Spec Pack v2 Clarity login references.

### Temporary BrandMark caveat

- Current `BrandMark` is a temporary vector approximation.
- It is not the final semi-realistic Logo B asset.
- Final Logo B/front-facing AI skin scan asset remains deferred as a separate task.
- The login page uses a local SVG / temporary AI skin-scan visual.
- This login visual is not the final Logo B asset.
- Final Logo B/front-facing AI skin-scan asset remains a separate deferred Brand Mark Asset task.

### Mobile UX caveats

- Mobile screenshots so far are regression checks unless the task explicitly implements mobile UX.
- Existing mobile content/topbar clipping or non-final mobile navigation must not be forgotten.
- Mobile drawer/search behavior remains deferred.
- Mobile dashboard card stack can be improved in future mobile or dashboard tasks.

### Deferred UI / product areas

- Admin Web Login Auth Flow v1.
- Real email/password submission.
- Backend login API call.
- HttpOnly cookie/session handling.
- CSRF integration.
- `/auth/me` bootstrap.
- Route guard / redirect behavior.
- Login loading state.
- Login validation state.
- Login error state.
- Login forgot-password flow.
- Final Logo B asset replacement.
- Permission-aware redirect after login.
- Real API integration.
- Blog/Tips list UI.
- Blog/Tips editor shell.
- Block editor.
- Media Library UI.
- Taxonomy/Authorship UI.
- Revalidation Events UI.
- Final Logo B asset.
- Mobile drawer/search behavior.
- Permission-aware real menu/profile behavior.
- Loading, empty, and error states for feature pages.

### Future documentation workflow

- UI implementation tasks should not directly update current-state docs by default.
- UI implementation tasks should include a `Documentation Impact Candidate` section in the final report.
- The `Documentation Impact Candidate` should propose accepted scope, known limitations, temporary assets, deferred follow-up work, rejected/not-final areas, and whether a docs sync task is recommended.
- A separate docs sync or addendum task should update current-state docs only after user or ChatGPT gatekeeper review confirms the notes.
- Syntax-only cleanup tasks do not need docs sync unless they change accepted visual state or add caveats.

### Next recommended task

- After Login Page UI v1, the next task should be chosen by the user.
- If auth is prioritized, the next task should be Admin Web Login Auth Flow v1.
- If visual pages are prioritized, the next task should be List Page Pattern v1, Media Library UI v1, or another scoped page archetype.
- Any auth task must use existing Admin Backend auth, CSRF, and session contracts and must not rewrite the visual design unless explicitly scoped.
- If mobile issues are prioritized, create a separate Mobile Shell / Mobile Navigation task.

## 8. Visual Spec Pack v2 Rules

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

## 9. Component-by-Component Workflow

Required sequence:

1. Sidebar Only v1 - accepted.
2. Topbar Only v1 - accepted.
3. Main Surface + Page Header Only v1 - accepted.
4. Dashboard Card Rhythm Only v1 - accepted with caveats.
5. Login Page UI v1 - accepted for visual UI only, not auth behavior.
6. List Page Pattern v1.
7. Media Library UI v1.
8. Editor Shell v1.

Rules:

- Do one component or page archetype at a time.
- Use allowlist files only.
- If a task needs files outside scope, stop and report before editing.
- Do not combine dashboard card rhythm, login, list pages, media library, editor shell, and mobile shell into one task.

## 10. Screenshot / Visual QA Rules

- Screenshots must be written outside the repository.
- No dark mode screenshots are required because Admin Web MVP is light-only.
- Every UI implementation task must include screenshot evidence unless the task is docs-only or screenshots are impossible for a clearly reported reason.
- Compare screenshots against the selected Visual Spec Pack v2 full source image, crop, upscaled crop, and notes.
- Final UI reports must include a visual match checklist.
- If any visual match checklist item is `NEEDS_FIX`, the overall result cannot be `PASS`.
- Do not include screenshots or browser artifacts in changed-files zips.

## 11. Next Recommended Task

The next task after Login Page UI v1 should be chosen by the user.

If auth is prioritized:

```text
Admin Web Login Auth Flow v1
```

- Use the existing Admin Backend auth, CSRF, session, and `/auth/me` contracts.
- Do not rewrite the Login Page UI visual design unless explicitly scoped.

If visual pages are prioritized:

- List Page Pattern v1.
- Media Library UI v1.
- Another scoped page archetype chosen by the user.

If mobile issues are prioritized, create a separate Mobile Shell / Mobile Navigation task.

## 12. Handoff Notes for Future ChatGPT/Codex Sessions

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
