# Fus

Claude Code 通用开发工具集插件项目。

## 项目简介

Fus 是一个 Claude Code 插件项目，提供代码审查Agent、自定义Skills和MCP能力。

## 模块

- `@fus/core` - 核心共享模块（类型、配置、工具）
- `@fus/agent` - 自定义Agent（代码审查）
- `@fus/skills` - 自定义Skills（commit, pr, test, lint）
- `@fus/mcp` - MCP服务器（预留）

## 文档

- [docs/TODO.md](docs/TODO.md) - 当前工作优先级
- [docs/prds/](docs/prds/) - 计划与设计
- [docs/guide/](docs/guide/) - 使用指南
- [docs/specs/](docs/specs/) - 规范文档
- [docs/decisions/](docs/decisions/) - 架构决策

## 快速开始

```bash
# 安装依赖
pnpm install

# 构建所有模块
pnpm build

# 运行测试
pnpm test
```

## 自定义 Skills

- `/commit` - 智能提交代码
- `/pr` - 管理 Pull Request
- `/test` - 运行测试
- `/lint` - 代码质量检查
