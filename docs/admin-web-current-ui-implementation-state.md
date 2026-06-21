# Admin Web Current UI Implementation State v3

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

## 2. Active Direction Update: Flux Sky

The active Admin Web visual direction is:

```text
Flux Sky: light / neutral Flux-like sidebar + shadcn/Tailwind sky action/event states.
```

This direction has moved beyond planning for the shell/dashboard scope. The current production shell/dashboard implementation has reached an implemented checkpoint and passed `Admin Web Flux Sky Visual QA Rerun v4` with notes.

This direction supersedes earlier future-direction language that implied the redesign target should keep:

- Dark navy sidebar.
- Old Admin Web dark sidebar.
- Current production sidebar visual style.
- Blue action palette from earlier attempts.
- Generic shadcn/admin scaffold styling.

Those older references are historical implemented context only. Do not use them as the visual target for future Flux Sky work unless a later accepted direction explicitly changes this.

Flux usage boundary:

- Flux is used only as a public visual and interaction reference.
- The user is not buying the Flux license.
- Do not copy Flux code, assets, logos, exact class names, proprietary icons, template files, user identity, or sample data.
- The final Admin Web must remain Skin Analyzer-specific.

Golden Mockup boundary:

- Admin Web Flux Sky Golden Mockup v1 is an accepted isolated visual direction checkpoint.
- It is not production implementation.
- It is not whole Admin Web final visual acceptance.
- It must not be copied wholesale into production.
- It remains a historical visual reference for the Flux Sky direction only.

Current Flux Sky shell/dashboard checkpoint status:

- Whole Admin Web visual acceptance is still not final.
- Flux Sky shell/dashboard implementation has reached a QA-passed checkpoint with notes.
- `Admin Web Flux Sky Visual QA Rerun v4` is the latest integrated visual evidence checkpoint.
- The checkpoint covers the production shell/sidebar/topbar/dashboard surface only.
- Feature pages are not final.
- Dashboard data remains static preview data and does not perform real dashboard API reads.
- User or ChatGPT Final Gatekeeper acceptance is still required for future visual tasks; technical `PASS` or `PASS_WITH_NOTES` is evidence, not whole-product acceptance.

## 3. Current Implemented / Historical Visual Foundation

- Admin Web MVP is light-only.
- No dark mode.
- No theme toggle.
- No `next-themes`.
- No app-level `prefers-color-scheme` theme switching.
- Admin Web owns its visual system and does not inherit the Public Web theme.
- Public Web rose, pearl, or champagne colors must not be used as the Admin Web base.
- The current production shell/dashboard uses the Flux Sky light neutral sidebar, light drawer/rail, and shadcn/Tailwind sky action-state token direction.
- The previous dark navy sidebar and blue/cyan action language is historical / superseded context only.
- `docs/admin-web-theme-token-contract.md` is the source of truth for theme tokens.
- `docs/admin-web-brand-visual-direction.md` is the source of truth for brand and visual direction.
- Visual Spec Pack v2 Clarity remains historical reference for the previous accepted foundation:
  `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/visual-spec-v2/`
- Visual Spec Pack v1 shell images are rejected and must not be used.

## 4. Accepted UI Checkpoints

Accepted Flux Sky planning checkpoints:

- Admin Web Flux Sky Visual + Interaction Contract v1:
  - Accepted as planning/input artifact.
  - Establishes the light / neutral Flux-like sidebar direction.
  - Establishes shadcn/Tailwind sky for action and event states.
  - Establishes no-copy boundary for Flux.
- Admin Web Flux Sky Golden Mockup v1:
  - Accepted as an isolated visual direction checkpoint only.
  - Not production implementation.
  - Not whole Admin Web final visual acceptance.
  - Not to be copied wholesale into production.
- Admin Web shadcn/ui Component Inventory + Skill/MCP Feasibility v1:
  - Accepted as planning input.
  - Confirms local shadcn-style setup and existing Button, Badge, and Separator primitives.
- Admin Web shadcn/ui Governance Rules v1:
  - Accepted as planning input.
  - Defines shadcn/ui as governed primitive foundation where suitable.
  - Keeps product-specific UI outside `components/ui`.
- Admin Web Flux Sky shadcn-backed Productionization Plan v1:
  - Accepted as planning input with notes.
  - Defines the future sprint sequence: token contract, shadcn component add decision, sidebar, collapsed rail, mobile drawer, topbar/dropdown/command, dashboard, visual QA, and docs sync after acceptance.
- Admin Web Flux Sky Token Theme Contract v2:
  - Defined as a planning/source-of-truth contract for Flux Sky token roles.
  - Defines light / neutral sidebar roles and shadcn/Tailwind sky action-state roles.

Accepted Flux Sky implementation checkpoints:

Evidence note: during Docs Sync Addendum v1, separate older task-family artifact folders were not present under `/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/`. The combined shell/dashboard checkpoint below is backed by live repo state and the available `Admin Web Flux Sky Visual QA Rerun v4` artifact, which itself documents the missing prior artifact folders as a `PASS_WITH_NOTES` limitation.

- Admin Web Flux Sky Token Implementation v1:
  - Implemented light Flux Sky sidebar, drawer, topbar, action, selected, dropdown, notification, typography, and motion tokens in `app/globals.css`.
- Admin Web Flux Sky Token Consumption Gap Fix v1:
  - Aligned production shell/dashboard token consumption with Admin Web semantic token roles.
- Admin Web shadcn Component Add Implementation v1:
  - Added/reused scoped generic primitives needed for the shell work.
  - Product-specific layout remained outside `components/ui`.
- Admin Web Flux Sky Sidebar Production v1:
  - Implemented the light neutral production sidebar target.
- Admin Web Flux Sky Collapsed Rail v1:
  - Implemented the 72px collapsed rail, active state, accessible labels, and tooltip behavior.
- Admin Web Flux Sky Mobile Drawer v1:
  - Implemented the light neutral mobile drawer and drawer navigation shell.
- Admin Web Flux Sky Topbar Dropdown Command v1:
  - Implemented command/search, notification dropdown, and profile dropdown UI surfaces using static safe content.
  - Profile/logout actions remain non-integrated placeholders unless a later auth UI task proves otherwise.
- Admin Web Flux Sky Dashboard Layout v2:
  - Implemented Skin Analyzer-specific static dashboard preview content and responsive layout.
  - Real API-backed dashboard data remains deferred.
- Admin Web Flux Sky Typography Rhythm Polish v1 and Responsive Typography Token Fix v1:
  - Applied tokenized typography roles and responsive typography behavior.
- Admin Web Flux Sky Motion Interaction Polish v1:
  - Applied bounded tokenized motion for shell, dropdowns, command, drawer, dashboard hover, and reduced-motion code paths.
- Admin Web Flux Sky Visual QA Polish v2 and Sidebar Topbar Proportion Polish v1:
  - Applied visual/proportion polish for sidebar labels, menu rows, brand/footer rhythm, topbar height, search trigger, and compact controls.
- Admin Web Flux Sky Visual QA Rerun v4:
  - Latest integrated checkpoint: `PASS_WITH_NOTES`.
  - Passed expanded sidebar, collapsed rail, mobile drawer, command/search, dropdowns, dashboard layout, responsive typography, overflow, accessibility, and regression checks with documented notes.
- Admin Web Repo Skill Install v1:
  - Installed the repo-scoped Tailwind/shadcn governor skill for future Admin Web UI work.

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
  - Historical implemented state: dark navy sidebar.
  - Superseded by the Flux Sky shell/sidebar checkpoint.
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
  - Real backend smoke was still pending at the time of this migration.

- Login Auth Flow Backend Smoke v1:
  - Accepted with notes as an Admin Web auth smoke against the real local Admin Backend runtime.
  - Used `NEXT_PUBLIC_ADMIN_API_BASE_URL=http://127.0.0.1:8081`.
  - Used Admin Web origin `http://127.0.0.1:3000` for the accepted browser smoke because backend local CORS allowed port 3000.
  - Verified backend readiness with `GET /healthz => 200` and `GET /readyz => 200`.
  - Verified `/login` live submit, `POST /v1/admin/auth/login => 200`, HttpOnly cookie session, CSRF capture, redirect to `/dashboard`, `/auth/me` bootstrap, stable session-bound CSRF behavior, route guard behavior, reload/session restore, and endpoint/helper logout cleanup.
  - No repository files changed in the smoke task.
  - This smoke does not complete topbar logout UI, protected feature mutation testing, broader feature API CSRF wiring, permission-aware menu/profile behavior, or production security hardening.

- Local Env Bootstrap v1:
  - Accepted with notes as a local DX/config bootstrap task.
  - Added safe local backend URL examples for `NEXT_PUBLIC_ADMIN_API_BASE_URL=http://127.0.0.1:8081`.
  - Added `scripts/dev/ensure-local-env.mjs` to create or verify local `.env.local` for development.
  - Updated the dev command so Admin Web starts on `http://127.0.0.1:3000`, matching the local backend CORS allowlist used by backend smoke.
  - Did not change auth behavior, UI behavior, app/component/lib source, package dependencies, or `package-lock.json`.

- Security Headers + XSS Hardening v1:
  - Accepted with notes as baseline frontend/browser security hardening.
  - Security Headers Env-Driven CSP Connect Src Fix v1 is accepted as the follow-up fix for CSP `connect-src`.
  - Added baseline security headers, no-store headers for auth/admin-sensitive routes, report-only CSP, static frontend security checks, and security header tests.
  - CSP `connect-src` now derives from `NEXT_PUBLIC_ADMIN_API_BASE_URL` instead of permanently hardcoding local backend origins.
  - Did not change UI behavior, auth behavior, app/component/lib source behavior, Admin Backend files, or current-state docs during the implementation/fix tasks.

## 5. Current Implemented Files and Responsibilities

- `app/globals.css`: Admin Web light-only semantic tokens, Flux Sky shell/dashboard tokens, responsive typography roles, and motion tokens/classes. It must not contain app-level dark mode, theme toggle, `next-themes`, or `prefers-color-scheme` theme switching.
- `app/login/page.tsx`: Login Page UI v1 visual layout plus Login Form RHF Zod Migration v1 behavior. It owns the light-only admin login layout, local temporary AI skin-scan visual, React Hook Form + Zod email/password validation, existing auth submit path, safe form-level auth error display, success redirect to `/dashboard`, and CSRF retention call. Its real local backend login/auth smoke passed with notes; frontend baseline security headers/XSS checks are now in place; enforced CSP, HSTS/HTTPS production policy, and deferred auth UI/product work remain pending.
- `components/layout/sidebar.tsx`: Current production Flux Sky desktop sidebar, collapsed rail, mobile drawer, brand area, nav grouping/collapse behavior, icon mapping, and footer/profile area.
- `components/layout/nav-item.tsx`: Current Flux Sky nav item active, hover, badge, focus, tooltip, and collapsed-rail behavior.
- `components/layout/brand-mark.tsx`: Temporary vector Logo B-inspired front-facing AI skin-scan brand mark. It is not the final semi-realistic brand asset.
- `components/layout/topbar.tsx`: Light Flux Sky topbar, mobile drawer trigger, command/search panel, notification dropdown, and profile dropdown UI. Profile/logout actions remain deferred placeholder actions, not proven real auth integration.
- `components/layout/admin-shell.tsx`: Shared shell wrapper, light main workspace background, and main content container rhythm.
- `components/layout/page-header.tsx`: Admin content studio eyebrow, page title, subtitle, and optional permission badge placement.
- `components/layout/placeholder-page.tsx`: Generic placeholder surface for scaffold pages, including scaffold-state section and deferred-content tiles.
- `components/dashboard/dashboard-placeholder.tsx`: Flux Sky Dashboard Layout v2 static preview dashboard. It uses Skin Analyzer-specific static preview data, inert quick-action rows, and non-integrated revalidation/status placeholders. It performs no dashboard API reads.
- `lib/permissions/menu.ts`: Current scaffold menu metadata and route-to-permission mapping.
- `types/admin.ts`: Permission, role, user, session, menu icon, and menu item types.

## 6. Explicitly Deferred / Not Implemented

- Final dashboard feature page with real data, loading states, empty states, error states, permissions, API integration, and backend wiring.
- Remaining production auth/security hardening not covered by accepted backend/frontend baseline work.
- Permission-aware redirect after login.
- Safe backend field/form error mapping.
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
- Feature-page mobile UX beyond the shell/dashboard checkpoint.
- Permission-aware real menu/profile behavior.
- Loading, empty, and error states for feature pages.
- Dark mode.
- Theme toggle.

## 7. Rejected / Do Not Use

- Do not use Visual Spec Pack v1 shell images.
- Do not use old generated shell references.
- Do not treat previous rejected shell outputs as accepted.
- Do not use Public Web theme or colors as the Admin Web base.
- Do not use rose, pearl, or champagne as the Admin Web system palette.
- Do not revert Flux Sky work to the old dark/navy sidebar unless a later accepted direction explicitly changes it.
- Do not use the previous dark Admin Web sidebar as the visual target for Flux Sky work.
- Do not use Tailwind blue or UI Colors blue for new Flux Sky action states.
- Use shadcn/Tailwind sky for Flux Sky action and event states.
- Do not implement broad shell/page redesigns.
- Do not implement multiple page archetypes in one task.
- Do not copy reference images into the repository.
- Do not include reference images in changed-files zips.

## 8. Deferred Visual Notes / Not Final Yet

### Technical PASS is not visual acceptance

- Codex technical `PASS` does not automatically mean user visual acceptance.
- Only user or ChatGPT Final Gatekeeper review can decide whether UI output becomes accepted current state.
- Future UI implementation tasks must not treat their own screenshots as final acceptance unless the result is explicitly accepted afterward.
- Screenshot/visual evidence is required for visual implementation tasks after the scaffold exists.

### Rejected references and outputs

- Visual Spec Pack v1 shell images are rejected.
- Do not use old Visual Spec Pack v1 generated shell images as the source of truth.
- Previous Modern Shell Direction, Modern Shell Correction, and Shell Spec Implementation attempts were visually rejected or cleaned up and must not be used as the baseline.
- Use Visual Spec Pack v2 Clarity only.

### Scoped accepted work is not whole-product final

- Sidebar Only v1 is historical accepted context only for the earlier sidebar/navigation/temporary brand-mark scope.
- Topbar Only v1 is historical accepted context only for the earlier topbar/search/action placeholder scope.
- Main Surface + Page Header Only v1 is accepted only for main workspace, page header, and generic placeholder surface rhythm.
- Dashboard Card Rhythm Only v1 is historical accepted context for earlier dashboard visual rhythm and static placeholder cards.
- Flux Sky shell/dashboard checkpoint is accepted as the current implemented shell/dashboard checkpoint with Visual QA Rerun v4 notes.
- Login Page UI v1 is accepted only for `app/login/page.tsx` visual layout and controls, not for auth behavior.
- These scoped acceptances do not make the entire Admin Web UI final.

### Flux Sky Dashboard Layout v2 caveats

- Flux Sky Dashboard Layout v2 is accepted as static preview dashboard UI only.
- All dashboard data remains static preview data.
- Quick Actions are inert visual rows, not real navigation or API behavior.
- Revalidation status and events are visual placeholders, not backend-integrated.
- Mobile dashboard stack passed Visual QA Rerun v4 for readability and overflow, but it is not final mobile dashboard UX.
- Dashboard is not a final feature page until real data, loading states, empty states, error states, permissions, API integration, and backend wiring are implemented.

### Login Page UI v1 caveats

- Login Page UI v1 is accepted as visual UI only.
- The accepted scope is `app/login/page.tsx` visual layout and controls.
- It replaced the scaffold placeholder with a light-only admin sign-in panel.
- It added an AI skin-scan brand visual and form control rhythm.
- At the time of Login Page UI v1, it kept the work scoped without auth, API, cookies, sessions, CSRF, or route behavior.
- Later scoped tasks added auth behavior, React Hook Form + Zod validation, and real local backend smoke with notes. `/login` is still not a production-final authenticated feature page until deferred auth UI/product work and production security hardening are completed.
- There are no empty states.
- There is no forgot-password behavior.
- Real backend credentials, cookie, and session behavior were verified later by Login Auth Flow Backend Smoke v1 using a dev-only account and without storing secrets in this repo.
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

- Mobile drawer and mobile command/search shell passed Visual QA Rerun v4 for the current dashboard shell checkpoint.
- Mobile screenshots are still evidence, not whole-product mobile acceptance.
- Feature-page mobile UX remains deferred.
- Mobile dashboard title/copy density can be tightened later if user or ChatGPT Final Gatekeeper wants more compact first-fold density.

### Deferred UI / product areas

- Remaining production auth/security hardening not covered by accepted backend/frontend baseline work.
- Safe backend field/form error mapping.
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
- Feature-page mobile UX beyond the shell/dashboard checkpoint.
- Permission-aware real menu/profile behavior.
- Loading, empty, and error states for feature pages.

### Flux Sky shell/dashboard checkpoint sequence

The shell/dashboard productionization sequence has progressed through the following implemented checkpoints:

1. Token Theme Contract v2.
2. Token Implementation v1.
3. Token Consumption Gap Fix v1.
4. shadcn Component Add Implementation v1.
5. Sidebar Production v1.
6. Collapsed Rail v1.
7. Mobile Drawer v1.
8. Topbar Dropdown Command v1.
9. Dashboard Layout v2.
10. Typography Rhythm Polish v1.
11. Responsive Typography Token Fix v1.
12. Motion Interaction Polish v1.
13. Visual QA Polish v2.
14. Sidebar Topbar Proportion Polish v1.
15. Visual QA Rerun v4.
16. Docs Sync Addendum v1.

Do not re-run this sequence unless a future task explicitly scopes a regression, polish, or redesign. Future feature-page work must preserve the Flux Sky shell/topbar/dashboard direction and remain scoped to the page/component being implemented.

### Future documentation workflow

- UI implementation tasks should not directly update current-state docs by default.
- UI implementation tasks should include a `Documentation Impact Candidate` section in `02-implementer-summary.md`.
- The `Documentation Impact Candidate` should propose accepted scope, known limitations, temporary assets, deferred follow-up work, rejected/not-final areas, and whether a docs sync task is recommended.
- A separate docs sync or addendum task should update current-state docs only after user or ChatGPT Final Gatekeeper review confirms the notes.
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
- Live backend login smoke has passed with notes in Admin Web Login Auth Flow Backend Smoke v1.
- Backend `/auth/me` now returns stable session-bound `csrfToken` for the tested local auth bootstrap path, so the previous backend rotation and multi-tab CSRF invalidation caveat is resolved for that path.
- Login Auth Flow backend smoke is `PASS_WITH_NOTES`; production security hardening and deferred auth UI/product work remain pending.
- Frontend baseline security headers and XSS static checks are now documented separately in Security Headers + XSS Hardening status.
- Safe backend field/form error mapping remains deferred.
- Broader feature forms are not migrated yet.

### Login auth backend smoke status

- Admin Web Login Auth Flow Backend Smoke v1 is accepted with notes.
- It verified Admin Web login/auth flow against the real local Admin Backend runtime at `http://127.0.0.1:8081`.
- Admin Web used `NEXT_PUBLIC_ADMIN_API_BASE_URL=http://127.0.0.1:8081`.
- Accepted browser smoke used Admin Web origin `http://127.0.0.1:3000`.
- Future backend-dependent Admin Web smoke should start the backend with `make dev-up` and verify backend readiness with `make dev-auth-smoke`.
- Backend persistent data root for local smoke is:
  `/Users/sompong/Dev/Project skin analyzer/Docker/skin-analyzer-admin-backend`
- Dev-only admin account email is `admin-smoke@example.local`.
- The dev password is stored outside the Admin Web repo in the backend persistent data root credentials file. Do not store the dev password in this repo.
- Verified auth flow:
  - `/login` live submit works against the backend.
  - `POST /v1/admin/auth/login` returns `200`.
  - Backend sets an HttpOnly session cookie.
  - `document.cookie` does not expose the HttpOnly session cookie.
  - Admin Web does not store a raw session token.
  - `csrfToken` is captured from login.
  - Successful login redirects to `/dashboard`.
  - `/auth/me` bootstrap works through the cookie.
  - Authenticated `/dashboard` renders.
  - Unauthenticated `/dashboard` redirects to `/login`.
  - Logout endpoint works through the smoke helper/API.
  - Post-logout `/auth/me` returns `401`.
  - Post-logout `/dashboard` redirects to `/login`.
- Stable CSRF bootstrap behavior:
  - Backend `/auth/me` returns stable session-bound `csrfToken`.
  - Backend `/auth/me` sets `X-CSRF-Token`.
  - For the same session, login `csrfToken` equals `/auth/me` `csrfToken` and repeated `/auth/me` `csrfToken`.
  - Repeated `/auth/me` does not rotate or invalidate the current token.
  - Admin Web keeps/updates `csrfToken` from login and `/auth/me`.
  - The previous backend rotation/multi-tab CSRF invalidation caveat is resolved for the tested auth bootstrap path.
- Session restore behavior:
  - Reloaded `/dashboard` with an authenticated browser session remained authenticated.
  - CSRF store remained present after reload.
  - Separate new-tab restore was not run in this smoke.
  - Explicit multi-tab UI/browser testing remains optional future coverage if desired, while the backend stable contract has been verified.
- Security/storage smoke assertions:
  - No raw session token was printed.
  - `localStorage` token-like key count was `0`.
  - Unsafe `sessionStorage` token-like key count was `0`; only the CSRF token store is used.
  - Password, cookie, and CSRF token values were not printed in the report.
  - `credentials: "include"` remains present in auth fetches.
- Remaining deferred/not-final items:
  - Topbar logout UI remains deferred.
  - Logout was tested through endpoint/helper, not topbar UI.
  - Safe protected feature mutation such as create/update blog/tip/media was not tested in this smoke.
  - Broader feature API CSRF wiring remains future work.
  - Permission-aware menu/profile behavior remains deferred.
  - Frontend baseline security headers, report-only CSP, and XSS static checks are now accepted with notes.
  - Remaining security hardening includes enforced CSP nonce/hash strategy, HSTS/HTTPS production policy, future rich text/media/editor sanitizer policy, protected feature mutation CSRF smoke, and production deployment hardening.
  - If Admin Web runs on a port other than 3000 in local smoke, backend `CORS_ALLOWED_ORIGINS` must include that origin.

### Local env bootstrap status

- Admin Web Local Env Bootstrap v1 is accepted with notes.
- It improved local development env/config bootstrap only.
- It did not change auth behavior, UI behavior, app/component/lib source, package dependencies, or `package-lock.json`.
- Local Admin Backend URL default/example:
  - `NEXT_PUBLIC_ADMIN_API_BASE_URL=http://127.0.0.1:8081`
- This is a public frontend config value and must not contain backend passwords, cookies, session tokens, CSRF tokens, database URLs, backend secrets, or production secrets.
- Env files and script behavior:
  - `.env.example` and `.env.local.example` include safe local backend URL examples.
  - `scripts/dev/ensure-local-env.mjs` creates `.env.local` from `.env.local.example` when missing.
  - The script ensures `.env.local` contains `NEXT_PUBLIC_ADMIN_API_BASE_URL` for local dev and is rerun-safe.
  - `.env.local` is generated local-only, ignored by git, and must not be committed.
- Local dev origin / backend CORS:
  - `npm run dev` starts Next on `http://127.0.0.1:3000`.
  - This matches the backend local CORS allowlist used by backend smoke.
  - Backend also allows `http://localhost:3000`.
  - If port 3000 is occupied, stop the other process or deliberately update backend `CORS_ALLOWED_ORIGINS` for another origin.
- Package manager note:
  - `npm` remains the canonical Admin Web package manager because `package-lock.json` exists.
  - `pnpm` may be installed on the machine, but no `pnpm` migration has been accepted.
  - Do not create `pnpm-lock.yaml` or switch package manager unless the user explicitly approves.
- Recommended local workflow:

  ```sh
  cd "/Users/sompong/Dev/Project skin analyzer/skin-analyzer-admin-backend"
  make dev-up
  make dev-auth-smoke

  cd "/Users/sompong/Dev/Project skin analyzer/skin-analyzer-ux-ui/skin-analyzer-admin-web"
  npm run dev
  ```

- Remaining limitations:
  - The bootstrap script does not require backend availability before starting Admin Web; run backend commands first for backend-connected flows.
  - Production env configuration remains a deployment/platform concern.
  - Remaining frontend production hardening is documented in Security Headers + XSS Hardening status.
  - Topbar logout UI and protected feature mutation testing remain deferred from prior auth smoke notes.

### Security Headers + XSS Hardening status

- Admin Web Security Headers + XSS Hardening v1 is accepted with notes.
- Admin Web Security Headers Env-Driven CSP Connect Src Fix v1 is accepted.
- The combined result adds baseline frontend/browser security hardening without changing UI or auth behavior.
- Baseline headers are configured in `next.config.ts`:
  - `X-Content-Type-Options=nosniff`
  - `Referrer-Policy=no-referrer`
  - `X-Frame-Options=DENY`
  - Restrictive `Permissions-Policy`
  - `Cross-Origin-Opener-Policy=same-origin`
  - `Cross-Origin-Resource-Policy=same-origin`
- No-store cache behavior is configured for auth/admin-sensitive routes including `/`, `/login`, `/dashboard`, `/blog`, `/tips`, `/media`, `/categories-tags`, `/authors`, `/revalidation-events`, and `/settings`.
- `Strict-Transport-Security` / HSTS is not enabled yet and remains deferred until production HTTPS/domain policy is scoped.
- CSP status:
  - `Content-Security-Policy-Report-Only` is configured.
  - CSP is not enforced yet.
  - CSP `connect-src` derives from `NEXT_PUBLIC_ADMIN_API_BASE_URL` rather than permanently hardcoding local backend origins.
  - `connect-src` uses URL origin only, strips path/query, deduplicates sources, and rejects invalid, non-http(s), or credential-bearing URLs.
  - Production missing or invalid `NEXT_PUBLIC_ADMIN_API_BASE_URL` fails config/CSP construction.
  - Local/dev/test fallback to `http://127.0.0.1:8081` is scoped to non-production.
  - Enforced CSP remains deferred until nonce/hash strategy and production domain/connect-src policy are scoped.
- XSS hardening status:
  - No unsafe HTML sink patterns were found in the current `app`, `components`, `lib`, `tests`, and `scripts` scan.
  - Current scan found no `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, untrusted `DOMParser`, `eval`, or `new Function`.
  - Static frontend security check exists at `scripts/security/check-frontend-security.mjs`.
  - NPM script exists as `npm run security:check`.
  - Security header tests exist at `tests/security/security-headers.test.ts`.
- Token/password storage and logging status:
  - No raw session/access/JWT storage was found.
  - No sensitive console logging was found.
  - CSRF token store remains the allowed exception because `X-CSRF-Token` is required for backend mutation requests.
  - Admin Web must not log or expose `csrfToken`, passwords, cookies, or raw session material.
- Validation status from the accepted implementation/fix tasks:
  - `npm run security:check` passed.
  - `npm run test`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm audit --omit=dev` passed.
  - Runtime header checks for `/login` and `/dashboard` passed and showed baseline headers plus `Content-Security-Policy-Report-Only`.
  - Runtime CSP showed `connect-src 'self' http://127.0.0.1:8081`, derived from `.env.local`.
- Remaining deferred/not-final items:
  - CSP remains report-only.
  - Enforced CSP nonce/hash strategy remains deferred.
  - HSTS/HTTPS production policy remains deferred.
  - Future rich text/media/editor sanitizer policy remains deferred and must be scoped before rendering HTML, Markdown, or user-controlled rich content.
  - Do not introduce `dangerouslySetInnerHTML` without a scoped sanitizer/review task.
  - Protected feature mutation CSRF smoke for Blog/Tips/Media remains deferred.
  - Topbar logout UI remains deferred.
  - No Admin Web current-state docs were updated in the implementation/fix tasks; this addendum records the notes after ChatGPT Final Gatekeeper review.

### Documentation Impact Rule

- Future implementation, test, smoke, and UI tasks must include a `Documentation Impact Candidate` section in `02-implementer-summary.md`.
- If there is no documentation impact, Codex must write exactly: `Documentation Impact Candidate: none`.
- Codex must not update `docs/admin-web-current-ui-implementation-state.md` inside implementation, test, smoke, or UI tasks unless explicitly scoped as docs sync.
- Docs sync and addendum tasks must use only user-approved or ChatGPT Final Gatekeeper-approved notes.
- Technical `PASS` is not user or ChatGPT Final Gatekeeper acceptance.

### Next recommended task

- The next recommended task is Admin Web Flux Sky Feature Page Planning v1.
- Reason: shell/dashboard has reached a QA-passed checkpoint with notes, while Blog/Tips/Media/List/Editor feature pages remain not final and should be planned before implementation.

## 9. Visual Spec Pack v2 Rules

Use only:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/visual-spec-v2/
```

For legacy or non-Flux UI implementation tasks:

- Use the full source image, the relevant crop, the upscaled crop, and the notes.
- Do not use a small crop alone.
- Use only the specific folder, crop, and notes for the current scoped task.
- Do not use Visual Spec Pack v1.
- Do not copy reference images into the repository.
- Do not include reference images in changed-files zips.
- Generate screenshots outside the repository.
- Compare screenshots against the selected Visual Spec Pack v2 references.
- If the Visual Spec Pack v2 path is missing, stop and ask the user to provide it.

For future Flux Sky work, preserve the accepted shell/dashboard checkpoint and use the updated source-of-truth docs plus Visual QA Rerun v4 artifact as the active evidence. Visual Spec Pack v2 remains previous/historical reference unless a future task explicitly scopes legacy UI work.

## 10. Component-by-Component Workflow

Previous implemented sequence:

1. Sidebar Only v1 - accepted.
2. Topbar Only v1 - accepted.
3. Main Surface + Page Header Only v1 - accepted.
4. Dashboard Card Rhythm Only v1 - accepted with caveats.
5. Login Page UI v1 - accepted for visual UI only; Login Form RHF Zod Migration v1 is accepted with notes for scoped form behavior; Login Auth Flow Backend Smoke v1 is accepted with notes for real local backend auth smoke; Local Env Bootstrap v1 is accepted with notes for local dev config; Security Headers + XSS Hardening v1 and Env-Driven CSP Connect Src Fix v1 are accepted with notes for baseline frontend security hardening.
6. List Page Pattern v1.
7. Media Library UI v1.
8. Editor Shell v1.

Rules:

- Do one component or page archetype at a time.
- Use allowlist files only.
- If a task needs files outside scope, stop and report before editing.
- Do not combine dashboard card rhythm, login, list pages, media library, editor shell, and mobile shell into one task.

Flux Sky shell/dashboard checkpoint sequence is listed in Section 8. Future work should move into scoped feature-page planning or implementation, not restart shell productionization without a specific blocker.

## 11. Screenshot / Visual QA Rules

- Screenshots must be written outside the repository.
- No dark mode screenshots are required because Admin Web MVP is light-only.
- Every UI implementation task must include screenshot evidence unless the task is docs-only or screenshots are impossible for a clearly reported reason.
- Compare screenshots against the selected Visual Spec Pack v2 full source image, crop, upscaled crop, and notes.
- UI Implementer summaries must include a visual match checklist.
- If any visual match checklist item is `NEEDS_FIX`, the overall result cannot be `PASS`.
- Do not include screenshots or browser artifacts in changed-files zips when those zips are created.

## 12. Next Recommended Task

The next recommended task is:

```text
Admin Web Flux Sky Feature Page Planning v1
```

Reason: Flux Sky shell/dashboard has reached a QA-passed checkpoint with notes. Feature pages remain not final, and planning should preserve the shell/topbar/dashboard direction before Blog/Tips/Media/List/Editor implementation work.

## 13. Handoff Notes for Future ChatGPT/Codex Sessions

For future Admin Web UI tasks:

1. Read `AGENTS.md` first.
2. Read `.agents/skills/skin-analyzer-admin-tailwind-shadcn-governor/SKILL.md` second for Admin Web UI/Flux Sky/shadcn/Tailwind work.
3. Read this current-state document third.
4. Read the relevant contracts:
   - `docs/admin-web-theme-token-contract.md`
   - `docs/admin-web-brand-visual-direction.md`
   - `docs/admin-web-ux-ui-contract.md`
   - `docs/admin-web-architecture.md`
   - `docs/admin-web-route-map.md`
   - `docs/admin-web-visual-qa-contract.md`
5. For Flux Sky work, read the accepted Flux Sky artifacts and updated source-of-truth docs before implementation.
6. For legacy visual work, read the Visual Spec Pack v2 root instructions and only the scoped task notes/crops for the current task.
7. Inspect current code before editing.
8. Do not assume missing context.
9. Do not continue from rejected outputs.
10. If prior summaries conflict with actual code, trust actual code and report the mismatch before editing.
