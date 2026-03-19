# AGENTS.md / CLAUDE.md 通用指导

本指南用于说明：使用 Fus 的项目，如何把仓库约束、开发流程、文档规则和技能路由整理为 `AGENTS.md` 或 `CLAUDE.md` 这类被 agent 工具识别的系统级指导文件。

目标不是为某一个工具单独写一套提示词，而是为项目维护一份稳定、可迁移、可复用的通用指导。

## 适用范围

- `AGENTS.md`: 适合作为通用 agent 工具可识别的项目级指导文件。
- `CLAUDE.md`: 适合作为 Claude Code 等工具的项目级指导文件。
- 其他工具如果支持项目内系统提示文件，也应尽量复用同一套规范，而不是重新发明一份不同的规则。

## 核心原则

### 1. 一份规范，多处投放

项目规则应尽量保持单一语义来源。

推荐做法：
- 在 `docs/guide/` 或 `docs/specs/` 中维护完整的规范说明。
- `AGENTS.md` 和 `CLAUDE.md` 使用同一套原则，只根据工具能力做少量适配。
- 如果两个文件都存在，它们的任务标准、质量门槛、文档要求、测试要求应保持一致。

### 2. 写项目规则，不写工具幻想

`AGENTS.md` / `CLAUDE.md` 应约束项目内的行为，而不是描述某个模型“理想中应该很聪明”。

应优先写：
- 仓库结构
- 文档更新要求
- 技能加载规则
- 开发与测试流程
- 审查标准
- 完成定义

应避免写：
- 空泛人格设定
- 无法验证的泛化要求
- 与项目无关的通用废话

### 3. 用最小必要规则覆盖高风险行为

系统级指导的重点不是面面俱到，而是约束容易出错、容易漂移、容易破坏协作的一致性问题。

优先覆盖：
- 文件应放在哪里
- 修改后必须同步更新哪些文档
- 任务开始时必须加载哪些 skill
- 代码和文档完成前必须经过哪些验证
- 什么情况下不能自作主张变更架构或需求

## 推荐写法

一个可维护的 `AGENTS.md` / `CLAUDE.md` 通常包含以下部分：

1. Repository Guidelines
2. Project Structure
3. Documentation Rules
4. Development Workflow
5. Skills
6. Testing Rules
7. Acceptance Standards
8. Commit and PR Rules

这些标题不要求逐字一致，但语义应稳定，方便不同 agent 工具快速抓取。

## 推荐内容

### Repository Guidelines

用于定义项目总规则，例如：
- 仓库是 documentation-first 还是 code-first
- 哪些根目录必须存在
- 哪些文件必须保持在仓库根目录
- 文档移动时必须同步更新哪些索引链接

这部分应尽量短，但必须明确。

### Project Structure

这里定义目录职责，而不是简单列树。

推荐写清：
- `docs/TODO.md` 是当前任务优先级入口
- `docs/prds/`、`docs/specs/`、`docs/guide/`、`docs/decisions/` 各自的职责
- `skills/` 是 AI operating guides
- 规划中的代码目录例如 `crates/`、`blocks/`、`mocs/`

如果目录移动有连带更新要求，也要写在这里或文档规则部分。

### Documentation Rules

这是最适合放进系统级指导的部分，因为它最容易被遗漏。

建议明确：
- 文档何时必须更新
- 文档归档的触发条件
- 归档后必须更新哪些引用
- `README.md` 与 `docs/TODO.md` 是否要求在同一变更中同步更新

如果项目是 documentation-first，这部分应比代码风格更优先。

### Development Workflow

这一部分约束执行顺序和验证行为。

推荐包含：
- 开始任务前先看 `docs/TODO.md`
- 先读相关代码或文档，再动手修改
- 修改后用 `git diff` 检查 README 和 docs 链接变化
- 当对应工作区存在时，运行 Rust / Node / dotnet 的标准命令

如果项目要求 TDD，也应在这里或 Testing Rules 中明确。

### Skills

如果项目依赖 Fus skills，这一部分必须写清楚，不应只写“按需使用”。

建议包含：
- 每个任务开始时先识别任务类型，再加载对应 skill
- 文档任务先加载对应 `docs-*`
- 一般开发任务加载 `developer`
- 测试任务加载 `tester`
- 审查任务加载 `review`
- 架构任务加载 `architect`
- 计划类任务加载 `plan`

如果多个 skill 同时适用，应强调“加载最小直接相关集合”，避免无差别全加载。

### Testing Rules

这部分决定项目的质量底线。

建议明确：
- 测试是开发的一部分，不是最后补丁
- 默认 red/green TDD
- 新行为和 bug fix 通常先写失败测试
- 单测、集成测试、e2e 的位置规范
- 测试命名使用行为导向名称

### Acceptance Standards

这一部分用于定义“什么叫完成”。

建议直接写成可核对清单，例如：
- 功能完整
- 关键失败路径有覆盖
- 文档已更新
- 没有明显回归
- 命名和边界保持一致
- 结果是可维护方案而不是临时补丁

### Commit and PR Rules

建议把最关键的协作规则写进去：
- commit subject 风格
- 每个 commit 只做一个逻辑变化
- PR 需要包含哪些信息
- 如果优先级变化，`docs/TODO.md` 必须一起更新

## `AGENTS.md` 与 `CLAUDE.md` 的关系

推荐把两者视为同一份项目规则在不同工具入口上的落地，而不是两套独立制度。

推荐策略：
- `AGENTS.md` 放通用规则，兼容更多 agent 工具。
- `CLAUDE.md` 保持相同规范，只在必要时补充 Claude Code 的工具习惯或目录约定。
- 当项目已有一份完整规则时，另一份文件应尽量复用、摘要或显式指向同一规范来源。

不推荐：
- 两份文件各写一套不同的完成标准
- 一个要求用 skill，另一个不要求
- 一个要求更新文档，另一个只关注代码

## 最小模板

下面是一份适合多数 Fus 项目的最小模板，可以作为 `AGENTS.md` 或 `CLAUDE.md` 的起点：

```md
# Repository Guidelines

## Project Structure
- This repository is documentation-first.
- Review `docs/TODO.md` before starting substantive work.
- Keep active plans in `docs/prds/`, guides in `docs/guide/`, specs in `docs/specs/`, and decisions in `docs/decisions/`.
- Keep AI operating guides in `skills/`.

## Documentation Rules
- Update related docs in the same change when behavior, structure, or workflows change.
- If a file moves, update links in `README.md` and related docs in the same change.
- Archive superseded docs under `docs/archive/` instead of deleting them.

## Workflow
- Read the relevant docs and nearby code before editing.
- Prefer the smallest complete change.
- Verify work with the narrowest meaningful checks available in this repository.

## Skills
- Start every task by identifying the task type and loading the matching skill.
- Use `docs-*` for documentation work, `developer` for implementation, `tester` for testing, `review` for review, `architect` for architecture, and `plan` for planning.

## Testing
- Treat testing as part of development, not cleanup.
- New behavior and bug fixes should normally start with a failing test.

## Acceptance
- A change is not done until behavior, tests, and required docs are updated together.
```

## Fus 项目的建议落地方式

对于使用 Fus 的项目，推荐按下面方式组织：

1. 在项目根目录维护 `AGENTS.md` 或 `CLAUDE.md`。
2. 将仓库级规则写入该文件，而不是散落在多个临时 prompt 中。
3. 将可复用的详细说明放入 `docs/guide/` 或 `docs/specs/`。
4. 将执行性知识放入 `skills/`，供 agent 在任务开始时加载。
5. 当规则变化时，同时更新：
   - `AGENTS.md` / `CLAUDE.md`
   - 对应 `docs/guide/` 或 `docs/specs/`
   - `README.md` 中的入口链接

## 维护建议

- 保持文件短、硬、可执行。
- 只写能真正约束贡献行为的规则。
- 规则变更时优先更新示例和入口链接。
- 如果一个规则无法在 review 中被检查，它通常不适合放在系统级指导里。

## 相关文档

- `README.md`
- `docs/TODO.md`
- `docs/README.codex.md`
- `docs/README.copilot.md`
- `skills/skill-overview/SKILL.md`
