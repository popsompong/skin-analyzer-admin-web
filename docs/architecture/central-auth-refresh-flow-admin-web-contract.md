# Central Auth Refresh Flow Admin Web Contract

## Boundary

Admin Web talks to Admin Backend only. Admin Backend owns browser cookies, CSRF
validation, and Central Auth service calls. Central Auth remains internal and
does not set browser cookies.

## Browser-Safe Responses

`GET /v1/admin/auth/me` may return:

```json
{
  "user": {},
  "roles": [],
  "permissions": [],
  "csrfToken": "browser-safe-csrf-proof",
  "refreshCsrfToken": "optional-browser-safe-refresh-csrf-proof",
  "session": {
    "id": "browser-safe-session-id",
    "expiresAt": "RFC3339 timestamp"
  }
}
```

Terminal browser session fence failure returns:

```text
HTTP 401
error.code = "session_ended"
```

Admin Web treats `401 session_ended` as terminal. It does not call
`POST /v1/admin/auth/refresh`, does not retry `/me`, clears browser-safe normal
and refresh CSRF proof state, preserves the typed status/code, and transitions
to the unauthenticated path. This terminal classification is based only on
`AdminApiClientError.status === 401` and `AdminApiClientError.code ===
"session_ended"`; a generic 401 or missing code is not terminal session end.

HTTP status is authoritative for broad disposition. Contradictory status/code
pairs remain typed safe errors and do not select the body-code category when the
HTTP status is incompatible. For example, `401 service_unavailable` follows the
generic 401 path, while `503 session_ended` follows the service-unavailable
path rather than terminal session end.

Dependency/internal failures return HTTP 503. Admin Web classifies service
unavailable by HTTP 503, does not classify 503 as terminal session end, does not
report it as invalid credentials, and does not create an automatic refresh loop.

`POST /v1/admin/auth/login` may return either the existing complete local-auth
snapshot or a Central Auth browser-safe envelope:

```json
{
  "ok": true,
  "expiresAt": "RFC3339 timestamp",
  "refreshCsrfToken": "optional-browser-safe-refresh-csrf-proof"
}
```

When login returns a complete snapshot, Admin Web preserves local behavior and
does not call `/me` unnecessarily. When login returns the browser-safe envelope,
Admin Web calls `GET /v1/admin/auth/me` exactly once without auto-refreshing
that immediate post-login request. `/me` supplies the user, roles, permissions,
session, and CSRF token. The login envelope's `refreshCsrfToken` may be carried
forward if `/me` omits it.

`POST /v1/admin/auth/refresh` must return only:

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

Admin Web rejects unsafe refresh responses containing browser-forbidden auth
credential fields.

## Page Reload Sequence

1. Start in loading auth state.
2. Call `GET /v1/admin/auth/me` with credentials included.
3. If `/me` succeeds, apply user, roles, permissions, session, `csrfToken`, and
   optional `refreshCsrfToken`.
4. If `/me` returns `401 session_ended`, clear normal and refresh CSRF proof
   state, do not call refresh, do not retry `/me`, and enter the unauthenticated
   path.
5. If `/me` returns generic/non-terminal 401 and the refresh feature flag is
   disabled, remain in the
   existing unauthenticated path.
6. If `/me` returns generic/non-terminal 401 and the refresh feature flag is
   enabled, read `refreshCsrfToken` from memory or
   `__Host-sa_admin_refresh_csrf`.
7. If no refresh CSRF proof exists, clear local auth/CSRF state.
8. If proof exists, call refresh once.
9. On refresh success, update CSRF/session state and call `/me` once more.
10. If the post-refresh `/me` returns `401 session_ended`, do not refresh again;
    clear normal and refresh CSRF proof state and enter the unauthenticated path.
11. If refresh fails with hard auth failure, clear local auth/CSRF state.

## Status Handling

- Refresh 200 updates normal CSRF, refresh CSRF, and session metadata.
- Refresh 401 clears auth, normal CSRF, and refresh CSRF state.
- Refresh 403 clears refresh CSRF memory and avoids retry loops.
- Refresh 409 preserves state so `/me` can reconcile possible concurrent
  refresh activity.
- Refresh 429 and 503 preserve state when possible and require user-initiated or
  later retry behavior.
- Immediate post-login `/me` does not auto-refresh. `401 session_ended` is
  terminal; HTTP 503 is safe unavailable state, not invalid credentials. Raw
  backend detail is not shown to the user.

## Deferred Work

The foundation does not implement a logout contract, proactive refresh timers,
full staging E2E, production cutover, or endpoint-specific mutation replay. A
future logout task should define how Admin Web and Admin Backend clear access,
refresh, and refresh-CSRF cookies together.

This contract documents frontend behavior only. It does not make a production
or staging cutover readiness claim.
