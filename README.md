# skin-analyzer-admin-web

Private Admin Web for Skin Analyzer.

## Current Status

This repository contains the Admin Web scaffold, accepted foundation checkpoints for routes, API/auth/permission placeholders, documentation contracts, and the Flux Sky shell/dashboard implementation checkpoint.

Feature implementation must remain scoped and follow the contract docs.

Theme status: Admin Web MVP is light-only. The active visual direction is Flux Sky: light / neutral Flux-like sidebar plus shadcn/Tailwind sky action and event states. The shell/dashboard checkpoint has passed `Admin Web Flux Sky Visual QA Rerun v4` with notes. This does not make the whole Admin Web product final, and feature pages remain deferred/not final.

Current UI implementation state, handoff notes, and required future UI skill are documented in `docs/admin-web-current-ui-implementation-state.md`.

## Purpose

The Admin Web will provide internal tools for managing Skin Analyzer admin content and operations, including Blog, Tips, media, taxonomy, authors, revalidation events, and settings.

Target backend:

```text
skin-analyzer-admin-backend
```

## Central Auth Refresh Foundation

Admin Web has a disabled-by-default Central Auth refresh-flow foundation for the
Admin Backend route `POST /v1/admin/auth/refresh`.

Feature flag:

```text
NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED=false
```

When the flag is not `true`, existing Admin Web auth behavior remains unchanged.
When enabled, the refresh helper still calls Admin Backend only, uses
`credentials: "include"`, sends `X-Refresh-CSRF-Token` only on the refresh
route, and stores only browser-safe CSRF/session state. Admin Web must not store
or send Central Auth credential material from browser JavaScript.

Details:

- `docs/architecture/central-auth-refresh-flow-foundation.md`
- `docs/architecture/central-auth-refresh-flow-admin-web-contract.md`

### Terminal `/me` Session End And Login Bootstrap

Admin Backend may return `HTTP 401` with `error.code = "session_ended"` from
`GET /v1/admin/auth/me` when the browser session fence has failed terminally.
Admin Web treats that exact status/code pair as terminal: it clears
browser-safe CSRF proof state, does not call refresh, does not retry `/me`, and
lets the auth guard move the user back to `/login`. HTTP status is
authoritative for broad disposition, so a contradictory response such as
`HTTP 503` with `error.code = "session_ended"` is not terminal session end.

Generic non-terminal `401` read responses still keep the existing opt-in
one-refresh/one-retry policy when refresh is enabled and a refresh CSRF proof is
available. `HTTP 503` with `service_unavailable` is not terminal session end and
does not trigger an automatic refresh loop. Service unavailable is selected by
HTTP 503, not by a body code attached to an incompatible status such as
`HTTP 401`.

`POST /v1/admin/auth/login` supports both response modes:

- local mode may return the complete user, role, permission, session, and CSRF
  snapshot;
- Central Auth cookie mode may return only browser-safe login fields such as
  `ok`, `expiresAt`, and `refreshCsrfToken`.

For the Central Auth browser-safe envelope, Admin Web calls
`GET /v1/admin/auth/me` exactly once without auto-refreshing that immediate
post-login request. `/me` supplies the authenticated user snapshot. Admin Web
does not expose or store `accessToken`, `refreshHandle`, raw cookies, raw PASETO
values, or raw claims in browser JavaScript.

## Central Auth Logout Foundation

Admin Web has a disabled-by-default Central Auth logout-flow foundation for the
Admin Backend route `POST /v1/admin/auth/logout`.

Feature flag:

```text
NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED=false
```

When the flag is not `true`, existing logout behavior remains unchanged. When
enabled, logout still calls Admin Backend only, uses `credentials: "include"`,
prefers `X-CSRF-Token`, falls back to `X-Refresh-CSRF-Token`, blocks refresh
after logout begins, ignores late auth responses, and clears browser-safe
auth/CSRF/session state. Admin Web must not store or send Central Auth access
tokens or refresh handles.

Details:

- `docs/architecture/central-auth-logout-flow-foundation.md`
- `docs/architecture/central-auth-logout-flow-contract.md`

## What This Repo Is Not

- Not the public Skin Analyzer web app.
- Not the public UX/UI worktree.
- Not the Admin Backend.
- Not Engine v2, K.2M, camera, model, or runtime work.
- Not a place for backend migration or API implementation.

## Planned Implementation Order

1. Keep Admin Web changes small and reviewable.
2. Preserve the accepted Flux Sky shell/sidebar/topbar/dashboard checkpoint unless a later accepted direction changes it.
3. Treat feature work such as Blog/Tips/Media, dashboard hardening, editor/list implementation, taxonomy, authors, revalidation, settings, and Topbar Auth Menu as later scoped work unless the user explicitly reprioritizes it.
4. Future UI prompts should read `.agents/skills/skin-analyzer-admin-tailwind-shadcn-governor/SKILL.md` before implementation.
5. For the next product UI step, prefer scoped feature-page planning or a single feature-page foundation task.

The Flux Sky Golden Mockup is a visual checkpoint and planning reference only. It is not production code and must not be copied wholesale into production.

## Report and Zip Artifact Policy

Reports and changed-files zips must be written outside the repo:

```text
/tmp/skin-analyzer-codex-reports/skin-analyzer-admin-web/
```

Report filenames:

```text
<TOPIC>_<DD-MM-YYYY_HH-MM-SS>.txt
```

Changed-files zips must include only files changed by the current task and must not include build output, screenshots, reports, `.env*`, uploaded assets, or unrelated files.
