# AI Agent Instructions for neoncode.systems

## Project Overview
This is a **portfolio website** built with VitePress, showcasing the work of Martin Haberfellner (Organizational Systems Engineer). The site features two main content areas:
- `//proto.labs` - experiments & proof-of-concepts
- `//prompt.forge` - AI-powered tools and prompts

**Language**: All content on the website must be in **English**.

The site uses a sophisticated **automated versioning and release workflow** that's critical to understand before making changes.

## Package Management
- **Always use `pnpm`** - never npm or yarn
- Installation: `pnpm install`
- The project uses pnpm v10+ (configured in CI)

## Development Workflow

### Daily Development
```bash
task dev          # Start dev server (pnpm run docs:dev)
task preview      # Preview production build
```

### Building & Releasing
The project has **two distinct build modes**:
- `task build` - Creates a build with changelog/release notes using temporary git tags
- `task release` - Full release: builds, versions, commits, and optionally pushes (use `PUSH=true`)

**Critical**: The build process uses GitVersion via Docker to calculate semantic versions based on git history. Version is exposed as `VITE_APP_VERSION` environment variable and accessible in components via `import.meta.env.VITE_APP_VERSION`.

### Release Automation Chain
When running `task build` or `task release`, the following happens in order:
1. **GitVersion** calculates semantic version from git history (TrunkBased workflow)
2. **Temporary tag** created (`v{VERSION}`) for changelog tools
3. **git-cliff** generates `CHANGELOG.md` from conventional commits
4. **reno** generates `RELEASE_NOTES.md` from YAML release notes (in `releasenotes/notes/`)
5. Temporary tag removed
6. Site built with version injected
7. (release only) Version bumped, committed, tagged, and optionally pushed

## Conventional Commits & Changelog
The project uses **conventional commits** with git-cliff for changelog generation.

## Release Notes (reno)
For significant changes, create structured release notes in `releasenotes/notes/*.yaml` with structure: `prelude`, `features`, `fixes`, `other`.

## Discovery Sessions
Discovery sessions are used to explore and document content concepts, features, and experiments before implementation. Discovery documents are stored in the `discovery/` folder and serve as:
- Context documentation for AI agents
- Content concepts for website sections
- Requirements and design decisions
- Reference for future implementation

When conducting discovery sessions, store the final consolidated document in `discovery/` with a descriptive name.

## When Making Changes
1. Use conventional commit messages for meaningful changelog entries
2. For features/breaking changes, consider adding a reno release note
3. Test builds locally with `task build` before pushing
4. On main branch, commits trigger automatic releases - be deliberate
5. Preview deployments are automatic for all branches
