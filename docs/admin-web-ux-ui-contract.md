# Admin Web UX/UI Contract v1

This document defines the design direction for `skin-analyzer-admin-web`. It is the main UX/UI source of truth before scaffold or implementation.

Brand and visual direction is further constrained by `docs/admin-web-brand-visual-direction.md`. That addendum overrides any generic scaffold visual direction and must be read before future UI implementation.

## 1. Design Direction

- Modern AI Skin Analysis Admin 2026.
- Clean SaaS Dashboard.
- Calm Editorial Admin.
- Professional internal tool.
- Neutral surfaces.
- Subtle brand accent.
- Minimal shadows.
- Clear borders.
- Clear status badges.
- Comfortable tables, lists, and forms.
- Readable editor surfaces.
- Not public marketing UI.
- Not a beauty landing page.
- Not flashy.
- Independent from the Public Web visual theme.

The interface should feel efficient, clear, and trustworthy for repeated admin work.

## 2. Visual Restrictions

Do not use:

- Heavy gradients.
- Glassmorphism-heavy panels.
- Neon effects.
- Public landing page hero style.
- Public Web rose, pearl, or champagne palette as the Admin Web base.
- Large marketing typography.
- Excessive motion.
- Arbitrary color choices.
- Random card shadows.
- Decorative UI that reduces scanning speed.

Any visual flourish must serve task clarity, hierarchy, or state recognition.

## 3. Design Tokens Direction

Define tokens during scaffold before implementing major screens. Do not introduce one-off colors in components.

Admin Web tokens are Admin Web-owned. They must follow the blue/cyan/navy admin system from `docs/admin-web-brand-visual-direction.md` and must not inherit the Public Web theme as the base.

- `background`: page canvas.
- `surface`: primary panel, card, dialog, table, and form surface.
- `surface-muted`: low-emphasis panels, table rows, secondary controls, and sidebar groups.
- `border`: standard dividers and control outlines.
- `text-primary`: main readable text.
- `text-secondary`: labels, metadata, helper text, and secondary navigation.
- `brand/accent`: Skin Analyzer admin accent used sparingly for selected states and primary actions.
- `success`: completed, published, active, healthy.
- `warning`: draft risk, needs review, retryable issue.
- `error`: failed, destructive, invalid, blocked.
- `info`: neutral system information and processing states.
- `radius`: restrained radius suitable for admin tools.
- `spacing`: compact but comfortable density for tables, forms, and editor panels.
- `shadow`: minimal elevation only where layering needs to be clear.
- `focus ring`: visible, accessible keyboard focus state.

Logo direction is a front-facing AI skin scan mark following Logo B: Semi-realistic App Icon Style. Actual asset implementation must be scoped separately.

## 4. Typography

- Admin typography must prioritize readability and density.
- Thai and English text must remain readable in tables, forms, editors, badges, and menus.
- Avoid oversized public-page headings.
- Use clear hierarchy without marketing-style display type.
- Tables, forms, and editor text should be calm, compact, and easy to scan.

## 5. Layout

- Sidebar: primary navigation, permission-aware visibility, stable width, clear active states.
- Topbar: user/session actions, current area context, optional breadcrumbs or page actions.
- Main content: focused work surface with predictable spacing and page-level actions.
- Cards: use for repeated items, compact summaries, and contained tools only.
- Tables: support status, ownership, updated time, actions, loading, empty, and error states.
- Forms: clear labels, validation messages, save/cancel actions, and unsaved-change handling.
- Editor layout: content canvas, block controls, metadata panel, preview/publish actions.
- Responsive behavior: desktop-first admin productivity, tablet support, and mobile-safe shells for basic review or emergency edits.

Do not place cards inside other cards unless the component is a real modal, popover, or repeated item.

## 6. Light and Dark Mode

- Both modes must be supported eventually.
- Do not create one-off dark colors.
- Theme implementation must use tokens.
- New UI work must consider how surfaces, borders, text, status badges, and focus rings behave in both modes once theme support exists.

## 7. UX States

Every major screen or workflow should define relevant states:

- Loading.
- Empty.
- Error.
- Forbidden.
- Offline or API down.
- Unsaved changes.
- Success toast.
- Destructive confirmation.

Do not ship blank or ambiguous states for admin workflows.

## 8. Editor Principle

- Aim for a Wix-like admin experience, but do not clone Wix.
- Use a controlled block editor.
- Do not create a free canvas.
- Do not allow arbitrary CSS or JavaScript.
- Use templates and safe variants only.
- Blocks come from code.
- Content props come from the API.
- Publishing controls must be explicit and permission-aware.

The editor should protect brand consistency and content safety more than it maximizes layout freedom.

## 9. Admin-Specific Behavior

- Usability is more important than decoration.
- Dense but readable layouts are preferred.
- Admin Web does not need public SEO.
- Admin Web must remain private and `noindex`.
- Public presentation can be previewed, but public-facing rendering belongs to the public web contract.
