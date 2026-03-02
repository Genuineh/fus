# Fus CLI 实施计划

> **For Claude:** REQUIRED SUB-SKILL: 使用 superpowers:executing-plans 按任务逐步实施

**Goal:** 创建fus-cli工具，支持交互式安装、更新、删除Claude Code插件

**Architecture:** 使用inquirer做交互式CLI，zx执行shell命令，支持本地和NPM两种安装来源

**Tech Stack:** TypeScript, Node.js, inquirer, zx

---

## 任务 1: 创建 fus-cli 模块基础结构

**Files:**
- Create: `packages/fus-cli/package.json`
- Create: `packages/fus-cli/tsconfig.json`
- Create: `packages/fus-cli/src/index.ts`

**Step 1: 创建 packages/fus-cli/package.json**

```json
{
  "name": "fus-cli",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "bin": {
    "fus": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts"
  },
  "dependencies": {
    "inquirer": "^9.2.0",
    "zx": "^8.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tsx": "^4.0.0",
    "@types/node": "^20.11.0"
  }
}
```

**Step 2: 创建 packages/fus-cli/tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

**Step 3: 创建 packages/fus-cli/src/index.ts (入口文件)**

```typescript
#!/usr/bin/env node

import { mainMenu } from './interactive/wizard.js';

console.log('fus - Fus Plugin Manager\n');

await mainMenu();
```

**Step 4: 提交**

```bash
git add packages/fus-cli/
git commit -m "feat: 创建fus-cli基础结构"
```

---

## 任务 2: 创建类型定义

**Files:**
- Create: `packages/fus-cli/src/types.ts`

**Step 1: 创建类型定义**

```typescript
export type Scope = 'global' | 'project';

export type Source = 'local' | 'npm';

export interface Plugin {
  name: string;
  path: string;
  scope: Scope;
  source: Source;
  version?: string;
}

export interface InstallOptions {
  scope: Scope;
  source: Source;
  path?: string;
  npmPackage?: string;
}

export interface Config {
  globalPath: string;
  projectPath: string;
}
```

**Step 2: 提交**

```bash
git add packages/fus-cli/src/types.ts
git commit -m "feat: 添加fus-cli类型定义"
```

---

## 任务 3: 创建交互式向导

**Files:**
- Create: `packages/fus-cli/src/interactive/wizard.ts`

**Step 1: 创建交互式向导**

```typescript
import inquirer from 'inquirer';
import type { Scope, Source } from '../types.js';
import { install } from '../commands/install.js';
import { list } from '../commands/list.js';

export async function mainMenu(): Promise<void> {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '请选择操作:',
      choices: [
        { name: '安装插件', value: 'install' },
        { name: '更新插件', value: 'update' },
        { name: '删除插件', value: 'uninstall' },
        { name: '列出插件', value: 'list' },
        { name: '搜索插件', value: 'search' },
        { name: '退出', value: 'exit' },
      ],
    },
  ]);

  if (action === 'exit') {
    console.log('再见!');
    process.exit(0);
  }

  await handleAction(action);
}

async function handleAction(action: string): Promise<void> {
  switch (action) {
    case 'install':
      await installWizard();
      break;
    case 'list':
      await listPlugins();
      break;
    case 'update':
      console.log('更新功能开发中...');
      break;
    case 'uninstall':
      console.log('删除功能开发中...');
      break;
    case 'search':
      console.log('搜索功能开发中...');
      break;
  }

  await mainMenu();
}

async function installWizard(): Promise<void> {
  // 选择全局或项目
  const { scope } = await inquirer.prompt([
    {
      type: 'list',
      name: 'scope',
      message: '安装到:',
      choices: [
        { name: '全局 (所有项目可用)', value: 'global' },
        { name: '当前项目', value: 'project' },
      ],
    },
  ]);

  // 选择来源
  const { source } = await inquirer.prompt([
    {
      type: 'list',
      name: 'source',
      message: '插件来源:',
      choices: [
        { name: '本地路径', value: 'local' },
        { name: 'NPM包', value: 'npm' },
      ],
    },
  ]);

  // 输入路径或包名
  let input: string;
  if (source === 'local') {
    const { path } = await inquirer.prompt([
      {
        type: 'input',
        name: 'path',
        message: '请输入插件路径:',
        validate: (input) => input.length > 0 || '请输入有效路径',
      },
    ]);
    input = path;
  } else {
    const { package: pkg } = await inquirer.prompt([
      {
        type: 'input',
        name: 'package',
        message: '请输入NPM包名 (如 @scope/name):',
        validate: (input) => input.length > 0 || '请输入有效包名',
      },
    ]);
    input = pkg;
  }

  // 确认安装
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `确认安装到${scope === 'global' ? '全局' : '当前项目'}?`,
      default: true,
    },
  ]);

  if (!confirm) {
    console.log('已取消');
    return;
  }

  // 执行安装
  await install({ scope, source, path: source === 'local' ? input : undefined, npmPackage: source === 'npm' ? input : undefined });
}

async function listPlugins(): Promise<void> {
  await list();
}
```

**Step 2: 提交**

```bash
git add packages/fus-cli/src/interactive/wizard.ts
git commit -m "feat: 添加交互式安装向导"
```

---

## 任务 4: 创建安装命令

**Files:**
- Create: `packages/fus-cli/src/commands/install.ts`

**Step 1: 创建安装命令**

```typescript
import { $, path } from 'zx';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { Scope, Source, InstallOptions } from '../types.js';

const GLOBAL_PATH = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
const PROJECT_PATH = '.claude/skills';

export async function install(options: InstallOptions): Promise<void> {
  const targetPath = options.scope === 'global' ? GLOBAL_PATH : PROJECT_PATH;

  console.log(`\n→ 目标路径: ${targetPath}`);

  try {
    if (options.source === 'local' && options.path) {
      await installFromLocal(options.path, targetPath);
    } else if (options.source === 'npm' && options.npmPackage) {
      await installFromNpm(options.npmPackage, targetPath);
    }

    console.log('✅ 安装成功!\n');
  } catch (error) {
    console.error('❌ 安装失败:', error);
    process.exit(1);
  }
}

async function installFromLocal(sourcePath: string, targetPath: string): Promise<void> {
  const resolvedPath = path.resolve(sourcePath.replace('~', process.env.HOME || ''));

  if (!existsSync(resolvedPath)) {
    throw new Error(`路径不存在: ${resolvedPath}`);
  }

  // 获取插件名称
  const pluginName = path.basename(resolvedPath);
  const destPath = path.join(targetPath, pluginName);

  // 复制文件
  await fs.mkdir(targetPath, { recursive: true });
  await fs.cp(resolvedPath, destPath, { recursive: true });

  console.log(`已安装: ${pluginName} → ${destPath}`);
}

async function installFromNpm(packageName: string, targetPath: string): Promise<void> {
  // 临时目录安装
  const tempDir = path.join(targetPath, '.temp');
  await fs.mkdir(tempDir, { recursive: true });

  try {
    // 安装到临时目录
    await $`npm pack ${packageName} --pack-destination=${tempDir}`;

    // 解压
    const tarball = (await fs.readdir(tempDir)).find(f => f.endsWith('.tgz'));
    if (!tarball) {
      throw new Error('下载失败');
    }

    // 解压tarball
    await $`mkdir -p ${targetPath}/${packageName} && tar -xzf ${path.join(tempDir, tarball)} -C ${targetPath}/${packageName} --strip-components=1`;

    console.log(`已安装: ${packageName}`);
  } finally {
    // 清理临时目录
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}
```

**Step 2: 提交**

```bash
git add packages/fus-cli/src/commands/install.ts
git commit -m "feat: 添加install命令"
```

---

## 任务 5: 创建列表命令

**Files:**
- Create: `packages/fus-cli/src/commands/list.ts`

**Step 1: 创建列表命令**

```typescript
import fs from 'fs/promises';
import path from 'path';
import { $, echo } from 'zx';

export async function list(): Promise<void> {
  echo('\n📦 已安装的插件:\n');

  // 全局插件
  const globalPath = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
  echo('全局插件:');
  await listDirectory(globalPath);

  // 项目插件
  const projectPath = '.claude/skills';
  echo('\n项目插件:');
  await listDirectory(projectPath);

  echo('');
}

async function listDirectory(dirPath: string): Promise<void> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    const plugins = entries.filter(e => e.isDirectory() && !e.name.startsWith('.'));

    if (plugins.length === 0) {
      echo('  (无)');
      return;
    }

    for (const plugin of plugins) {
      echo(`  - ${plugin.name}`);
    }
  } catch {
    echo('  (目录不存在)');
  }
}
```

**Step 2: 提交**

```bash
git add packages/fus-cli/src/commands/list.ts
git commit -m "feat: 添加list命令"
```

---

## 任务 6: 添加fus主入口集成CLI

**Files:**
- Modify: `packages/fus-cli/src/index.ts`

**Step 1: 更新入口文件支持命令行参数**

```typescript
#!/usr/bin/env node

import { mainMenu } from './interactive/wizard.js';
import { install } from './commands/install.js';
import { list } from './commands/list.js';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  console.log('fus - Fus Plugin Manager\n');

  if (!command) {
    await mainMenu();
    return;
  }

  // 支持命令行参数
  switch (command) {
    case 'install':
    case 'i':
      const scope = args.includes('--global') ? 'global' : 'project';
      const source = args.includes('--npm') ? 'npm' : 'local';
      const target = args.find(a => !a.startsWith('-')) || '';
      await install({ scope, source, path: source === 'local' ? target : undefined, npmPackage: source === 'npm' ? target : undefined });
      break;
    case 'list':
    case 'ls':
      await list();
      break;
    default:
      console.log(`未知命令: ${command}`);
      console.log('使用: fus [install|list]');
      process.exit(1);
  }
}

main();
```

**Step 2: 提交**

```bash
git add packages/fus-cli/src/index.ts
git commit -m "feat: 添加CLI命令行支持"
```

---

## 任务 7: 构建并测试

**Step 1: 构建**

```bash
cd packages/fus-cli
pnpm build
```

**Step 2: 测试**

```bash
node dist/index.js
# 或
node dist/index.js list
```

**Step 3: 提交**

```bash
git add -A
git commit -m "feat: 完成fus-cli工具开发"
```

---

**Plan complete and saved to `docs/plans/2026-03-02-fus-cli-plan.md`**. 两个执行选项：

**1. Subagent-Driven (本会话)** - 我为每个任务派遣一个subagent，任务间进行代码审查，快速迭代

**2. Manual Execution (手动执行)** - 我直接在当前会话中实现所有任务

**请选择你偏好的执行方式？**
