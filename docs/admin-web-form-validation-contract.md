# Admin Web Form Validation Contract v1

## 1. Purpose

This document defines the Admin Web form validation standard before additional real or API-backed forms are implemented.

It exists to keep login, content management, media, taxonomy, authors, revalidation, settings, and future admin forms consistent across validation, submit behavior, error display, backend error mapping, and tests.

## 2. Decision

- Real forms and API-backed forms must use `react-hook-form` + `zod` + `@hookform/resolvers/zod`.
- `useState` must not be the default form model for real or API-backed forms.
- `useState` remains allowed for tiny UI-only state.
- TypeScript types should be inferred from Zod schemas when practical.
- Validation schemas should be reusable and testable.
- Backend and field errors must be mapped safely.

## 3. Why This Standard Exists

Admin Web will have many forms:

- Login.
- Blog and Tips editor workflows.
- Taxonomy.
- Authors.
- Media metadata.
- Settings.
- Revalidation.
- Future admin forms.

Consistent schema-driven validation reduces ad hoc state and validation drift.

Zod schemas provide runtime validation and TypeScript inference. React Hook Form centralizes form state, validation, submit behavior, errors, default values, and reset behavior.

## 4. What Counts as a Real Form

Use the standard form stack for:

- Login form.
- Blog/Tips create and edit forms.
- Block editor forms.
- Media metadata forms.
- Taxonomy/category/tag forms.
- Authors forms.
- Settings forms.
- Revalidation retry or confirm forms.
- Profile/account forms.
- Any form that submits to Admin Backend or maps backend validation errors.
- Search/filter forms with multiple fields, URL sync, or API payload.

## 5. What Can Use `useState`

`useState` remains acceptable for:

- Drawer open/close.
- Tabs.
- Modal visibility.
- Simple toggles.
- Hover or preview state.
- Compact search input that does not submit as a real form.
- Visual-only temporary state.
- One-off state that has no schema, no API payload, and no backend error mapping.

## 6. Dependency Policy

Dependencies should be added in a separate implementation task:

```text
Admin Web Form Validation Foundation v1
```

Expected packages:

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

Add these as production dependencies only when runtime form components use them.

Do not add alternative form libraries without explicit approval.

Do not add all form dependencies inside unrelated UI, API, auth, docs, or visual tasks.

## 7. Schema Organization

Preferred patterns:

- Keep feature-specific schemas near the feature or under `lib/forms/` or `lib/validation/`.
- Name schemas clearly, for example:
  - `loginFormSchema`
  - `blogPostDraftFormSchema`
  - `authorFormSchema`
- Infer types from schemas when practical:

```ts
type LoginFormValues = z.infer<typeof loginFormSchema>;
```

Keep API payload mapping explicit. Do not assume the form shape always equals the backend payload shape.

## 8. Error Handling Rules

- Client validation errors should come from Zod and React Hook Form.
- Backend errors should map safely to field-level or form-level errors.
- Never show raw SQL, stack traces, or internal errors to users.
- Do not log passwords, tokens, CSRF tokens, or sensitive form values.
- Use safe generic messages for unknown failures.
- Preserve existing auth security rules.

## 9. Login Form Migration Rule

The current Login Page UI and Login Auth Flow exist, but the form must be migrated to React Hook Form + Zod in a scoped task:

```text
Admin Web Login Form RHF Zod Migration v1
```

That migration must not redesign the visual UI.

It must preserve:

- Login submit behavior.
- CSRF retention.
- Route guard behavior.
- Existing frontend auth tests.

After migration, frontend tests must be updated to cover React Hook Form and Zod behavior.

Backend smoke should run after login form migration unless the user explicitly chooses otherwise.

## 10. Testing Requirements

- Form schemas should have focused unit tests.
- Form submit behavior should have component tests when practical.
- Error mapping should be tested for important flows.
- Auth/login form tests must continue to verify:
  - No session token storage.
  - CSRF retention.
  - `credentials: "include"`.
  - Safe errors.
- Add tests incrementally. Do not create a giant form test suite in one task.

## 11. Forbidden Patterns

- Do not create ad hoc validation logic scattered inside components for real forms.
- Do not use `useState` as the default form model for API-backed forms.
- Do not introduce alternative form libraries without explicit approval.
- Do not migrate every form in one task.
- Do not mix visual redesign with form library migration.
- Do not weaken auth security when migrating the login form.
- Do not store passwords or tokens in persistent storage.

## 12. Implementation Sequence

Recommended sequence:

1. Admin Web Form Validation Contract v1.
2. Admin Web Form Validation Foundation v1.
3. Admin Web Login Form RHF Zod Migration v1.
4. Admin Web Login Auth Flow Frontend Tests update.
5. Admin Web Login Auth Flow Backend Smoke v1.
6. Future form migrations one page or feature at a time.

## 13. Documentation Workflow

- UI, behavior, and test tasks should include a `Documentation Impact Candidate`.
- Do not update current-state docs inside implementation tasks unless explicitly scoped.
- After gatekeeper review, use separate docs sync or addendum tasks for accepted notes.
