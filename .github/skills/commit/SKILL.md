---
name: commit
description: 'Create and commit a conventional commit message. Use when files are staged and ready to commit, or when formatting a git commit with type, scope, subject, body, and ticket reference.'
argument-hint: 'optional scope or ticket override'
---

# Create Conventional Commit

## Format

```
type(scope): ✨ subject

body
```

- Gitmoji is **mandatory** — real emoji after `type(scope): `, not `:name:` syntax
- Pick the **most specific** one from [gitmoji reference](./references/gitmoji.md)
- Scope is optional
- Body is **mandatory** — summarize what changed and why

## Steps

1. Run `git status --porcelain --branch`, `git --no-pager diff --name-status --staged`, `git --no-pager diff --staged`
2. Flag unstaged changes that touch staged files — ask before proceeding if staging looks wrong
3. Infer type, scope, and gitmoji — ask only if type is genuinely ambiguous
4. Show the full message in a code block
5. Ask for confirmation with three fixed choices: **Commit** / **Cancel** / **Edit message** (no freeform input) — only run `git commit` if the user confirms