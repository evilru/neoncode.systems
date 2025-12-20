# neoncode.systems

Portfolio website. Built with VitePress. Automated everything. Public because transparency tools should be transparent.

**🌐 Live:** [neoncode.systems](https://neoncode.systems)

---

## Features

- **Semantic Versioning** - Automated via GitVersion based on git history
- **Changelog** - Auto-generated from conventional commits via git-cliff
- **Release Notes** - Structured release documentation via reno
- **Task Runner** - Streamlined workflows with Taskfile
- **CI/CD** - Automated build, version, and deploy pipeline
- **Environment Management** - Separate preview and production deployments
- **Automated Housekeeping** - Deployment cleanup and management

## Tech Stack

- **[VitePress](https://vitepress.dev/)** - Vue-powered static site generator
- **[Taskfile](https://taskfile.dev/)** - Modern task runner for project automation
- **[GitVersion](https://gitversion.net/)** - Semantic versioning from git history (Docker-based)
- **[git-cliff](https://git-cliff.org/)** - Changelog generator from conventional commits
- **[reno](https://docs.openstack.org/reno/)** - Release notes management
- **[pandoc](https://pandoc.org/)** - Document conversion for release notes
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Modern hosting and CDN
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automation
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- **Node.js** 22+
- **pnpm** 10+
- **Task** ([installation](https://taskfile.dev/installation/))
- **Docker** (for GitVersion)
- **Python** with pip (for reno and git-cliff)
- **pandoc** ([installation](https://pandoc.org/installing.html))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/neoncode.systems.git
cd neoncode.systems

# Install dependencies
pnpm install

# Install Python tools
pip install reno git-cliff

# Start development server
task dev
```

### Development

```bash
task dev       # Start dev server at http://localhost:5173
task preview   # Preview production build
task build     # Build with changelog and release notes
task release   # Full release (use PUSH=true to push to remote)
```

## How It Works

### Semantic Versioning

Version numbers are calculated automatically using **GitVersion** based on git history and conventional commits. The version follows the TrunkBased workflow pattern:

- Feature branches: `0.x.0-branch.n`
- Main branch: `0.x.0`

Version is exposed via `VITE_APP_VERSION` environment variable and accessible in components through `import.meta.env.VITE_APP_VERSION`.

### Changelog Generation

**git-cliff** generates `CHANGELOG.md` from conventional commit messages:

```bash
# Commit format
type(scope): description

# Types: feat, fix, docs, style, refactor, test, chore
```

The changelog is automatically generated during build and includes all commits categorized by type.

### Release Notes

**reno** manages structured release notes stored in `releasenotes/notes/*.yaml`. Each note can contain:

- `prelude` - Introduction and overview
- `features` - New features and capabilities
- `fixes` - Bug fixes and corrections
- `other` - Additional notes

Release notes are converted from RST to Markdown via pandoc with custom filters.

### CI/CD Pipeline

**Build Process:**

1. **GitVersion** calculates semantic version from git history
2. Temporary git tag created (`v{VERSION}`)
3. **git-cliff** generates changelog
4. **reno** generates release notes (converted via pandoc)
5. Temporary tag removed
6. **VitePress** builds static site with version injected
7. Artifacts uploaded for deployment

**Deployment Flow:**

- **Push to any branch** → Build + Preview deployment
- **Push to main** → Build + Version bump + Tag + Production deployment + [GitHub Release](https://github.com/evilru/neoncode.systems/releases/)

**Environments:**

- [`preview`](https://github.com/evilru/neoncode.systems/deployments/preview) - Feature branches and non-main branches
- [`production`](https://github.com/evilru/neoncode.systems/deployments/production) - Main branch only

### Automated Housekeeping

A separate workflow manages Cloudflare deployment cleanup, maintaining organization and preventing deployment sprawl.

---

**Martin Haberfellner** | Organizational Systems Engineer

Human 🤝 AI collaboration

