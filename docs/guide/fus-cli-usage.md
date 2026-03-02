# Fus CLI 使用指南

## 简介

Fus CLI 是一个用于管理 Claude Code 插件的命令行工具，支持：
- 安装插件（本地路径或 NPM 包）
- 卸载插件
- 更新插件
- 列出已安装的插件

## 安装

```bash
# 克隆项目
git clone https://github.com/your-repo/fus.git
cd fus

# 安装依赖
pnpm install

# 构建
pnpm build

# 链接全局命令（可选）
cd packages/fus-cli
npm link
```

## 使用方式

### 交互式模式

无参数运行进入交互式向导：

```bash
node packages/fus-cli/dist/index.js
# 或
cd packages/fus-cli && node dist/index.js
```

### 命令行模式

```bash
# 安装插件
fus install <path>           # 从本地路径安装
fus install --npm <package>  # 从NPM安装
fus install --global <path>   # 安装到全局
fus i                        # install 的简写

# 列出插件
fus list                     # 列出已安装插件
fus ls                       # list 的简写
```

## 交互式菜单

运行 `fus` 不带参数会显示中文菜单：

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

1. 选择操作: `[1] 安装插件`
2. 选择安装位置:
   - `全局 (所有项目可用)` → `~/.claude/plugins/user-plugins/`
   - `当前项目` → `./.claude/skills/`
3. 选择来源:
   - `本地路径` → 输入插件目录路径
   - `NPM包` → 输入包名（如 `@scope/name`）
4. 确认安装

## 插件位置

| 类型 | 路径 |
|------|------|
| 全局插件 | `~/.claude/plugins/user-plugins/` |
| 项目插件 | `<project>/.claude/skills/` |

## 示例

### 安装本地插件

```bash
$ fus
请选择操作: [1] 安装插件
安装到: [2] 当前项目
插件来源: [1] 本地路径
请输入插件路径: /path/to/my-plugin
确认安装到当前项目? (Y/n): Y

✅ 安装成功!
```

### 列出已安装插件

```bash
$ fus list

📦 已安装的插件:

全局插件:
  - enforce-repository-guidelines
  - init-repository-guidelines

项目插件:
  - my-custom-skill
```

## 项目级 Skills

项目中的 skills 文件放在 `.claude/skills/` 目录下：

```
my-project/
├── .claude/
│   └── skills/
│       ├── init-repository-guidelines.md
│       └── enforce-repository-guidelines.md
└── src/
```

## 常见问题

### Q: 如何卸载插件？

A: 使用 `[3] 删除插件` 菜单选项。

### Q: 全局和项目插件有什么区别？

- **全局插件**: 所有 Claude Code 项目都可以使用
- **项目插件**: 只在当前项目中使用

### Q: 支持哪些插件来源？

- 本地文件系统路径
- NPM 包（支持 `@scope/name` 格式）

## 开发相关命令

```bash
# 构建所有模块
pnpm build

# 运行测试
pnpm test

# 清理构建产物
pnpm clean
```
