# Central Auth Logout Flow Foundation

## Scope

Admin Web includes a disabled-by-default logout foundation for the future
Central Auth cookie mode through the existing Admin Backend browser route:

```text
POST /v1/admin/auth/logout
```

Admin Web still calls Admin Backend only. It does not call Central Auth, does
not read HttpOnly cookies, and does not store or send Central Auth access or
refresh credential material from browser JavaScript.

## Feature Flag

The foundation is off unless this public frontend flag is set to `true`:

```text
NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED=false
```

When the flag is absent or not `true`, the existing local logout request shape
is preserved: `POST /v1/admin/auth/logout`, `credentials: "include"`, no CSRF
header, and no request body.

When enabled, logout starts a terminal auth-state transition before the network
request and blocks refresh/retry recovery from restoring auth state.

## Request Headers

Central Auth logout uses one CSRF proof at a time:

1. Prefer access-bound `X-CSRF-Token` when `csrfToken` is available.
2. Otherwise use refresh-bound `X-Refresh-CSRF-Token` when `refreshCsrfToken`
   is available.
3. If no proof is available, fail closed locally, skip the backend call, and let
   local logout finalization clear browser-safe auth state.

The logout request uses:

```text
credentials: "include"
```

It sends no request body by default, no `Authorization` header, no access token,
no refresh handle, and no raw cookie values.

## Refresh Blocking And Late Responses

Central Auth logout activates a logout guard before the backend request. While
the guard is active:

- `refreshAdminSession()` rejects before making a refresh request.
- The shared unauthorized-read retry handler refuses to refresh.
- A refresh request that started before logout cannot store rotated CSRF/session
  state after logout advances the guard generation.
- Provider bootstrap and manual refresh responses are ignored when their request
  generation is older than the logout generation.

The guard is cleared by a new login attempt, so the login route can start a new
auth lifecycle without keeping stale logout state.

## State Clearing

Central Auth logout finalization clears browser-safe CSRF state in the helper.
The provider logout finalization clears:

- user
- roles
- permissions
- session
- authenticated status
- normal CSRF memory and `sessionStorage`
- refresh CSRF memory
- bootstrap/loading state through the unauthenticated provider state

There is no query cache or queued mutation replay state in the current
foundation.

## Status Handling

Logout treats user intent as final. `200`, `204`, and browser-safe `{ "ok":
true }` responses complete logout. `401`, `403`, `409`, `429`, `503`, and
network failures also clear local browser-safe state and do not trigger refresh.

Unsafe or invalid successful logout response bodies are rejected so forbidden
credential fields cannot silently enter the frontend contract.

## Storage And Redaction

This foundation does not introduce:

- access token storage
- refresh handle storage
- `Authorization: Bearer`
- Central Auth direct browser calls
- PASETO parsing
- raw token, cookie, or claim samples

CSRF proofs remain browser-safe auth-adjacent state, not authentication
credentials. Logout clears them after finalization.

## Deferred Work

Intentionally deferred:

- Central Auth server-side logout/revoke endpoint and client
- production cutover
- staging E2E coverage
- topbar logout UI integration
- user-facing warning UX for backend logout confirmation failures
- broad auth or API rewrite
