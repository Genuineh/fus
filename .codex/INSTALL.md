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
