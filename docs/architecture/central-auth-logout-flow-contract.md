# Central Auth Logout Flow Contract

## Boundary

Admin Web talks to Admin Backend only. Admin Backend owns browser cookies, CSRF
validation, and any future Central Auth service-to-service revoke call. Central
Auth remains internal and does not set browser cookies.

## Browser Request

`POST /v1/admin/auth/logout`:

- `credentials: "include"`
- empty body by default
- `X-CSRF-Token` when access-bound CSRF is available
- otherwise `X-Refresh-CSRF-Token` when refresh-bound CSRF is available

Admin Web sends exactly one CSRF proof. It must not send both proofs for this
route unless a later backend contract explicitly changes that rule.

Forbidden request material:

- `Authorization`
- access token
- refresh handle
- raw cookie value
- raw PASETO
- Central Auth URL

## Browser Response

Allowed success responses:

```json
{ "ok": true }
```

```json
{ "status": "ok" }
```

`204 No Content` is also accepted.

Forbidden response fields:

- `accessToken`
- `refreshHandle`
- raw token fields
- raw claims
- raw cookie values
- Central Auth internal DTOs

## Logout Sequence

1. User initiates logout.
2. Admin Web activates the logout guard before the backend request.
3. New refresh attempts and unauthorized-read refresh retries are blocked.
4. Admin Web sends the accepted CSRF proof to Admin Backend only.
5. Admin Backend clears Admin Backend-owned cookies.
6. Admin Web clears local user, role, permission, session, CSRF, and auth status
   state.
7. Existing route guard or route transition moves the user to the logged-out
   path.
8. Late `/me`, refresh, or auth bootstrap responses from older generations are
   ignored.

## Failure Policy

Logout never refreshes before or after a logout failure. `401`, `403`, `409`,
`429`, `503`, and network failures are treated as final local sign-out events.
The current foundation has no warning surface, so it avoids exposing backend
internals and leaves warning UX to a later scoped task.

## Compatibility

When `NEXT_PUBLIC_ADMIN_CENTRAL_AUTH_LOGOUT_ENABLED` is not `true`, local
compatibility remains unchanged and logout sends no CSRF proof. This keeps the
existing Admin Backend local-session logout mode isolated from the future
Central Auth logout path.
