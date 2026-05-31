# Admin Web Architecture Contract v1

This document defines the planned architecture. Do not scaffold from this document alone; scaffold only after the contract is reviewed and explicitly approved.

Design implementation also depends on `docs/admin-web-brand-visual-direction.md` and `docs/admin-web-theme-token-contract.md`. Future UI shell, login, dashboard, and brand work must follow those addenda before code changes.

## 1. Likely Stack

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- React Hook Form + Zod + @hookform/resolvers is the standard for real/API-backed Admin Web forms, per `docs/admin-web-form-validation-contract.md`.
- Centralized API client layer.

Do not install dependencies as part of contract work.
Do not add `next-themes`, a theme toggle, or app-level `prefers-color-scheme` theme switching unless a future explicit contract changes the light-only MVP decision.

## 2. Future Folder Plan

```text
app/
  login/
  dashboard/
  blog/
  tips/
  media/
  categories-tags/
  authors/
  revalidation-events/
  settings/
components/
  ui/
  layout/
  dashboard/
  content/
  blog/
  tips/
  media/
  taxonomy/
  authors/
  editor/
lib/
  api/
  auth/
  permissions/
  format/
types/
  api/
styles/
  tokens/
```

## 3. Ownership Rules

- `components/ui`: generic primitives only.
- `components/layout`: shell, sidebar, topbar, breadcrumbs, page chrome.
- `components/dashboard`: dashboard widgets and summaries.
- `components/content`: shared content-post UI across Blog and Tips.
- `components/blog`: Blog-specific UI.
- `components/tips`: Tips-specific UI.
- `components/media`: media library and upload UI.
- `components/taxonomy`: categories and tags UI.
- `components/authors`: author management UI.
- `components/editor`: controlled block editor and editor-specific panels.
- `lib/api`: API client, request helpers, error mapping, endpoint modules.
- `lib/auth`: session bootstrap, current user helpers, auth redirects.
- `lib/permissions`: permission checks and menu visibility helpers.
- `lib/format`: date, status, text, and display formatting.
- `types/api`: backend DTOs and API response types.
- `styles/tokens`: Admin Web-owned light-only theme tokens and design variables.

Product-specific UI must not be placed in `components/ui`.

Token implementation must be separated from Public Web styling. Do not import or mirror the Public Web rose/pearl/champagne theme as the Admin Web base.

Future shell and login work must implement the Modern AI Skin Analysis Admin 2026 direction from the brand addendum, including the light neutral workspace, dark navy sidebar, blue/cyan accent system, and the front-facing AI skin scan logo direction when brand assets are scoped.

Future token cleanup must happen before additional UI page work. It should align `app/globals.css` with `docs/admin-web-theme-token-contract.md` and remove app-level dark-mode or `prefers-color-scheme` token behavior if present.

## 4. API Client Rules

- Use a centralized API client.
- Do not scatter `fetch` calls across UI components.
- Use cookie-based auth.
- Use `credentials: "include"` for browser-to-Admin-Backend requests when calling the backend directly.
- Use a CSRF header for mutating requests.
- Do not store a session token in `localStorage`.
- A CSRF token may live in memory or a safe client store, but it must not be treated as the backend session token.
- `GET /v1/admin/auth/me` loads current user, roles, and permissions.
- API errors must use standardized mapping for UI states and messages.
- Separate API DTOs from UI view models where useful.
- Do not use server actions for backend API mutation unless explicitly approved later.
- Prefer browser-to-Admin-Backend API calls with credentials included, or a BFF route only if explicitly designed later.

## 5. Form Validation Architecture

- Form validation stack decision lives in `docs/admin-web-form-validation-contract.md`.
- Future real and API-backed form code should keep schemas and testable validation separate from visual components where practical.
- Backend payload mapping should remain explicit instead of assuming form state equals backend DTOs.
- Form library migration must be scoped separately from visual redesign.

## 6. Auth and Permission Model

- Login uses `POST /v1/admin/auth/login`.
- Logout uses `POST /v1/admin/auth/logout`.
- Current session uses `GET /v1/admin/auth/me`.
- Sidebar visibility must be based on permissions from `/v1/admin/auth/me`.
- Backend permission checks are the source of truth.
- Frontend menu hiding improves usability, but it is not security.
- The UI must handle `401` by redirecting or prompting login.
- The UI must handle `403` with a clear forbidden state.

## 7. Data State Rules

Every API-backed page should define:

- Loading state.
- Error state.
- Empty state.
- Stale state where relevant.
- Retry behavior.
- Forbidden state where permissions apply.

Optimistic updates require explicit approval before use.

## 8. Backend API Awareness

Admin Web expects the Admin Backend contract to provide these high-level capabilities:

- Auth: `POST /v1/admin/auth/login`, `POST /v1/admin/auth/logout`, `GET /v1/admin/auth/me`.
- Content: Blog and Tips draft create, update, read, list, archive, unarchive, and publish.
- Publish behavior: backend dispatches public revalidation.
- Revalidation: events list, detail, and retry.
- Media: upload, list, and detail.
- Taxonomy and authors: categories, tags, and authors management.

Do not copy full backend API docs into Admin Web docs. Treat backend docs as the source of detailed endpoint contracts.
