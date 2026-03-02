# Fus - Claude Code 通用开发工具集

## 项目概述

Fus 是一个 Claude Code 插件项目，提供代码审查Agent、自定义Skills和MCP能力。

## 模块结构

- `@fus/core` - 核心共享模块（类型、配置、工具）
- `@fus/agent` - 自定义Agent（代码审查）
- `@fus/skills` - 自定义Skills（commit, pr, test, lint）
- `@fus/mcp` - MCP服务器（预留）

## 开发

```bash
# 安装依赖
pnpm install

# 构建所有模块
pnpm build

# 运行测试
pnpm test

# 运行lint
pnpm lint
```

## 自定义Skills

- `/commit` - 智能提交代码
- `/pr` - 管理Pull Request
- `/test` - 运行测试
- `/lint` - 代码质量检查
