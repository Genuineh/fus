# Fus for VSCode Copilot

This document provides detailed instructions for installing and using Fus custom agents in VSCode Copilot.

## Installation

### Option 1: Quick Install

Tell Copilot to install fus agents:

1. **Copy agents to workspace:**
   ```bash
   mkdir -p .github/agents
   # Copy the .agent.md files from this repository
   ```

2. **Or copy to user profile:**
   ```bash
   mkdir -p ~/.copilot/agents
   cp agents/*.agent.md ~/.copilot/agents/
   ```

### Option 2: Clone and Use

```bash
# Clone the repository
git clone https://github.com/Genuineh/fus.git ~/.copilot/fus

# Create agents directory
mkdir -p ~/.copilot/agents

# Link agents
ln -sf ~/.copilot/fus/agents/*.agent.md ~/.copilot/agents/
```

Then restart VSCode.

## Verification

After installation:
1. Restart VSCode
2. Open Copilot Chat
3. Type `/agents` - you should see fus agents listed

## Available Agents

### fus-lead

Task orchestration and workflow management agent.

**When to use:**
- Starting a new task
- Need to break down complex work
- Not sure which workflow to use

**Handoffs:**
- → fus-architect (for design)

### fus-architect

Architecture and technical design agent.

**When to use:**
- Need to design a new feature
- Architecture decisions needed
- Writing PRD or technical spec

**Handoffs:**
- → fus-developer (for implementation)

### fus-developer

Code implementation agent.

**When to use:**
- Implementing features
- Bug fixes
- Making code changes

**Handoffs:**
- → fus-tester (for tests)
- → fus-reviewer (for review)

### fus-reviewer

Code review agent.

**When to use:**
- Need code review
- Security audit
- Quality assessment

**Handoffs:**
- → fus-verifier (for validation)

### fus-tester

Test writing agent.

**When to use:**
- Writing unit tests
- Adding test coverage
- Creating e2e tests

**Handoffs:**
- → fus-reviewer (for review)

### fus-verifier

Verification agent.

**When to use:**
- Final validation
- Checking completeness
- Acceptance testing

## Usage

### Starting a Task

1. Open Copilot Chat
2. Type `/agents` to see available agents
3. Select `fus-lead`
4. Describe your task

Example:
```
I need to implement a user authentication system with React and Node.js
```

### Using Handoffs

After an agent completes their work, use the handoff buttons to smoothly transition to the next agent:

```
fus-lead → fus-architect → fus-developer → fus-tester → fus-reviewer → fus-verifier
```

### Direct Agent Invocation

You can also invoke specific agents directly:

```
@fus-architect Design a REST API for a blog system
```

```
@fus-developer Implement the user registration endpoint
```

```
@fus-reviewer Review the authentication code
```

## Workflow Examples

### New Feature

1. **Start with fus-lead:**
   ```
   I want to add a real-time notification feature
   ```

2. **fus-lead** will help plan and handoff to **fus-architect**

3. **fus-architect** creates design, handoff to **fus-developer**

4. **fus-developer** implements, handoff to **fus-tester**

5. **fus-tester** writes tests, handoff to **fus-reviewer**

6. **fus-reviewer** reviews, handoff to **fus-verifier**

7. **fus-verifier** confirms completion

### Bug Fix

1. **Start with fus-lead:**
   ```
   Fix the login redirect bug
   ```

2. **fus-lead** analyzes and handoffs to **fus-developer**

3. **fus-developer** fixes, handoff to **fus-tester**

4. **fus-tester** verifies fix, handoff to **fus-verifier**

5. **fus-verifier** confirms fix

### Code Review

1. **Start with fus-reviewer:**
   ```
   Review the recent changes to the auth module
   ```

2. **fus-reviewer** provides detailed review

3. Handoff to **fus-developer** if fixes needed

## Agent Instructions

Fus agents include detailed instructions in their definitions. These cover:

- Core responsibilities
- When to use each agent
- Input/output specifications
- Boundaries (what agents cannot do)
- Best practices
- Handoff protocols

## Updating

```bash
# If using clone
cd ~/.copilot/fus && git pull

# If using copy, re-copy
cp agents/*.agent.md ~/.copilot/agents/
```

## Uninstalling

```bash
# Remove workspace agents
rm -rf .github/agents/fus-*

# Or remove user agents
rm -rf ~/.copilot/agents/fus-*
rm -rf ~/.copilot/fus
```

## Troubleshooting

### Agents not appearing

1. Verify `.agent.md` files in correct location
2. Restart VSCode completely
3. Check file naming: must end with `.agent.md`
4. Verify YAML frontmatter is valid

### Handoffs not working

1. Ensure both agents are installed
2. Check agent names match in handoff config

### Tools not available

Custom agents have access to:
- Built-in VSCode tools
- GitHub tools (if connected)
- Web search tools

## Comparison: Copilot vs Claude Code/Codex

| Feature | Copilot | Claude Code/Codex |
|---------|---------|-------------------|
| Agents | Custom agents (.agent.md) | Skills system |
| Skills | Embedded in agents | Separate skill files |
| Invocation | @agent or /agents | /skill-name |
| Configuration | .github/agents/ | skills/ directory |

## Support

For issues or questions:
- GitHub: https://github.com/Genuineh/fus
