# Example UI Task Prompt

## Tailwind/shadcn Skill Rules

Use the project-specific skill:

```text
skin-analyzer-admin-tailwind-shadcn-governor
```

Task: Admin Web Flux Sky Typography Rhythm Polish v1.

Scope:

- Work only in `/Users/sompong/Dev/Project skin analyzer/skin-analyzer-ux-ui/skin-analyzer-admin-web`.
- Keep the task small and reviewable.
- Do not add shadcn/ui components.
- Do not change auth/API/backend behavior.
- Do not update current-state docs unless explicitly scoped as docs sync.

Required before implementation:

- Run startup git safety gate.
- Read `AGENTS.md`, current UI state, theme token contract, brand visual direction, UX/UI contract, visual QA contract, and live dashboard/layout files.
- Check existing `components/ui` usage and Tailwind tokens.

Implementation target:

- Tighten dashboard typography roles without changing product meaning.
- Preserve Flux Sky light/neutral sidebar and sky action states.
- Use Admin Web semantic tokens.
- Avoid arbitrary typography scatter.

Evidence:

- Capture required viewports outside the repo.
- Report shadcn/ui outcome, Tailwind/token outcome, Documentation Impact Candidate, screenshot path, and final git status.
