---
name: skill-overview
description: Skills Overview Guide. Provides a quick reference to all available skills for backend, frontend, and documentation tasks. Use when starting a task to find relevant skills.
version: 1.0.0
---

# Skill Overview

Quick reference guide for all available skills. Use this to find the right skill for your task.

---

## Available Skills

### Documentation Skills (docs-*)

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `docs-general` | Repository documentation manager | Managing docs structure, archiving, hygiene |
| `docs-todo` | TODO document management | Creating/updating TODO.md for task tracking |
| `docs-prds` | PRD writing | Creating product requirement documents |
| `docs-specs` | Technical spec writing | Creating technical specifications |
| `docs-guide` | User guide writing | Creating user guides and tutorials |
| `docs-adr` | ADR writing | Documenting architecture decisions |

### Backend Skills (backend-*)

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `backend-principles` | Backend fundamentals | Async, microservices, cloud-native, observability |
| `backend-database` | Database design | Choosing databases, schema design, migrations |
| `backend-microservices` | Microservices architecture | Service communication, patterns |
| `backend-queue` | Message queues | Choosing message queues, patterns |
| `backend-api` | API design | REST, GraphQL, gRPC design |
| `backend-cache` | Caching strategies | Redis, caching patterns |
| `backend-rust` | Rust + Axum | Rust backend development |

### Frontend Skills (frontend-*)

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `frontend-general-principles` | Frontend fundamentals | General frontend principles |
| `frontend-tauri-native` | Tauri development | Desktop apps with Tauri |
| `frontend-framework-nextjs` | Next.js development | React framework with SSR/SSG |
| `frontend-state-management` | State management | Zustand, state patterns |
| `frontend-styling-twind` | Twind/Tailwind | CSS styling with utility classes |
| `frontend-api-integration` | API integration | React Query, type-safe requests |
| `frontend-design` | Design excellence | UI/UX design, aesthetics |

### Testing Skills (test-*)

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `test-frontend-unit` | Frontend unit testing | Vitest, Jest, React Testing Library |
| `test-e2e` | End-to-end testing | Playwright, Cypress, e2e test setup |

### Project Management Skills (project-*)

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `project-rust` | Rust project management | Rust projects, workspaces, Cargo |

### Task & Agent Skills

| Skill | Description | When to Use |
|-------|-------------|-------------|
| `plan` | Task planning | Decomposing tasks, planning |
| `agents` | Agent reference | Understanding available agents |

---

## Quick Decision Guide

### Need Documentation?

- **Manage docs structure** → `docs-general`
- **Track tasks** → `docs-todo`
- **Write feature requirements** → `docs-prds`
- **Write technical spec** → `docs-specs`
- **Write user guide** → `docs-guide`
- **Record architecture decision** → `docs-adr`

### Managing Projects?

- **Rust project** → `project-rust`

### Building Backend?

- **General backend** → `backend-principles`
- **Database questions** → `backend-database`
- **Service architecture** → `backend-microservices`
- **Async messaging** → `backend-queue`
- **API design** → `backend-api`
- **Caching** → `backend-cache`
- **Rust development** → `backend-rust`

### Building Frontend?

- **General frontend** → `frontend-general-principles`
- **Desktop app** → `frontend-tauri-native`
- **Web app (Next.js)** → `frontend-framework-nextjs`
- **State management** → `frontend-state-management`
- **Styling** → `frontend-styling-twind`
- **API calls** → `frontend-api-integration`
- **UI/UX design** → `frontend-design`

### Testing Frontend?

- **Unit tests** → `test-frontend-unit`
- **E2E tests** → `test-e2e`

---

## Usage

At the start of any task:

1. Review available skills above
2. Load relevant skill(s) for your task
3. Follow skill guidance for best practices

Example:
```
Task: Implement a new API endpoint
→ Load: backend-api, backend-principles
→ Follow API design guidelines
→ Implement with best practices
```

---

## Self-Check

Before starting work, verify you have the right skill:

- [ ] Identified relevant skill category (backend/frontend/docs)
- [ ] Loaded specific skill for the task
- [ ] Reviewed skill guidelines
