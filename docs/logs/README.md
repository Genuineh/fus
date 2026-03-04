# 开发日志索引

本目录用于记录项目的开发过程，确保开发历史可追溯。

## 日志目录

```
docs/logs/
├── 2026-03-04-user-auth.md    # 用户认证功能开发
├── 2026-03-03-api-refactor.md # API 重构
└── archive/                    # 归档日志
```

## 索引

| 日期 | 功能 | 状态 | 负责人 |
|------|------|------|--------|
| 2026-03-04 | 用户认证功能 | In Progress | Developer |

## 规范

- 使用 `docs-logs` skill 管理日志
- 命名格式: `YYYY-MM-DD-feature-name.md`
- 状态: `in_progress` / `completed` / `blocked`
- 每月末归档超过 30 天的已完成日志

## 查看日志

```bash
# 查看所有日志
ls -la docs/logs/

# 查看特定日志
cat docs/logs/2026-03-04-user-auth.md
```
