# Fus

Universal development toolset plugin for Claude Code and Codex.

## Project Overview

Fus is a plugin that provides comprehensive skills for software development, covering the full development lifecycle from design to verification. Supports both Claude Code and Codex.

## Structure

```
fus/
├── .claude-plugin/           # Claude Code plugin metadata
├── .codex/                   # Codex installation guide
├── .copilot/                 # VSCode Copilot installation guide
├── agents/                   # Agent definitions (.agent.md for Copilot)
├── commands/                 # CLI commands
├── skills/                  # Skill definitions (28+ skills)
├── packages/
│   └── fus-cli/            # Plugin management CLI
└── docs/                    # Documentation
```

## Quick Install

### For Claude Code

[Claude Code Plugin](./.claude-plugin/)

### For Codex

```
Fetch and follow instructions from https://raw.githubusercontent.com/Genuineh/fus/refs/heads/main/.codex/INSTALL.md
```

### For VSCode Copilot

See [`.copilot/INSTALL.md`](.copilot/INSTALL.md) for installation.

```bash
# Quick install
mkdir -p .github/agents
cp agents/*.agent.md .github/agents/
```

## Quick Install for Codex

Tell Codex:

```
Fetch and follow instructions from https://raw.githubusercontent.com/Genuineh/fus/refs/heads/main/.codex/INSTALL.md
```

## Modules

- `@fus/plugin` - Claude Code plugin with agents and skills
- `@fus/cli` - Plugin management CLI tool

## Fus Plugin

Fus provides 28+ skills for full-stack development:

### Core Skills

| Skill | Description |
|-------|-------------|
| `fus-lead` | Task orchestration, workflow management |
| `fus-agents` | Agent reference guide |
| `plan` | Task planning |

### Domain Skills

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
claude --plugin-dir .
```

#### Option 2: Copy to Claude Code Plugins

```bash
# Copy plugin to Claude Code plugins directory
cp -r . ~/.claude/plugins/fus
```

### Use in Codex

See [`.codex/INSTALL.md`](.codex/INSTALL.md) for detailed installation instructions.

```bash
# Quick install
git clone https://github.com/Genuineh/fus.git ~/.codex/fus
mkdir -p ~/.agents/skills
ln -s ~/.codex/fus/skills ~/.agents/skills/fus
```

Then restart Codex to discover the skills.

### Using the Plugin

Once installed, you can interact with the plugin through natural language:

#### Use fus-lead Skill

```
I need to implement a new feature: user authentication system.
```

The fus-lead skill will:
1. Clarify requirements if needed
2. Help plan and decompose the task
3. Guide you through the appropriate workflow
4. Track progress

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
