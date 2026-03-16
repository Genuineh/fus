# Installing Fus for Codex

Enable fus skills in Codex via native skill discovery. Just clone and symlink.

## Prerequisites

- Git

## Installation

1. **Clone the fus repository:**
   ```bash
   git clone https://github.com/Genuineh/fus.git ~/.codex/fus
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/fus/skills ~/.agents/skills/fus
   ```

   **Windows (PowerShell):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\fus" "$env:USERPROFILE\.codex\fus\skills"
   ```

3. **Restart Codex** (quit and relaunch the CLI) to discover the skills.

## Verify

```bash
ls -la ~/.agents/skills/fus
```

You should see a symlink (or junction on Windows) pointing to your fus skills directory.

## Available Skills

After installation, the following skills will be available:

| Skill | Description |
|-------|-------------|
| `fus-lead` | Task orchestration and workflow management |
| `fus-agents` | Fus agent reference |
| `plan` | Task planning |
| `docs-*` | Documentation skills (docs-general, docs-prds, docs-specs, etc.) |
| `backend-*` | Backend skills (backend-api, backend-database, backend-rust, etc.) |
| `frontend-*` | Frontend skills (frontend-nextjs, frontend-tauri, etc.) |
| `test-*` | Testing skills (test-frontend-unit, test-e2e) |
| `project-rust` | Rust project management |
| `product-*` | Product skills |

## Usage

Use skills directly in Codex:

```
/fus-lead
```

Or use natural language - Codex will discover and use the relevant skills.

## Updating

```bash
cd ~/.codex/fus && git pull
```

Skills update instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/fus
```

Optionally delete the clone: `rm -rf ~/.codex/fus`

## Troubleshooting

If skills don't appear:
1. Make sure the symlink was created correctly
2. Restart Codex completely (quit and relaunch)
3. Check: `ls -la ~/.agents/skills/fus`

## More Information

For detailed usage guide and examples, see:
- [docs/README.codex.md](../docs/README.codex.md)

---

## Codex Multi-Agent Configuration

Codex supports multi-agent workflows. You can configure Fus agents for multi-agent mode.

### Prerequisites

- Codex CLI installed
- Multi-agent feature enabled

### Enable Multi-Agent

**Option 1: Via CLI**
1. Run Codex with `/experimental` command
2. Enable **Multi-agents**
3. Restart Codex

**Option 2: Via Config File**
Add to `~/.codex/config.toml`:
```toml
[features]
multi_agent = true
```

### Installation

**Option 1: Copy to Project**
```bash
# Copy config and agents to project
mkdir -p .codex
cp .codex/config.toml .codex/
cp -r codex-agents/ .codex/
```

**Option 2: Copy to User Directory**
```bash
# Copy to user config directory
mkdir -p ~/.codex
cp .codex/config.toml ~/.codex/
cp -r codex-agents/ ~/.codex/
```

**Option 3: Clone and Symlink**
```bash
git clone https://github.com/Genuineh/fus.git ~/.codex/fus
ln -sf ~/.codex/fus/.codex/config.toml ~/.codex/config.toml
ln -sf ~/.codex/fus/codex-agents/ ~/.codex/
```

### Available Agents

| Agent | Description |
|-------|-------------|
| `architect` | Architecture analysis, technical decisions |
| `developer` | Code implementation |
| `reviewer` | Code review + verification |
| `tester` | Test writing and coverage |

**Note:** Task orchestration is handled by the main thread using `fus-lead` skill, not by a separate agent.

### Usage

For task orchestration, use the main thread with fus-lead skill:

```
Load fus-lead skill, then design and implement a user authentication system
```

To spawn specific agents directly:

```
@architect Design the authentication system
```

### Updating

```bash
# If using clone
cd ~/.codex/fus && git pull

# If using copy, re-copy
cp -r codex-agents/ ~/.codex/
```

### Uninstalling

```bash
rm ~/.codex/config.toml
rm -rf ~/.codex/codex-agents
```
