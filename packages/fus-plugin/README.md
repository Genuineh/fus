# Fus Plugin

Fus - Claude Code universal development toolset plugin.

## Overview

This plugin provides a comprehensive agent system and skills for software development, covering the full development lifecycle from design to verification.

## Structure

```
fus-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata
├── agents/                  # Agent definitions
│   ├── leader.md           # Task orchestration
│   ├── architect.md        # Architecture analysis
│   ├── developer.md        # Code implementation
│   ├── code-reviewer.md    # Code review
│   ├── tester.md           # Testing
│   └── verifier.md         # Quality verification
├── commands/               # CLI commands
│   └── fus.md             # Main command
└── skills/                 # Skill definitions
    ├── skill-overview/     # Skills overview
    ├── agents/             # Agent reference
    ├── plan/               # Task planning
    ├── docs-*/             # Documentation skills
    ├── backend-*/          # Backend skills
    ├── frontend-*/         # Frontend skills
    ├── project-*/          # Project management
    ├── test-*/             # Testing skills
    └── product-*/          # Product design skills
```

## Usage

### Development Testing

```bash
claude --plugin-dir ./packages/fus-plugin
```

### Installation

Copy or link `packages/fus-plugin` to your project's `.claude/` directory.

## Agents

| Agent | Description |
|-------|-------------|
| `leader` | Task orchestration, workflow management, agent dispatch |
| `architect` | Architecture analysis, technical decisions |
| `developer` | Code implementation based on designs |
| `code-reviewer` | Code quality and security review |
| `tester` | Test writing and coverage |
| `verifier` | Quality verification, completion checks |

## Skills

### Documentation Skills (docs-*)

| Skill | Description |
|-------|-------------|
| `docs-general` | Repository documentation management |
| `docs-todo` | TODO document management |
| `docs-prds` | Product requirements documents |
| `docs-specs` | Technical specifications |
| `docs-guide` | User guides and tutorials |
| `docs-adr` | Architecture decision records |

### Backend Skills (backend-*)

| Skill | Description |
|-------|-------------|
| `backend-principles` | Backend fundamentals |
| `backend-database` | Database design and selection |
| `backend-microservices` | Microservices architecture |
| `backend-queue` | Message queue patterns |
| `backend-api` | API design |
| `backend-cache` | Caching strategies |
| `backend-rust` | Rust + Axum development |

### Frontend Skills (frontend-*)

| Skill | Description |
|-------|-------------|
| `frontend-general-principles` | Frontend fundamentals |
| `frontend-tauri-native` | Tauri 2.0 desktop development |
| `frontend-framework-nextjs` | Next.js development |
| `frontend-state-management` | State management (Zustand) |
| `frontend-styling-twind` | Tailwind/Twind styling |
| `frontend-api-integration` | API integration (React Query) |
| `frontend-design` | UI/UX design excellence |

### Testing Skills (test-*)

| Skill | Description |
|-------|-------------|
| `test-frontend-unit` | Frontend unit testing (Vitest) |
| `test-e2e` | End-to-end testing (Playwright/Cypress) |

### Project Management Skills (project-*)

| Skill | Description |
|-------|-------------|
| `project-rust` | Rust project management |

### Task & Agent Skills

| Skill | Description |
|-------|-------------|
| `skill-overview` | Skills overview and quick reference |
| `agents` | Agent reference manual |
| `plan` | Task planning and decomposition |

### Product Skills (product-*)

| Skill | Description |
|-------|-------------|
| `product-principles` | Product design philosophy |
| `product-ux` | UX design and interaction patterns |

## Workflow

The agent team follows these workflows:

```
New Feature: Design → Develop → Test → Review → Verify
Bug Fix: Analyze → Develop → Test → Review → Verify
Architecture Change: Design → Review → Develop → Test → Verify
Documentation: Create/Update → Review → Verify
```

## Development

```bash
# Check structure
ls -la packages/fus-plugin/

# List all skills
ls packages/fus-plugin/skills/

# List all agents
ls packages/fus-plugin/agents/
```

## License

MIT
