# Changelog

## [0.3.1] - 2026-02-19

### 🐛 Bug Fixes

- 🐛 Correct minor wording issues in release notes for JTBD and Learning Zone Mode prompts
- 🐛 Update tagline and feature descriptions for clarity and engagement
- 🐛 Clarify prompt design method description in prompt.forge
- 🐛 Update introduction and method description for clarity in proto.labs
- 🐛 Improve clarity in Job To Be Done prompt description
- 🐛 Revise description for Learning Zone Mode to enhance clarity and engagement
- 🐛 Update prompt descriptions for clarity and consistency
- 🐛 Correct prompt link description for consistency

### 📚 Documentation

- :memo: Add Release Notes
## [0.3.0] - 2026-02-17

### 🚀 Features

- ✨ Add Job To Be Done and Learning Zone Mode prompts with dynamic sidebar generation
## [0.2.2] - 2026-02-17

### 📚 Documentation

- 📝 Add anchor for WSPL
## [0.2.1] - 2026-02-17

### 📚 Documentation

- 📝 Remove AI notice from readme footer
## [0.2.0] - 2026-02-17

### 🚀 Features

- ✨ Add privacy section including imprint and privacy policy
- ✨ Add github and linked social links
- ✨ Add AI agent instructions and VSCode settings for commit message generation
- ✨ Add discovery sessions section for content exploration and documentation
- ✨ Enhance prompt.forge and proto.labs documentation with detailed experiment descriptions and participation guidelines
- ✨ Add discovery session workflow
- ✨ Revise privacy policy for clarity and compliance with GDPR
- ✨ Update VitePress configuration with footer and sidebar structure
- ✨ Enhance VitePress configuration with meta tags, search provider, and edit link
- ✨ Exclude discovery folder from source processing in VitePress configuration
- ✨ Add VersionBadge component and integrate version display in layout
- ✨ Enable external link icon in theme configuration
- ✨ Add site title to theme configuration
- ✨ Update prompt.forge, protolabs and relnotes  for WSPL methodology and prompt engineering experiment

### 🐛 Bug Fixes

- 🐛 Correct API query parameter from 'environment' to 'env' in Cloudflare housekeeping workflow

### 🚜 Refactor

- 💬 Update text shown on homepage to reflect the vision

### 📚 Documentation

- 📝 Add release notes for proto.labs, prompt.forge and the version badge
- 📝 Add SiteTitle and title config to the releasenotes
- 📝 Add Readme
- 📝 Add Readme to Release Notes
- 📝 Update link to the jobs to be done prompt
- 📝 Remove AI notice from footer and relnote, update to current year

### ⚙️ Miscellaneous Tasks

- 📝 Add proto.labs, prompt.forge and license
- 📝 Simplify conventional commits section in copilot instructions
- 👷 Add comment to clarify force deletion option in Cloudflare housekeeping workflow
- 🚚 Move legal documents and update navigation for improved accessibility
- 📝 Remove redundant formatting and clean up markdown in prompt.forge and proto.labs overview
- 📝 Update .gitignore to include discovery
- 💚 Append force=true for deleting preview deployments
- 👷 Allow 50 preview deployments instead of 20 to keep older branches available
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
