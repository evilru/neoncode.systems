# Changelog

## [0.1.1] - 2025-11-05

### ⚙️ Miscellaneous Tasks

- 👷 Adapt filters to not show my release commits in the changelog
## [0.1.0] - 2025-11-05

### 🚀 Features

- 🎉 Scaffold new project
- ✨ Show version in footer and link changelog + release notes

### 🐛 Bug Fixes

- 👷 Move pnpm install action above node
- 👷 Add missing cache action key property
- 👷 Add pnpm install and docs:build steps

### 🚜 Refactor

- ⬇️ Downgrade vitepress to the latest stable version

### 📚 Documentation

- 📝 Add release notes for initial release

### 🎨 Styling

- 💄 Change hero text
- 💄 Add basic default theme
- 🎨 Add .editorconfig

### ⚙️ Miscellaneous Tasks

- 👷 Add gh build action
- 👷 Add deployment action
- 👷 Make deploy job dependent on build
- 👷 Add artifact handling
- 👷 Add deployment command to the wrangler action
- 👷 Set branch name for deployment
- 👷 Use branch gh variable name instead of env var name
- 👷 Try different var name for getting the branch name
- 👷 Use environments and deployments
- 👷 Add deployment url as env var
- 👷 Add permissions, add deployment url
- 👷 Add read permission
- 👷 Add cloudflare cleanup script
- 👷 Add rules to cloudflare cleanup script
- 👷 Remove not needed branch filters from the triggers
- 👷 Fix project and token var/secret names
- 🚧 Add debug outpout to the cleanup script
- 👷 Move debug code up
- 🚧 Remove per_page param
- 👷 Remove debug output from housekeeping script
- 👷 Add npm caching for the deployment job
- 👷 Can't use cache without package.json
- 👷 Raw output from jq, add debug info
- 👷 Refactor housekeeping logic
- 👷 Add cliff config + Taskfile + pandoc script
- 👷 Calc version only when not available
- 👷 Add push flag for tagging when merging into main branch
- 👷 Add changelog header
- 👷 Add note about github release notes
- 👷 Add build task switch based on branch
- 👷 Add git config user, email, remote and release step
- 👷 Add evilrubot as git user for pipeline commits
- 👷 Fix git origin with secrets
- 👷 Add .git suffix to the remote
- 👷 Give pipeline write permissions
- 👷 Set GH_TOKEN for gh release
- 👷 Try to find the right place to set the GH_TOKEN var
- 👷 Add GitVersion config and simplify gitversion call
- 👷 Set changelog header
- 👷 Fix formatting of the release notes
- 👷 Remove changes that shouldn't be commited
