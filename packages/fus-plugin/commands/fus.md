---
---
description: Fus Plugin Manager - Install, update, remove, and list Claude Code plugins
argument-hint: [check|install|list|search|update|uninstall]
allowed-tools: [Bash, Read, Glob, Grep]
---

# Fus Plugin Manager

Fus - Claude Code plugin manager for common development tools.

## Execution

Run fus CLI:

```bash
cd /home/jerryg/github/fus && node packages/fus-cli/dist/index.js <command>
```

Supported commands:
- `check` - Check plugin installation status
- `install` - Install a plugin
- `list` - List installed plugins
- `search <keyword>` - Search plugins
- `update` - Update plugins
- `uninstall` - Remove a plugin

Without arguments, starts interactive menu.
