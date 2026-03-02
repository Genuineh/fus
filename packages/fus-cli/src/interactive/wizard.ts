import inquirer from 'inquirer';
import type { Scope, Source } from '../types.js';
import { install } from '../commands/install.js';
import { list } from '../commands/list.js';
import { uninstall } from '../commands/uninstall.js';
import { update } from '../commands/update.js';
import { searchInteractive } from '../commands/search.js';

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
      await updateWizard();
      break;
    case 'uninstall':
      await uninstallWizard();
      break;
    case 'search':
      await searchWizard();
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

async function uninstallWizard(): Promise<void> {
  await uninstall();
}

async function searchWizard(): Promise<void> {
  await searchInteractive();
}

async function updateWizard(): Promise<void> {
  await update();
}
