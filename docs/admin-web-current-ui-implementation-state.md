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

- Form Validation Foundation v1:
  - Accepted as a foundation task, not as a login form migration.
  - Installed the approved runtime form stack: `react-hook-form`, `zod`, and `@hookform/resolvers`.
  - Added reusable login schema and schema tests:
    - `lib/forms/login-form-schema.ts`
    - `tests/forms/login-form-schema.test.ts`
  - Exports `loginFormSchema`, `LoginFormValues`, and `loginFormDefaultValues`.

- Login Form RHF Zod Migration v1:
  - Accepted with notes as a scoped `/login` form migration.
  - Migrated `/login` to the project-approved form stack:
    - `react-hook-form`
    - `zod`
    - `@hookform/resolvers/zod`
  - Uses `useForm<LoginFormValues>`, `zodResolver(loginFormSchema)`, and `loginFormDefaultValues`.
  - Touched only:
    - `app/login/page.tsx`
    - `tests/admin-auth/login-page.test.tsx`
  - Preserved the accepted Login Page UI visual layout, existing auth submit behavior, CSRF retention path, success redirect to `/dashboard`, and route guard behavior.
  - Added field-level email/password validation and updated login page tests.
  - No real backend smoke was run, and auth final acceptance remains pending.

## 4. Current Implemented Files and Responsibilities

- `app/globals.css`: Admin Web light-only semantic tokens only. It must not contain app-level dark mode, theme toggle, `next-themes`, or `prefers-color-scheme` theme switching.
- `app/login/page.tsx`: Login Page UI v1 visual layout plus Login Form RHF Zod Migration v1 behavior. It owns the light-only admin login layout, local temporary AI skin-scan visual, React Hook Form + Zod email/password validation, existing auth submit path, safe form-level auth error display, success redirect to `/dashboard`, and CSRF retention call. It is not final auth acceptance because backend smoke remains pending.
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
- Login Auth Flow backend smoke.
- Auth final acceptance.
- Real Admin Backend credential, cookie, and session behavior verification.
- Permission-aware redirect after login.
- Safe backend field/form error mapping.
- Existing authenticated-session CSRF recovery when `/auth/me` does not return a `csrfToken`.
- Forgot-password behavior.
- Broader feature form migrations.
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
- At the time of Login Page UI v1, it kept the work scoped without auth, API, cookies, sessions, CSRF, or route behavior.
- Later scoped tasks added auth behavior and React Hook Form + Zod validation, but `/login` is still not a final authenticated feature page until backend smoke passes.
- There are no empty states.
- There is no forgot-password behavior.
- Real backend credentials, cookie, and session behavior have not been verified by the login form migration.
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

- Login Auth Flow backend smoke.
- Auth final acceptance.
- Real Admin Backend credential, cookie, and session behavior verification.
- Safe backend field/form error mapping.
- Existing authenticated-session CSRF recovery when `/auth/me` does not return a `csrfToken`.
- Login forgot-password flow.
- Topbar logout/profile UI.
- Final Logo B asset replacement.
- Permission-aware redirect after login.
- Permission-aware menu/profile behavior.
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

### Form validation and auth test status

- `docs/admin-web-form-validation-contract.md` exists as the project-wide form validation standard.
- Admin Web Form Validation Foundation v1 is accepted as a foundation task with notes.
- The approved runtime form stack has been installed:
  - `react-hook-form`
  - `zod`
  - `@hookform/resolvers`
- A reusable login form schema exists at `lib/forms/login-form-schema.ts`.
- Focused login schema tests exist at `tests/forms/login-form-schema.test.ts`.
- The foundation exports `loginFormSchema`, `LoginFormValues` inferred from `z.infer`, and `loginFormDefaultValues`.
- The login schema and tests cover valid payloads, email trimming, empty email, invalid email, empty password, and default values.
- Tests pass with the existing Vitest test harness.
- Admin Web Login Form RHF Zod Migration v1 is accepted with notes.
- `/login` has been migrated to React Hook Form + Zod using:
  - `useForm<LoginFormValues>`
  - `zodResolver(loginFormSchema)`
  - `loginFormDefaultValues`
- The migration touched:
  - `app/login/page.tsx`
  - `tests/admin-auth/login-page.test.tsx`
- Field-level validation now covers email required, valid email, and password required behavior through `loginFormSchema`.
- Validation error rendering includes accessibility wiring where practical.
- Login submit behavior, success redirect to `/dashboard`, CSRF retention path, route guard behavior, and accepted visual layout were preserved.
- Login page tests now cover RHF/Zod validation behavior, empty submit, invalid email, valid submit, safe error behavior, and no sensitive console logging.
- Existing auth tests and schema tests still pass.
- Current Login Auth Flow frontend tests exist and cover CSRF retention, auth API calls, provider state, login form behavior, and route guard behavior.
- Live backend login smoke is still pending.
- Existing authenticated sessions with an HttpOnly cookie but no stored `csrfToken` may still lack a CSRF token if `/auth/me` does not return one.
- Login Auth Flow is still `PASS_WITH_NOTES` and is not final auth acceptance.
- Safe backend field/form error mapping remains deferred.
- Broader feature forms are not migrated yet.
- This note does not mean Login Auth Flow is final.

### Documentation Impact Rule

- Future implementation, test, smoke, and UI tasks must include a `Documentation Impact Candidate` section in the final report.
- If there is no documentation impact, Codex must write exactly: `Documentation Impact Candidate: none`.
- Codex must not update `docs/admin-web-current-ui-implementation-state.md` inside implementation, test, smoke, or UI tasks unless explicitly scoped as docs sync.
- Docs sync and addendum tasks must use only gatekeeper-approved notes.
- Technical `PASS` is not user or gatekeeper acceptance.

### Next recommended task

- The next recommended task after Admin Web Login Form RHF Zod Migration v1 is Admin Web Login Auth Flow Backend Smoke v1.
- That task must verify against local or staging Admin Backend:
  - Login sets an HttpOnly cookie.
  - Login returns a `csrfToken` in the response body and/or header.
  - `/auth/me` bootstrap works through the cookie.
  - `/dashboard` route guard works.
  - Login success redirect works.
  - Logout/session cleanup if scoped.
- That task must not use secrets in reports.

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
5. Login Page UI v1 - accepted for visual UI only; Login Form RHF Zod Migration v1 is accepted with notes for scoped form behavior.
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

The next recommended task after Admin Web Login Form RHF Zod Migration v1 is:

```text
Admin Web Login Auth Flow Backend Smoke v1
```

That task must preserve:

- Accepted Login Page UI visual design.
- Auth submit behavior.
- CSRF retention.
- Route guard behavior.
- Existing frontend auth tests.

That task must verify local or staging Admin Backend login, HttpOnly cookie behavior, CSRF response/body header behavior, `/auth/me` bootstrap, `/dashboard` guard behavior, and login success redirect without exposing secrets in reports.

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
