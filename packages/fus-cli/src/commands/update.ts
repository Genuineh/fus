import inquirer from 'inquirer';
import { getPlugins } from './list.js';
import { install } from './install.js';
import type { InstallOptions } from '../types.js';

export async function update(): Promise<void> {
  console.log('\n🔄 更新插件\n');

  const plugins = await getPlugins();

  if (plugins.length === 0) {
    console.log('没有已安装的插件。\n');
    return;
  }

  // 让用户选择要更新的插件
  const { selectedPlugin } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedPlugin',
      message: '请选择要更新的插件:',
      choices: [
        { name: '更新所有插件', value: '__all__' },
        ...plugins.map(p => ({
          name: `${p.name} (${p.scope === 'global' ? '全局' : '项目'})`,
          value: p.name,
        })),
      ],
    },
  ]);

  if (selectedPlugin === '__all__') {
    // 更新所有插件
    console.log('\n更新所有插件功能开发中...\n');
    return;
  }

  // 获取插件信息
  const plugin = plugins.find(p => p.name === selectedPlugin);
  if (!plugin) {
    console.log('❌ 未找到插件\n');
    return;
  }

  // 确认更新
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `确认更新插件 "${selectedPlugin}"?`,
      default: true,
    },
  ]);

  if (!confirm) {
    console.log('已取消更新。\n');
    return;
  }

  // 重新安装插件（NPM包需要重新下载）
  console.log('\n更新插件功能需要原始安装源。');
  console.log('请使用 uninstall 删除后重新安装。\n');
}

export async function updateByName(pluginName: string): Promise<boolean> {
  const plugins = await getPlugins();
  const plugin = plugins.find(p => p.name === pluginName);

  if (!plugin) {
    console.log(`❌ 未找到插件: ${pluginName}\n`);
    return false;
  }

  console.log(`\n🔄 正在更新插件: ${pluginName}\n`);

  // 重新安装
  const options: InstallOptions = {
    scope: plugin.scope,
    source: 'local',
  };

  await install(options);
  return true;
}
