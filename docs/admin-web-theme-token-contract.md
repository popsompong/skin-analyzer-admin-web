# Admin Web Theme Token Contract v1

This document locks the Admin Web MVP theme and token rules before further UI implementation.

## 1. Purpose

Use this document to prevent future Admin Web work from inventing a new palette, copying the Public Web theme, adding dark mode, or scattering raw color values through components.

This contract is the source of truth for Admin Web MVP theme mode, semantic color tokens, and component color usage.

## 2. Theme Mode Decision

- Admin Web MVP is light-only.
- No dark mode.
- No theme toggle.
- No `next-themes`.
- No app-level `prefers-color-scheme` theme switching.
- No dark-mode screenshots are required.
- Do not fail future UI tasks for missing dark mode screenshots.
- Validate the light-only theme consistently across supported viewports.

## 3. Product Surface Separation

- Admin Web owns its own theme system.
- Do not copy or inherit Public Web color or theme direction.
- Do not use the Public Web rose, pearl, or champagne palette as the Admin Web base.
- Public Web brand colors may appear only as tiny approved accents, not as the Admin Web system palette.
- Admin Web should feel like a modern AI skin-analysis admin and content studio, not a beauty landing page.

## 4. Light-Only Theme Direction

- Light neutral main workspace.
- Dark navy sidebar.
- White or off-white cards.
- Cool gray borders.
- Slate or near-black text.
- Blue primary action.
- Cyan AI scan accent.
- Optional violet analytics accent.
- Emerald success.
- Amber warning.
- Red danger.

## 5. Required Semantic Theme Tokens

Core tokens:

- `--admin-bg`: app workspace background.
- `--admin-surface`: primary card, panel, table, and form surface.
- `--admin-surface-elevated`: subtle raised or secondary surface.
- `--admin-border`: standard dividers and control borders.
- `--admin-text`: primary readable text.
- `--admin-text-muted`: helper text, metadata, and secondary labels.

Sidebar tokens:

- `--admin-sidebar`: sidebar base.
- `--admin-sidebar-elevated`: sidebar raised blocks and selected containers.
- `--admin-sidebar-border`: sidebar dividers and outlines.
- `--admin-sidebar-text`: primary sidebar text.
- `--admin-sidebar-muted`: secondary sidebar labels and helper text.

Actions and accents:

- `--admin-primary`: primary actions and selected states.
- `--admin-primary-hover`: primary action hover state.
- `--admin-primary-soft`: soft primary backgrounds.
- `--admin-accent-cyan`: AI scan accents and focus highlights.
- `--admin-accent-violet`: optional analytics accent.

Status tokens:

- `--admin-success`: success, published, healthy.
- `--admin-warning`: warning, draft risk, needs review.
- `--admin-danger`: danger, failed, destructive, invalid.
- `--admin-info`: neutral system information.

Shape and effects:

- `--admin-radius-card`: card and large surface radius.
- `--admin-radius-control`: input, button, badge, and small control radius.
- `--admin-shadow-card`: restrained card elevation.
- `--admin-focus-ring`: accessible keyboard focus color.

## 6. Baseline Token Values

Recommended baseline values:

```css
--admin-bg: #F7FAFC;
--admin-surface: #FFFFFF;
--admin-surface-elevated: #F8FAFC;
--admin-border: #E2E8F0;
--admin-text: #0F172A;
--admin-text-muted: #64748B;

--admin-sidebar: #081220;
--admin-sidebar-elevated: #0B1A2E;
--admin-sidebar-border: #1E3350;
--admin-sidebar-text: #F8FAFC;
--admin-sidebar-muted: #94A3B8;

--admin-primary: #2563EB;
--admin-primary-hover: #1D4ED8;
--admin-primary-soft: #DBEAFE;
--admin-accent-cyan: #06B6D4;
--admin-accent-violet: #8B5CF6;

--admin-success: #10B981;
--admin-warning: #F59E0B;
--admin-danger: #EF4444;
--admin-info: #0EA5E9;

--admin-radius-card: 24px;
--admin-radius-control: 14px;
--admin-shadow-card: 0 18px 45px rgba(15, 23, 42, 0.08);
--admin-focus-ring: #06B6D4;
```

These are baseline tokens. Changing token values later must be a scoped token task. Do not change tokens casually in page or component tasks.

## 7. Component Usage Rules

- Components must use semantic Admin Web tokens for core surfaces, text, borders, and actions.
- Do not add raw hex values inside components.
- Do not add random Tailwind color classes for core surfaces or text.
- Do not invent a new component-local palette.
- New color needs must stop and be reported before implementation unless explicitly scoped.
- Raw hex values may exist only in token definitions or one-off SVG/gradient details when explicitly approved.
- Use Tailwind canonical syntax for CSS variable utilities, such as `bg-(--admin-bg)`, `text-(--admin-text)`, `border-(--admin-border)`, and `shadow-(--admin-shadow-card)`.

## 8. Forbidden Theme Work

- Do not implement dark mode.
- Do not add a theme toggle.
- Do not add `next-themes`.
- Do not use `prefers-color-scheme` for app-level theme switching.
- Do not use Public Web theme or colors as the base.
- Do not use a rose, pearl, or champagne base palette.
- Do not introduce neon-heavy, glassmorphism-heavy, or marketing palettes.
- Do not scatter raw hex colors through components.

## 9. Future Implementation Order

- This task is docs-only.
- Future code task should be: Admin Web Light Theme Token Cleanup v1.
- That future task may update `app/globals.css` and remove app-level dark-mode or `prefers-color-scheme` token behavior if present.
- UI component work must wait until token cleanup is accepted.
- Visual Spec Pack v2 should be based on approved reference crops and this theme contract.

## 10. Visual QA Requirements

- UI screenshot review should focus on light-only output.
- No dark mode screenshot is required.
- Check that output uses a dark navy sidebar.
- Check that output uses a light neutral workspace.
- Check that output uses blue/cyan accents.
- Check that output does not use the Public Web palette as the base.
- Check that output does not introduce random colors.
- Future UI tasks must report token compliance.
