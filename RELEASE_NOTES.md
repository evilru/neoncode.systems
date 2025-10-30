# Release Notes

## v0.0.1-58

### Prelude

Initial setup of the VitePress documentation system with full automation
for versioning, release management, and deployment. This release
introduces a robust workflow for maintaining project documentation,
ensuring that version information is always up-to-date and that old
deployments are automatically cleaned up. The following notes detail the
features, implementation, and supporting infrastructure.

### New Features

- 

  Automated versioning using Taskfile.yml:

  :   - The Taskfile provides automatic version management, tagging,
        changelog, and release note generation for every build and
        release.

  Version display and linking in documentation:

  :   - index.md now shows the current version and provides a direct
        link to the version details in the footer.
      - version.md is prepared to explain the automatic versioning
        process for future reference.

  Continuous integration and deployment pipeline:

  :   - main.yml defines the GitHub Actions workflow for building,
        versioning, releasing, and deploying the documentation site.

  Automated housekeeping for deployments:

  :   - cf-housekeeping.yml cleans up old Cloudflare deployments,
        keeping only the most recent production and preview builds.

### Other Notes

- Documentation and automation are designed for easy future extension.
  See version.md for details on how versioning is automated and how the
  workflow can be adapted for new requirements.
