# Fus for VSCode Copilot

This document provides detailed instructions for installing and using Fus custom agents in VSCode Copilot.

## Installation

### Option 1: Quick Install

Tell Copilot to install fus agents:

1. **Copy agents to workspace:**
   ```bash
   mkdir -p .github/agents
   cp copilot-agents/*.agent.md .github/agents/
   ```

2. **Or copy to user profile:**
   ```bash
   mkdir -p ~/.copilot/agents
   cp copilot-agents/*.agent.md ~/.copilot/agents/
   ```

### Option 2: Clone and Use

```bash
# Clone the repository
git clone https://github.com/Genuineh/fus.git ~/.copilot/fus

# Create agents directory
mkdir -p ~/.copilot/agents

# Link agents
ln -sf ~/.copilot/fus/copilot-agents/*.agent.md ~/.copilot/agents/
```

Then restart VSCode.

## Verification

After installation:
1. Restart VSCode
2. Open Copilot Chat
3. Type `/agents` - you should see fus agents listed

## Available Agents

### lead

Task orchestration and workflow management agent.

**When to use:**
- Starting a new task
- Need to break down complex work
- Not sure which workflow to use

**Handoffs:**
- → architect (for design)

### architect

Architecture and technical design agent.

**When to use:**
- Need to design a new feature
- Architecture decisions needed
- Writing PRD or technical spec

**Handoffs:**
- → developer (for implementation)

### developer

Code implementation agent.

**When to use:**
- Implementing features
- Bug fixes
- Making code changes

**Handoffs:**
- → tester (for tests)
- → reviewer (for review)

### reviewer

Code review agent.

**When to use:**
- Need code review
- Security audit
- Quality assessment

**Handoffs:**
- → verifier (for validation)

### tester

Test writing agent.

**When to use:**
- Writing unit tests
- Adding test coverage
- Creating e2e tests

**Handoffs:**
- → reviewer (for review)

### verifier

Verification agent.

**When to use:**
- Final validation
- Checking completeness
- Acceptance testing

## Usage

### Starting a Task

1. Open Copilot Chat
2. Type `/agents` to see available agents
3. Select `lead`
4. Describe your task

Example:
```
I need to implement a user authentication system with React and Node.js
```

### Using Handoffs

After an agent completes their work, use the handoff buttons to smoothly transition to the next agent:

```
lead → architect → developer → tester → reviewer → verifier
```

### Direct Agent Invocation

You can also invoke specific agents directly:

```
@architect Design a REST API for a blog system
```

```
@developer Implement the user registration endpoint
```

```
@reviewer Review the authentication code
```

## Workflow Examples

### New Feature

1. **Start with lead:**
   ```
   I want to add a real-time notification feature
   ```

2. **lead** will help plan and handoff to **architect**

3. **architect** creates design, handoff to **developer**

4. **developer** implements, handoff to **tester**

5. **tester** writes tests, handoff to **reviewer**

6. **reviewer** reviews, handoff to **verifier**

7. **verifier** confirms completion

### Bug Fix

1. **Start with lead:**
   ```
   Fix the login redirect bug
   ```

2. **lead** analyzes and handoffs to **developer**

3. **developer** fixes, handoff to **tester**

4. **tester** verifies fix, handoff to **verifier**

5. **verifier** confirms fix

### Code Review

1. **Start with reviewer:**
   ```
   Review the recent changes to the auth module
   ```

2. **reviewer** provides detailed review

3. Handoff to **developer** if fixes needed

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
rm -rf .github/agents/*.agent

# Or remove user agents
rm -rf ~/.copilot/agents/*.agent
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
