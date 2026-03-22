---
name: commit
description: Create and execute a conventional commit with gitmoji. Use whenever the user wants to commit, mentions committing, staging changes, or asks to save/record work in git — even if they don't say "staged" explicitly.
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
5. Use an interactive question tool to ask for confirmation with three fixed choices: **Commit** / **Cancel** / **Edit message** — only run `git commit` if the user confirms