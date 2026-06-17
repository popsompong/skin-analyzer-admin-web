# Central Auth Refresh Flow Foundation

## Scope

Admin Web includes a disabled-by-default foundation for the future Central Auth
refresh flow through the Admin Backend browser route:

```text
POST /v1/admin/auth/refresh
```

Admin Web does not call Central Auth directly. Browser cookies remain owned by
Admin Backend, and browser JavaScript never reads the HttpOnly access or refresh
cookies.

## Feature Flag

The foundation is off unless this public frontend flag is set to `true`:

```text
NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_REFRESH_ENABLED=false
```

When the flag is absent or not `true`, refresh does not run and existing
`/login`, `/logout`, `/me`, and normal Admin Backend request behavior remains
unchanged.

## CSRF State

Admin Web keeps two browser-safe CSRF proofs:

- `csrfToken`: normal access-bound CSRF proof for Admin Backend mutations.
- `refreshCsrfToken`: refresh-specific CSRF proof for the refresh endpoint only.

`csrfToken` keeps the existing memory plus `sessionStorage` compatibility.
`refreshCsrfToken` is memory-only. If memory is empty and refresh is explicitly
needed, Admin Web may read the non-HttpOnly `__Host-sa_admin_refresh_csrf`
cookie as a fallback. That cookie value is not an auth credential and is not
enough to refresh without the HttpOnly refresh cookie sent by the browser.

Hard auth failure and logout state resets clear both CSRF proofs.

The Central Auth logout foundation adds a logout guard so refresh attempts are
blocked after logout begins, and an in-flight refresh response cannot restore
rotated CSRF/session state after the logout generation advances.

## Request Headers

Normal protected read requests use `credentials: "include"` and do not send CSRF
headers by default.

Normal mutating Admin Backend requests send:

```text
credentials: "include"
X-CSRF-Token: <csrfToken>
```

Refresh requests send:

```text
credentials: "include"
X-Refresh-CSRF-Token: <refreshCsrfToken>
```

Refresh requests do not send `X-CSRF-Token`, request-body credential material,
or `Authorization` bearer headers.

## Refresh Helper

`refreshAdminSession()` requires the feature flag and a refresh CSRF proof. It
calls Admin Backend only, validates the browser-safe response shape, rejects
unsafe credential fields, and updates `csrfToken`, `refreshCsrfToken`, and
browser-safe session metadata after success.

Expected successful browser response:

```json
{
  "ok": true,
  "csrfToken": "browser-safe-csrf-proof",
  "refreshCsrfToken": "browser-safe-refresh-csrf-proof",
  "session": {
    "id": "browser-safe-session-id",
    "expiresAt": "RFC3339 timestamp"
  }
}
```

## Retry Policy

The v1 policy is conservative:

- No proactive refresh timer.
- Boot calls `/me` first.
- Boot `/me` 401 may attempt one refresh only when the flag is enabled and a
  refresh CSRF proof is available.
- After boot-time refresh success, Admin Web calls `/me` once to reload user,
  roles, and permissions.
- Opt-in read requests can attempt one refresh and one retry on 401.
- Mutating requests are not blindly replayed after refresh.
- Refresh itself is never retried automatically.

`409 session_stale` preserves local state and lets the boot helper reconcile by
calling `/me` once. `429` and `503` do not create automatic retry storms.

## Storage And Redaction

Admin Web must not store, log, type as frontend state, or send from JavaScript:

- `accessToken`
- `refreshHandle`
- raw PASETO values
- raw HttpOnly cookie values
- raw Central Auth response bodies
- raw claims

The refresh foundation intentionally avoids production cutover, Admin Backend
changes, Central Auth changes, and sibling repo changes. Logout behavior is now
documented separately in
`docs/architecture/central-auth-logout-flow-foundation.md`.
