# Installing Fus for VSCode Copilot

Enable fus custom agents in VSCode Copilot.

## Prerequisites

- VSCode with Copilot extension installed
- Git

## Installation

### Option 1: Quick Install (Recommended)

1. **Copy fus agents to your Copilot agents directory:**

   For workspace (project-specific):
   ```bash
   # Create agents directory
   mkdir -p .github/agents

   # Copy all agent definitions
   cp -r copilot-agents/*.md .github/agents/
   ```

   For user profile (available in all projects):
   ```bash
   mkdir -p ~/.copilot/agents

   # Copy all agent definitions
   cp -r copilot-agents/*.md ~/.copilot/agents/
   ```

### Option 2: Clone and Symlink

```bash
# Clone the repository
git clone https://github.com/Genuineh/fus.git ~/.copilot/fus

# Create symlink to agents
mkdir -p ~/.copilot/agents
ln -sf ~/.copilot/fus/copilot-agents/*.md ~/.copilot/agents/
```

Or for workspace:
```bash
git clone https://github.com/Genuineh/fus.git .fus-temp
mkdir -p .github/agents
cp .fus-temp/copilot-agents/*.md .github/agents/
rm -rf .fus-temp
```

## Available Agents

After installation, the following agents will be available in Copilot:

| Agent | Description |
|-------|-------------|
| `architect` | Architecture analysis, technical decisions |
| `developer` | Code implementation |
| `reviewer` | Code review + verification |
| `tester` | Test writing and coverage |

## Usage

### Via Chat

1. Open VSCode and start a Copilot Chat
2. Type `/agents` to see available agents
3. Select the fus agent you want to use

### Via Command

1. Run **Chat: New Custom Agent** command (Ctrl+Shift+P / Cmd+Shift+P)
2. Select an agent file from `.github/agents` or your user agents

### Handoffs

Fus agents are configured with handoffs for workflow:

```
architect → developer → tester → reviewer → Complete
```

Note: Task orchestration (Lead) is handled by fus-lead skill in Claude Code, not in Copilot custom agents.

## Verification

After installation:
1. Restart VSCode
2. Open Copilot Chat
3. Type `/agents` - you should see fus agents listed

## Updating

```bash
# If using symlink
cd ~/.copilot/fus && git pull

# If using copy, re-copy
cp -r copilot-agents/*.md ~/.copilot/agents/
```

## Uninstalling

```bash
# Remove workspace agents
rm -rf .github/agents/*.md

# Or remove user agents
rm -rf ~/.copilot/agents/*.md
rm -rf ~/.copilot/fus
```

## Troubleshooting

### Agents not appearing

1. Make sure `.md` files are in correct location
2. Restart VSCode
3. Check file naming: must end with `.md`
4. Verify YAML frontmatter is valid

### Tools not working

Custom agents in Copilot have access to:
- Built-in tools (fetch, github, search, etc.)
- VSCode workspace tools

Fus skills are designed as prompts/guides - use them as reference when working with the agent.

## More Information

For detailed usage guide and examples, see:
- [docs/README.copilot.md](../docs/README.copilot.md)

## Note on Skills

In Copilot, skills work differently than Claude Code/Codex:
- Skills are embedded in agent instructions
- Use the agent definitions as comprehensive prompts
- Refer to `skills/` directory for detailed guidance
