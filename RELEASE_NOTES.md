# Release Notes

## v0.3.0

### Prelude

This release introduces two WSPL-based prompt templates to proto.labs,
showcasing field-based prompt design principles in practice. Both
prompts are production-ready and serve as reference implementations of
the WSPL methodology, available for immediate use and experimentation.
The release includes enhanced navigation through dynamic sidebar
generation and clear calls-to-action for community participation.

### New Features

- Added Job To Be Done (JTBD) Interview Coach prompt -- a meta-prompt
  that guides users through adaptive JTBD interviews to generate custom
  prompts. Produces two artifacts: comprehensive job documentation and
  an optimized prompt tailored to specific requirements. Based on Bob
  Moesta\'s JTBD methodology with WSPL field-based design.
- Added Learning Zone Mode prompt -- an adaptive teaching assistant that
  maintains users in their optimal learning zone. Detects comfort,
  learning, and panic zones, adjusting teaching style accordingly to
  prevent skill atrophy while building understanding. Maps to
  Vygotsky\'s Zone of Proximal Development with constructionist learning
  principles.
- Implemented dynamic sidebar generation for proto.labs and prompt.forge
  sections using getSidebarItems() helper function, automatically
  discovering and displaying markdown files with proper title
  formatting.
- Added \"Share Your Experience\" and \"Need Something Custom?\"
  sections to prompt pages with clear calls-to-action linking to
  prompt.forge experiment and GitHub discussions.
- Enhanced proto.labs index with WSPL methodology explanation,
  dogfooding statement (\"I use only WSPL prompts now\"), and
  expectation management for custom prompt requests (\~1 per week).

### Other Notes

- Prompts are included via VitePress \@include directive from
  .github/prompts/ source files, maintaining single source of truth
  while displaying as copyable code blocks.
- Updated proto.labs philosophy to position it as personal experimental
  workshop with transparent, participatory, and iterative research
  approach.
- Added expectation management across prompt.forge indicating selected
  cases are worked on approximately weekly basis.

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
