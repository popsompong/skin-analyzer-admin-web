# Typography And Motion Rules

## Typography Rhythm

Current triage found these improvement targets:

- Page H1 and dashboard hero H2 can compete at similar size.
- Mobile first fold can spend too much space on title, description, badges, and hero copy before operational metrics.
- Sidebar/topbar labels are readable but can be tightened carefully.
- Dashboard numbers are clear, but useful metric content should appear earlier on small viewports.

Future typography polish should:

- Define roles before class edits: page title, hero title, panel title, card title, label, metadata, badge, counter, body copy.
- Preserve admin readability and density.
- Reduce mobile title/copy dominance without harming clarity.
- Avoid marketing display type.
- Avoid broad font-size scatter.

Recommended next typography task:

`Admin Web Flux Sky Typography Rhythm Polish v1`

## Motion / Interaction

Current triage found:

- Many interactions use color-only 150ms transitions.
- Command, notification, and profile panels mount/unmount with limited smoothing.
- Collapsible group content is functional but can feel abrupt.
- Dashboard cards and quick actions have limited hover/pressed feedback.

Future motion polish should:

- Define a small motion contract before editing components.
- Use sidebar hover/active motion around 120-180ms ease-out.
- Use group collapse/expand around 160-220ms with no layout jump.
- Use command/dropdown fade plus subtle translate or scale around 140-200ms.
- Add pressed feedback and small icon movement only where it clarifies action.
- Respect reduced-motion by disabling transform-heavy motion while preserving state contrast.
- Keep motion subtle, consistent, and non-decorative.

Recommended first motion task:

`Admin Web Flux Sky Motion Interaction Polish v1`
