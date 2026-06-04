# Tailwind Rules

## Source Of Truth

- Treat the project Tailwind v4/latest setup as the source of truth.
- Check `package.json`, `package-lock.json`, `components.json`, `postcss.config.mjs`, `app/globals.css`, and any `tailwind.config.*` files if present.
- This repo currently uses Tailwind CSS 4.3 and CSS variables from `app/globals.css`.

## Tailwind v4 / Token Mindset

- Tailwind v4 official docs use theme variables and CSS variables as first-class design-token inputs.
- In this repo, prefer Admin Web semantic CSS variables before raw utility color classes.
- Use Tailwind utilities for layout, spacing, grid/flex, responsive variants, focus/hover states, and composition.
- Use semantic tokens for repeated visual roles: sidebar surfaces, topbar surfaces, borders, text, action, selected, dropdown, command, notification, status, radius, and focus rings.
- If a repeated role is missing, stop and report the missing token decision instead of scattering arbitrary values.

## Color Rules

- Use Admin Web semantic token utilities such as `bg-(--admin-bg)`, `text-(--admin-text)`, `border-(--admin-border)`, and `shadow-(--admin-shadow-card)`.
- Use shadcn/Tailwind sky semantics for Flux Sky action/event roles through Admin Web tokens.
- Do not use old Tailwind blue or UI Colors blue for new Flux Sky action states.
- Do not use Flux purple/violet directly.
- Do not replace success, warning, danger, disabled, forbidden, or destructive states with sky.
- Do not add raw hex colors in product components unless explicitly scoped as a one-off SVG/visual detail.

## Typography Rules

- Define typography roles before broad class changes.
- Keep admin typography compact, readable, and work-focused.
- Avoid marketing-scale display type in panels, topbars, sidebars, dashboards, tables, and forms.
- Use stable text roles for page titles, section headers, card titles, body copy, labels, metadata, badges, and counters.
- Avoid scattering one-off font sizes or line heights across product components without a role decision.

## Motion Rules

- Define duration, easing, and affected properties before modifying components.
- Prefer subtle transitions for color, background, border, opacity, and small transforms.
- Avoid broad `transition-all` unless the task intentionally covers all changing properties.
- Use `motion-reduce` or equivalent reduced-motion safety where practical, especially for transform-heavy transitions.
- Do not add decorative animation unless explicitly approved.

## Responsive Rules

- Use Tailwind responsive variants for layout changes.
- Keep the required viewport set in mind: 1440x900, 1280x800, 1024x768, 768x1024, and 390x844.
- Avoid horizontal overflow, clipped text, squeezed desktop tables on mobile, and hidden primary actions.
- Keep touch targets usable on mobile.

## Official Docs Checked For This Draft

- Tailwind installation docs showed v4.3 and `@import "tailwindcss"`.
- Tailwind theme docs describe `@theme` and default theme variables driving utilities.
- Tailwind typography docs show font-size utilities with line-height variants and responsive prefixes.
- Tailwind transition docs cover transition property, duration, and easing utilities.
- Tailwind state docs cover hover/focus variants and related state selectors.
