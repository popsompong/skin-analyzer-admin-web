# Admin Web Route Map v1

This document defines the MVP route map for `skin-analyzer-admin-web`.

## Permission Examples

- `dashboard.view`
- `blog.post.view`
- `blog.post.create`
- `blog.post.update`
- `blog.post.publish`
- `blog.post.archive`
- `tips.post.view`
- `tips.post.create`
- `tips.post.update`
- `tips.post.publish`
- `tips.post.archive`
- `media.view`
- `media.upload`
- `taxonomy.manage`
- `authors.manage`
- `revalidation.retry`
- `settings.manage`

Permission names are examples until the Admin Backend contract is finalized. The frontend must use permissions returned by `GET /v1/admin/auth/me`.

## MVP Routes

| Route | Purpose | Required Permission | First Scaffold State | Future UI State | Related Backend Endpoints |
| --- | --- | --- | --- | --- | --- |
| `/login` | Admin sign-in. | Public unauthenticated route. | Centered login form shell with API-disabled placeholder if backend is not wired. | Cookie-based login, CSRF setup, error handling, redirect to dashboard. | `POST /v1/admin/auth/login`, `GET /v1/admin/auth/me` |
| `/dashboard` | Admin overview and operational summary. | `dashboard.view` | Protected page shell with empty summary sections. | Content status, recent updates, publish/revalidation health, quick actions. | `GET /v1/admin/auth/me`, content list endpoints, revalidation summary if available |
| `/blog` | Blog post list and management. | `blog.post.view` | List shell with loading/empty/error states. | Filterable table, status badges, create/edit/archive/publish actions. | Blog list, archive, unarchive, publish endpoints |
| `/blog/new` | Create Blog draft. | `blog.post.create` | Draft form/editor shell. | Controlled editor, metadata, save draft, preview, publish if allowed. | Blog create/update/read/publish endpoints |
| `/blog/[id]/edit` | Edit Blog draft or existing post. | `blog.post.update` | Edit shell with loading/error/forbidden states. | Version-aware editor, metadata, preview token, archive/unarchive/publish actions. | Blog read/update/archive/unarchive/publish endpoints |
| `/tips` | Tips post list and management. | `tips.post.view` | List shell with loading/empty/error states. | Filterable table, status badges, create/edit/archive/publish actions. | Tips list, archive, unarchive, publish endpoints |
| `/tips/new` | Create Tips draft. | `tips.post.create` | Draft form/editor shell. | Controlled editor, metadata, save draft, preview, publish if allowed. | Tips create/update/read/publish endpoints |
| `/tips/[id]/edit` | Edit Tips draft or existing post. | `tips.post.update` | Edit shell with loading/error/forbidden states. | Version-aware editor, metadata, preview token, archive/unarchive/publish actions. | Tips read/update/archive/unarchive/publish endpoints |
| `/media` | Media library and uploads. | `media.view` | Media table/grid shell with upload action hidden if unauthorized. | Upload, list, detail, copy URL, usage hints if backend supports them. | Media upload, list, detail endpoints |
| `/categories-tags` | Manage content taxonomy. | `taxonomy.manage` | Taxonomy management shell. | Category/tag lists, create/edit/archive controls, validation. | Categories and tags management endpoints |
| `/authors` | Manage author profiles. | `authors.manage` | Authors list shell. | Create/edit author metadata, avatar/media link, status. | Authors management endpoints |
| `/revalidation-events` | Inspect and retry revalidation events. | `revalidation.retry` | Events list shell. | Event detail, status filters, retry action, failure detail. | Revalidation events list/detail/retry endpoints |
| `/settings` | Admin Web settings. | `settings.manage` | Settings shell with no destructive defaults. | Theme/admin preferences, safe operational settings if backend supports them. | Settings endpoints if later defined |

## Route Deferral

- No public pages.
- No public SEO.
- No report pages.
- No user management UI until the backend/admin need is clear, unless explicitly scoped.
- No Engine v2, K.2M, camera, model, or runtime routes.
- No backend migration/API implementation routes.

## Menu Direction

- Sidebar menu items must be hidden or shown based on permissions from `GET /v1/admin/auth/me`.
- Hidden menu items do not replace backend authorization.
- Direct navigation to unauthorized routes must show a clear forbidden state or redirect according to the auth contract.

