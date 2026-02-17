# Release Notes

## v0.2.0

### Prelude

This release introduces the core content and structure for
neoncode.systems, establishing the experimental workshop concept with
two main sections: proto.labs for experimental projects and prompt.forge
for the prompt engineering experiment. The site now includes
comprehensive documentation, a discovery workflow for content
development, and enhanced SEO optimization.

### New Features

- Added proto.labs experimental workshop section introducing WSPL (my
  method for prompt design, developed through practice) with invitation
  for community participation through prompt.forge experiment.
- Added prompt.forge section documenting the Jobs-to-be-Done prompt
  generator experiment for testing WSPL methodology, including complete
  user journey (11 steps), community voting mechanism, and FAQ.
- Implemented discovery session workflow with three-stage folder
  structure (exploring/ready/implemented) for content concept
  development and documentation lifecycle management.
- Added VersionBadge Vue component displaying current version in
  navigation bar with link to version page, reading from
  VITE_APP_VERSION environment variable.
- Enhanced VitePress configuration with comprehensive SEO meta tags
  (Open Graph, Twitter Cards), local search provider, GitHub edit links,
  and custom footer with legal links.
- Configured separate site title for navigation (NC!) and browser title
  (NEONCODE!) using siteTitle in theme config.
- Added GitHub templates for prompt-forge repository including README
  structure, issue templates for job submission, and participation
  guidelines.
- Implemented GDPR-compliant privacy policy with Cloudflare-specific
  details (hosting, analytics, DDoS protection, security cookies).
- Added imprint page with legal contact information and regulatory
  compliance details.
- Configured AI agent instructions for content development workflow and
  conventional commit message generation.
- Added comprehensive README.md documenting project structure, tech
  stack, development workflow, and complete setup guide including
  semantic versioning automation, changelog generation, release notes
  management, and CI/CD pipeline with GitHub Releases and environment
  deployments.

### Bug Fixes

- Fixed Cloudflare Pages housekeeping workflow to use correct API query
  parameter \'env\' instead of \'environment\' for deployment filtering.
- Added comment about force=true parameter for deployment deletion API
  calls to handle aliased production deployments correctly.

### Other Notes

- Excluded discovery folder from VitePress source processing to keep
  work-in-progress content private.
- Added social links for GitHub repository and LinkedIn profile.
- Configured sidebar navigation structure for proto.labs and
  prompt.forge sections with overview pages.

## v0.1.0

### Prelude

Initial setup of the VitePress documentation system with full automation
for versioning, release management, and deployment. This release
introduces a robust workflow for maintaining project documentation,
ensuring that version information is always up-to-date and that old
deployments are automatically cleaned up. The following notes detail the
features, implementation, and supporting infrastructure.

### New Features

- Automated versioning using Taskfile.yml:
  - The Taskfile provides automatic version management, tagging,
    changelog, and release note generation for every build and release.
- Version display and linking in documentation:
  - index.md now shows the current version and provides a direct link to
    the version details in the footer.
  - version.md is prepared to explain the automatic versioning process
    for future reference.
- Continuous integration and deployment pipeline:
  - main.yml defines the GitHub Actions workflow for building,
    versioning, releasing, and deploying the documentation site.
- Automated housekeeping for deployments:
  - cf-housekeeping.yml cleans up old Cloudflare deployments, keeping
    only the most recent production and preview builds.

### Other Notes

- Documentation and automation are designed for easy future extension.
  See version.md for details on how versioning is automated and how the
  workflow can be adapted for new requirements.
