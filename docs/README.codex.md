# Fus for Codex

This document provides detailed instructions for installing and using Fus skills in Codex.

## Installation

### Option 1: Quick Install (Recommended)

Tell Codex:

```
Fetch and follow instructions from https://raw.githubusercontent.com/Genuineh/fus/refs/heads/main/.codex/INSTALL.md
```

### Option 2: Manual Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Genuineh/fus.git ~/.codex/fus
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/fus/skills ~/.agents/skills/fus
   ```

3. **Restart Codex** to discover the skills.

## Verification

After installation, verify by asking Codex:

```
What skills do you have available?
```

You should see fus skills listed:
- `fus-lead` - Task orchestration
- `fus-agents` - Agent reference
- `plan` - Task planning
- `docs-*` - Documentation skills
- `backend-*` - Backend skills
- `frontend-*` - Frontend skills
- `test-*` - Testing skills

## Usage

### Direct Skill Invocation

```
Use skill: fus-lead to help me implement a new feature
```

```
Use skill: backend-api to design a REST API
```

```
Use skill: docs-prds to write a PRD for the payment system
```

### Natural Language

Codex will automatically discover and use relevant skills when you describe your task:

```
I need to build a user authentication system with React and Node.js
```

## Available Skills

### Core Skills

| Skill | Description |
|-------|-------------|
| `fus-lead` | Task orchestration, workflow management |
| `fus-agents` | Agent reference guide |
| `plan` | Task planning, decomposition |

### Documentation Skills

| Skill | Description |
|-------|-------------|
| `docs-general` | Repository documentation management |
| `docs-todo` | TODO document management |
| `docs-prds` | Product requirement documents |
| `docs-specs` | Technical specifications |
| `docs-guide` | User guides and tutorials |
| `docs-adr` | Architecture decision records |

### Backend Skills

| Skill | Description |
|-------|-------------|
| `backend-principles` | Backend fundamentals |
| `backend-database` | Database design |
| `backend-microservices` | Microservices architecture |
| `backend-queue` | Message queues |
| `backend-api` | API design |
| `backend-cache` | Caching strategies |
| `backend-rust` | Rust + Axum development |

### Frontend Skills

| Skill | Description |
|-------|-------------|
| `frontend-general-principles` | Frontend fundamentals |
| `frontend-tauri-native` | Tauri desktop development |
| `frontend-framework-nextjs` | Next.js development |
| `frontend-state-management` | State management |
| `frontend-styling-twind` | Tailwind CSS |
| `frontend-api-integration` | API integration |
| `frontend-design` | UI/UX design |

### Testing Skills

| Skill | Description |
|-------|-------------|
| `test-frontend-unit` | Unit testing |
| `test-e2e` | End-to-end testing |

### Project Skills

| Skill | Description |
|-------|-------------|
| `project-rust` | Rust project management |

### Product Skills

| Skill | Description |
|-------|-------------|
| `product-principles` | Product principles |
| `product-ux` | UX design |

## Updating

To update Fus:

```bash
cd ~/.codex/fus && git pull
```

Skills will be updated instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/fus
rm -rf ~/.codex/fus
```

## Troubleshooting

### Skills not appearing

1. Verify symlink exists: `ls -la ~/.agents/skills/fus`
2. Restart Codex completely (quit and relaunch)
3. Try: `ls ~/.agents/skills/` to list all available skills

### Permission issues

If you encounter permission errors, check:
- `~/.agents/skills/` directory exists and is writable
- Symlink was created correctly

## Example Workflows

### New Feature Development

1. Use `fus-lead` to plan the task
2. Use `docs-prds` to write requirements
3. Use `backend-api` / `frontend-framework-nextjs` for implementation
4. Use `test-frontend-unit` / `test-e2e` for testing

### Bug Fix

1. Use `fus-lead` to analyze the issue
2. Identify relevant domain skill
3. Fix and test
4. Use `test-*` skills for verification

## Support

For issues or questions:
- GitHub: https://github.com/Genuineh/fus
