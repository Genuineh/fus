# Fus 项目 TODO

## 项目概述
Claude Code 通用开发工具集插件项目

## 当前优先级

### P0 - 阻塞
- [ ] 无

### P1 - 高优先级
- [ ] 完善 Agent 和 Skills 的单元测试
- [ ] 实现 MCP 服务器功能

### P2 - 中优先级 (CLI功能)
- [ ] 实现 search 命令（搜索插件）
- [ ] 添加插件版本管理
- [ ] 添加插件配置功能

### P3 - 低优先级
- [ ] 添加更多代码审查规则
- [ ] 实现配置驱动的功能扩展
- [ ] 添加 E2E 测试
- [ ] 完善文档
- [x] 增加 AGENTS.md / CLAUDE.md 通用指导
- [x] 生成 AGENTS.md / CLAUDE.md 推荐模板
- [x] 增加 design-foundations 设计原则 skill
- [x] 优化 design-foundations skill 为英文设计工程版本

---

## CLI 功能规划

### 已完成
- [x] install - 安装插件（本地/NPM）
- [x] list - 列出已安装插件
- [x] uninstall - 删除插件
- [x] update - 更新插件

### 开发中
- [ ] 无

### 待开发
- [ ] version - 查看/管理版本
- [ ] version - 查看/管理版本
- [ ] config - 插件配置管理
- [ ] info - 查看插件详情

---

## 执行记录

| 日期 | 变更 | 状态 |
|------|------|------|
| 2026-03-02 | 初始化项目规范结构 | ✅ |
| 2026-03-02 | 创建 fus-core, fus-agent, fus-skills, fus-mcp 模块 | ✅ |
| 2026-03-02 | 创建 fus-cli 基础框架 | ✅ |
| 2026-03-02 | 实现 install/list/uninstall 命令 | ✅ |
| 2026-03-02 | 实现 update 命令 | ✅ |
| 2026-03-02 | 添加CLI使用文档 | ✅ |
| 2026-03-19 | 增加 AGENTS.md / CLAUDE.md 通用指导文档 | ✅ |
| 2026-03-19 | 生成 AGENTS.md / CLAUDE.md 推荐模板 | ✅ |
| 2026-03-19 | 增加 design-foundations 设计原则 skill | ✅ |
| 2026-03-19 | 优化 design-foundations skill 为英文设计工程版本 | ✅ |
