# Admin Web Brand and Visual Direction Addendum v1

This document locks the brand and visual direction for `skin-analyzer-admin-web` before future UI implementation.

## 1. Purpose

Use this document to prevent future Admin Web work from drifting into the Public Web theme, a generic SaaS look, or an unapproved palette. Future UI tasks must treat this as the brand and visual source of truth alongside the UX/UI contract.

## 2. Product Surface Separation

- Admin Web is a separate product surface from Public Web.
- Admin Web must not copy or inherit the Public Web theme or color direction.
- Admin Web must not use the Public Web rose, pearl, or champagne beauty palette as the base.
- Public Web may be beauty-tech and emotional; Admin Web must be a modern internal AI skin-analysis admin and content studio.
- Public brand colors may appear only as tiny supporting accents if explicitly approved, not as the Admin Web system palette.

## 3. Visual Direction

Target direction:

```text
Modern AI Skin Analysis Admin 2026
```

The UI should feel:

- Modern.
- Professional.
- Premium.
- AI-assisted.
- Skin-analysis focused.
- Content-studio friendly.
- Calm for long work sessions.
- Precise and trustworthy.

The UI must not feel:

- Public marketing page.
- Beauty landing page.
- Generic SaaS cube dashboard.
- Neon gaming interface.
- Heavy glassmorphism interface.
- Rose-heavy public theme.

## 4. Approved Visual Reference

The user approved the latest dark-navy, blue/cyan admin dashboard mockup as the visual direction.

This is a direction reference, not a pixel-perfect target. Use it to guide:

- Sidebar style.
- Topbar density.
- Card rhythm.
- Login panel tone.
- Dashboard surface layering.
- Responsive behavior.
- Brand mark placement.

Do not copy random visual details blindly. Do not invent a new style if the approved direction is already established.

## 5. Admin Color System Direction

Base palette direction:

- Deep navy sidebar or near-black blue.
- Soft neutral app background.
- White/off-white or dark-elevated cards depending on theme.
- Subtle cool borders.
- Readable slate or white text depending on mode.

Accent palette direction:

- Primary blue.
- Cyan for scan and AI accents.
- Optional violet for analytics accent.
- Emerald success.
- Amber warning.
- Red danger.

Forbidden palette direction:

- Public Web rose, pearl, or champagne as the admin base.
- Heavy pink UI.
- Random arbitrary colors.
- Neon-heavy palettes.
- Gradient-heavy backgrounds.

## 6. Brand Mark and Logo Direction

Preferred direction:

```text
Logo B: Semi-realistic App Icon Style
```

Required meaning:

- Front-facing face.
- Face scan.
- AI skin analysis.
- Scan brackets.
- AI mesh or node pattern.
- Skin analysis overlay or dots on forehead, cheeks, and T-zone.
- Blue/cyan tech accent.
- Readable on dark navy sidebar and light surfaces.

Forbidden logo direction:

- Generic cube.
- Generic hexagon SaaS mark.
- Crypto-like geometric mark.
- Side-profile face that looks like generic Face ID only.
- Rose-heavy beauty icon.
- Overly realistic portrait that fails at small sizes.
- Detailed image that becomes unreadable at 24px or 32px.

Usage rules:

- For MVP, actual brand asset implementation must be a separate task.
- Future implementation should support sidebar mark, favicon, app icon, login panel mark, and light/dark variants.
- Logo must remain readable at 24px, 32px, 48px, and 192px.

## 7. Responsive Visual Direction

Desktop:

- Full sidebar.
- Full topbar.
- Dense dashboard and list layout.

Tablet:

- Compact sidebar or rail.
- Reduced columns.
- Actions can collapse into menus.

Mobile:

- Topbar plus drawer menu.
- Stacked cards.
- Limited editor mode.
- No forced desktop table or editor squeezed into mobile.

## 8. Future UI Task Requirements

Every future UI prompt must include:

- Follow Admin Web Brand and Visual Direction Addendum v1.
- Do not invent a new palette.
- Do not use Public Web theme or colors as the Admin Web base.
- Do not redesign freely.
- Do not change brand or logo direction without explicit approval.
- Use the approved mockup as visual direction only.
- Generate screenshot evidence outside the repo.
- No screenshots means `PASS_WITH_NOTES` at best for UI implementation tasks.

## 9. Gatekeeper Review Criteria

A UI task should not pass if:

- It uses the Public Web visual theme as the base.
- It introduces a new palette without approval.
- It uses generic cube or hex branding.
- It makes Admin Web look like a marketing landing page.
- It ignores responsive behavior.
- It does not provide screenshot evidence for UI changes.
