# Example shadcn Component Add Prompt

## Tailwind/shadcn Skill Rules

Use the project-specific skill:

```text
skin-analyzer-admin-tailwind-shadcn-governor
```

Task: Admin Web shadcn Primitive Add vNext.

Scope:

- Work only in the Admin Web repo.
- Add only the explicitly approved component(s).
- Use npm-compatible `npx shadcn@latest add <component>` commands.
- Do not configure shadcn MCP unless the prompt explicitly approves it.
- Do not add product-specific UI to `components/ui`.
- Do not implement production UI unless explicitly scoped.

Required checks:

- Run startup git safety gate.
- Read `components.json`, `package.json`, `package-lock.json`, `components/ui`, and relevant governance docs.
- Confirm installed primitives before adding.

Report:

- Exact command(s).
- Generated/changed files.
- Dependency impact.
- Whether `components.json` changed.
- shadcn/ui outcome.
- Tailwind/token cleanup needed.
- Validation commands/results.
- Final git status.

Never use `git add .`; do not stage, commit, or push unless explicitly requested.
