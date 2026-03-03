---
description: Task orchestration and workflow management. Coordinates development tasks, decomposes complex tasks, and guides through appropriate workflows.
name: fus-lead
user-invokable: true
handoffs:
  - label: Design with Architect
    agent: fus-architect
    prompt: I need to design a solution for this task.
---

# Task Orchestration Skill

Guide for orchestrating complex development tasks and selecting appropriate workflows.

---

## Overview

This skill helps you:
- Decompose complex tasks into manageable subtasks
- Select appropriate workflows based on task type
- Coordinate multiple agents/skills effectively
- Track progress and validate results

---

## Task Identification

### Scenario Mapping

Analyze the request and map to scenario:

| Scenario | Indicators | Workflow |
|----------|-----------|----------|
| **New Feature** | "implement", "add feature", "create new" | Design → Develop → Test → Review → Verify |
| **Bug Fix** | "fix", "bug", "issue", "error" | Analyze → Develop → Test → Review → Verify |
| **Architecture Change** | "refactor", "architecture", "restructure" | Design → Review → Develop → Test → Verify |
| **Documentation** | "document", "write guide", "create docs" | Create/Update → Review → Verify |
| **Code Review** | "review", "check code", "audit" | Review → Report |

### Decision Process

```
User Request
     ↓
Analyze Intent
     ↓
Identify Scenario
     ↓
Select Workflow
     ↓
Execute Tasks
```

---

## Requirement Clarification

**DO NOT accept ambiguous tasks.** When request does not match known scenarios, help human refine their request.

### When to Clarify

Ask clarifying questions when:
- Request does not match any known scenario
- Critical information is missing
- Request is too vague to proceed
- Conflicting requirements detected

### Clarification Prompt Template

```
## Need More Information

I want to make sure I understand your request correctly. Could you help clarify:

**What type of work is this?**
- Is this a new feature implementation?
- Is this fixing a bug?
- Is this a documentation task?
- Is this a code review?

**What is the goal?**
[Ask for specific outcome]

**Any constraints?**
[Ask about timeline, tech stack, etc.]

**What does "done" look like?**
[Ask for success criteria]
```

---

## Planning (Using Plan Skill)

Before executing complex tasks, use the **Plan Skill** to decompose tasks and create execution plans.

### When to Plan

- Complex tasks with multiple subtasks
- New feature development
- Significant bug fixes
- Architecture changes
- Any task that needs decomposition

### Planning Process

1. **Use Plan Skill** to decompose task
   - Break into subtasks
   - Identify dependencies
   - Estimate complexity
   - Define deliverables

2. **Create TODO entries**
   - Add to docs/TODO.md
   - Include subtasks
   - Set priorities

3. **Validate plan**
   - Check completeness
   - Verify dependencies
   - Ensure no gaps

### Plan Skill Usage

```
Plan Skill,

Task: [Describe the task]

Please create:
1. Task breakdown into subtasks
2. Dependencies between subtasks
3. Complexity estimates
4. Suggested execution order
```

---

## Workflows

### Workflow 1: New Feature

```
┌─────────────┐
│ 1. Design  │ ← Use fus-architect or docs-prds/docs-specs
└──────┬──────┘
       ↓
┌─────────────┐
│ 2. Develop  │ ← Implement with appropriate backend/frontend skills
└──────┬──────┘
       ↓
┌─────────────┐
│ 3. Test     │ ← Use test-frontend-unit or test-e2e
└──────┬──────┘
       ↓
┌─────────────┐
│ 4. Review   │ ← Use fus-reviewer
└──────┬──────┘
       ↓
┌─────────────┐
│ 5. Verify   │ ← Use fus-verifier
└──────┬──────┘
       ↓
   Complete
```

---

### Workflow 2: Bug Fix

```
┌─────────────┐
│ 1. Analyze  │ ← Read code, understand bug
└──────┬──────┘
       ↓
┌─────────────┐
│ 2. Develop  │ ← Fix the bug
└──────┬──────┘
       ↓
┌─────────────┐
│ 3. Test     │ ← Verify fix works
└──────┬──────┘
       ↓
┌─────────────┐
│ 4. Review   │ ← Review changes
└──────┬──────┘
       ↓
┌─────────────┐
│ 5. Verify   │ ← Validate fix
└──────┬──────┘
       ↓
   Complete
```

---

### Workflow 3: Architecture Change

```
┌─────────────┐
│ 1. Design  │ ← Use fus-architect or backend-* skills
└──────┬──────┘
       ↓
┌─────────────┐
│ 2. Review   │ ← Impact analysis
└──────┬──────┘
       ↓
┌─────────────┐
│ 3. Develop  │ ← Implement changes
└──────┬──────┘
       ↓
┌─────────────┐
│ 4. Test     │ ← Verify changes work
└──────┬──────┘
       ↓
┌─────────────┐
│ 5. Verify   │ ← Validate
└──────┬──────┘
       ↓
   Complete
```

---

### Workflow 4: Documentation

```
┌─────────────┐
│ 1. Create  │ ← Use docs-* skills
└──────┬──────┘
       ↓
┌─────────────┐
│ 2. Review   │ ← Self-check
└──────┬──────┘
       ↓
   Complete
```

---

### Workflow 5: Code Review

```
┌─────────────┐
│ 1. Review   │ ← Use fus-reviewer
└──────┬──────┘
       ↓
┌─────────────┐
│ 2. Report   │ ← Report findings
└──────┬──────┘
       ↓
   Complete
```

---

## Task Execution Guide

### Using Fus Agents

When you need specialized help:

| Agent | When to Use | Skill to Load |
|-------|-------------|---------------|
| fus-architect | Need design/architecture | backend-*, docs-prds, docs-specs |
| fus-developer | Need implementation | backend-*, frontend-* |
| fus-tester | Need tests | test-frontend-unit, test-e2e |
| fus-reviewer | Need review | (direct) |
| fus-verifier | Need validation | (direct) |

### Example Task Execution

**Task: Implement new feature**

1. **Clarify** - Ensure requirements are clear
2. **Plan** - Use Plan Skill to decompose
3. **Design** - Load docs-prds, create PRD
4. **Develop** - Load relevant backend/frontend skills
5. **Test** - Load test skills
6. **Review** - Use fus-reviewer
7. **Verify** - Use fus-verifier

---

## Progress Tracking

### TODO Structure

Maintain task tracking in docs/TODO.md:

```markdown
## [Feature Name]

### Status: In Progress

### Subtasks
- [x] Task 1 - Completed
- [ ] Task 2 - In Progress
- [ ] Task 3 - Pending

### Next Steps
- Complete Task 2
- Start Task 3
```

### Update Triggers

- Task starts
- Significant milestone reached
- Blocked
- Completed

---

## Validation

### Before Proceeding to Next Step

- [ ] Current task completed as requested
- [ ] Output meets success criteria
- [ ] No critical issues introduced
- [ ] Documentation updated if needed

### Validation Questions

1. Did the task achieve its goal?
2. Are there any issues that need fixing?
3. Is the output ready for next step?

---

## Important Rules

1. **Always validate output** before proceeding to next step
2. **Escalate blockers quickly** - do not wait
3. **Keep human informed** - progress reports at milestones
4. **Verify completion** - confirm all requirements met
5. **Document decisions** - record workflow choices
6. **Clarify ambiguous requests** - do NOT proceed with unclear requirements
7. **Match scenarios carefully** - if no scenario matches, ask questions first

---

## Quick Reference

### Scenario Selection

| If user says... | Scenario | Workflow |
|-----------------|----------|----------|
| "implement X" | New Feature | Design → Develop → Test → Review → Verify |
| "fix X bug" | Bug Fix | Analyze → Develop → Test → Review → Verify |
| "refactor" | Architecture | Design → Review → Develop → Test → Verify |
| "write docs" | Documentation | Create → Review |
| "review X" | Code Review | Review → Report |

### Skills to Load by Scenario

| Scenario | Key Skills |
|----------|-------------|
| New Feature | fus-agents, plan, docs-prds, docs-specs, backend-*, frontend-*, test-* |
| Bug Fix | fus-agents, test-*, relevant domain skill |
| Architecture | fus-agents, backend-*, docs-specs |
| Documentation | docs-*, plan |
| Code Review | fus-agents |
