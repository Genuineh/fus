# Fus CLI 工具链设计

**日期**: 2026-03-02
**版本**: 1.0.0
**状态**: 已批准

## 1. 项目概述

- **项目名称**: fus-cli
- **项目类型**: Claude Code 插件管理工具
- **核心用途**: 管理 Claude Code 插件的安装、更新、删除

## 2. 功能需求

### 2.1 核心功能

| 命令 | 功能 |
|------|------|
| `install` | 安装插件到全局或项目 |
| `update` | 更新已安装的插件 |
| `uninstall` | 移除已安装的插件 |
| `list` | 列出已安装的插件 |
| `search` | 搜索可用插件 |

### 2.2 安装位置

- **全局**: `~/.claude/plugins/user-plugins/`
- **项目**: `<project>/.claude/skills/`

### 2.3 插件来源

- 本地路径 (file://)
- NPM 包 (@scope/name)

## 3. 交互设计

### 主菜单
```
fus - Fus Plugin Manager

请选择操作:
[1] 安装插件
[2] 更新插件
[3] 删除插件
[4] 列出插件
[5] 搜索插件
[0] 退出
```

### 安装流程
```
→ 选择操作: [1] 安装

→ 安装到: [1] 全局  [2] 当前项目

→ 来源: [1] 本地路径  [2] NPM包

→ 请输入路径或包名: /path/to/plugin 或 @scope/name

→ 确认安装? [Y/n]

→ 安装中...
→ ✅ 安装成功
```

## 4. 目录结构

```
fus/
├── src/
│   ├── commands/
│   │   ├── install.ts
│   │   ├── update.ts
│   │   ├── uninstall.ts
│   │   ├── list.ts
│   │   └── search.ts
│   ├── installer/
│   │   ├── base.ts
│   │   ├── local.ts
│   │   └── npm.ts
│   ├── interactive/
│   │   └── wizard.ts
│   ├── config.ts
│   ├── index.ts
│   └── types.ts
├── package.json
└── tsconfig.json
```

## 5. 技术栈

- TypeScript
- Node.js
- inquirer (交互式问答)
- zx (shell 命令执行)
