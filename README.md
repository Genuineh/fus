# Fus

Universal development toolset plugin for Claude Code.

## Project Overview

Fus is a Claude Code plugin that provides a comprehensive agent system and skills for software development, covering the full development lifecycle from design to verification.

## Structure

```
fus/
├── packages/
│   ├── fus-plugin/          # Claude Code plugin
│   │   ├── agents/          # Agent definitions
│   │   ├── commands/        # CLI commands
│   │   └── skills/          # Skill definitions
│   └── fus-cli/             # Plugin management CLI
└── docs/                    # Documentation
```

## Modules

- `@fus/plugin` - Claude Code plugin with agents and skills
- `@fus/cli` - Plugin management CLI tool

## Fus Plugin

The plugin provides 6 specialized agents and 28 skills:

### Agents

| Agent | Description |
|-------|-------------|
| `leader` | Task orchestration, workflow management |
| `architect` | Architecture analysis, technical decisions |
| `developer` | Code implementation |
| `code-reviewer` | Code quality and security review |
| `tester` | Test writing and coverage |
| `verifier` | Quality verification |

### Skills

- **Documentation (docs-*)**: docs-general, docs-todo, docs-prds, docs-specs, docs-guide, docs-adr
- **Backend (backend-*)**: backend-principles, backend-database, backend-microservices, backend-queue, backend-api, backend-cache, backend-rust
- **Frontend (frontend-*)**: frontend-general-principles, frontend-tauri-native, frontend-framework-nextjs, frontend-state-management, frontend-styling-twind, frontend-api-integration, frontend-design
- **Testing (test-*)**: test-frontend-unit, test-e2e
- **Project (project-*)**: project-rust
- **Product (product-*)**: product-principles, product-ux

## Fus CLI

Fus CLI is used to manage Claude Code plugins.

```bash
# Interactive menu
cd packages/fus-cli && node dist/index.js

# Command line
cd packages/fus-cli && node dist/index.js list
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all modules
pnpm build

# Run tests
pnpm test
```

## Workflow

The agent team follows these workflows:

```
New Feature: Design → Develop → Test → Review → Verify
Bug Fix: Analyze → Develop → Test → Review → Verify
Architecture Change: Design → Review → Develop → Test → Verify
Documentation: Create/Update → Review → Verify
```

## Documentation

- [docs/TODO.md](docs/TODO.md) - Current priorities
- [docs/prds/](docs/prds/) - Plans and designs
- [docs/specs/](docs/specs/) - Technical specifications
- [docs/guide/](docs/guide/) - Usage guides

## License

MIT
