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
4. If `/me` returns 401 and the refresh feature flag is disabled, remain in the
   existing unauthenticated path.
5. If `/me` returns 401 and the refresh feature flag is enabled, read
   `refreshCsrfToken` from memory or `__Host-sa_admin_refresh_csrf`.
6. If no refresh CSRF proof exists, clear local auth/CSRF state.
7. If proof exists, call refresh once.
8. On refresh success, update CSRF/session state and call `/me` once more.
9. If refresh or the post-refresh `/me` fails, clear local auth/CSRF state.

## Status Handling

- Refresh 200 updates normal CSRF, refresh CSRF, and session metadata.
- Refresh 401 clears auth, normal CSRF, and refresh CSRF state.
- Refresh 403 clears refresh CSRF memory and avoids retry loops.
- Refresh 409 preserves state so `/me` can reconcile possible concurrent
  refresh activity.
- Refresh 429 and 503 preserve state when possible and require user-initiated or
  later retry behavior.

## Deferred Work

The foundation does not implement a logout contract, proactive refresh timers,
full staging E2E, production cutover, or endpoint-specific mutation replay. A
future logout task should define how Admin Web and Admin Backend clear access,
refresh, and refresh-CSRF cookies together.
