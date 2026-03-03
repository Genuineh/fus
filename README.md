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

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/fus.git

# Navigate to project
cd fus

# Install dependencies
pnpm install
```

### Use in Claude Code

#### Option 1: Use Plugin Directory

```bash
# Set plugin directory when starting Claude Code
claude --plugin-dir ./packages/fus-plugin
```

#### Option 2: Copy to Claude Code Plugins

```bash
# Copy plugin to Claude Code plugins directory
cp -r packages/fus-plugin ~/.claude/plugins/fus-plugin
```

### Using the Plugin

Once installed, you can interact with the plugin through natural language:

#### Invoke Leader Agent

```
I need to implement a new feature: user authentication system.
```

The Leader agent will:
1. Clarify requirements if needed
2. Dispatch Architect to design the feature
3. Coordinate Developer, Tester, Code-Reviewer, and Verifier
4. Report progress to you

#### Invoke Specific Agent

```
Use the architect agent to design a microservices architecture for the payment system.
```

```
Use the developer agent to implement the user login API endpoint.
```

```
Use the tester agent to write tests for the shopping cart functionality.
```

#### Use Skills Directly

```
Use skill: backend-api to design a REST API for the user resource.
```

```
Use skill: frontend-framework-nextjs to set up a Next.js project.
```

```
Use skill: docs-prds to write a PRD for the new payment feature.
```

```
Use skill: test-e2e to set up e2e testing with Playwright.
```

### Task Examples

#### New Feature Development

```
I want to add a new feature: real-time notifications.
```

→ Leader dispatches Architect → Developer → Tester → Code-Reviewer → Verifier

#### Bug Fix

```
Fix the login redirect bug where users are redirected to the wrong page.
```

→ Leader dispatches Developer → Tester → Code-Reviewer → Verifier

#### Architecture Change

```
Refactor the monolithic backend into microservices.
```

→ Leader dispatches Architect → Code-Reviewer → Developer → Tester → Verifier

#### Documentation

```
Write a user guide for the new dashboard feature.
```

→ Use docs-guide skill

#### Code Review

```
Review the recent changes to the authentication module.
```

→ Code-Reviewer analyzes code and provides feedback

## Available Commands

After plugin installation, you can use:

| Command | Description |
|---------|-------------|
| `/fus` | Open plugin menu |
| Natural language | Describe your task, Leader agent will coordinate |

## Building

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
