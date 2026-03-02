import inquirer from 'inquirer';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { getPlugins, type PluginInfo } from './list.js';

export async function uninstall(): Promise<void> {
  console.log('\n🗑️  删除插件\n');

  const plugins = await getPlugins();

  if (plugins.length === 0) {
    console.log('没有已安装的插件。\n');
    return;
  }

  // 让用户选择要删除的插件
  const { selectedPlugin } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedPlugin',
      message: '请选择要删除的插件:',
      choices: plugins.map(p => ({
        name: `${p.name} (${p.scope === 'global' ? '全局' : '项目'})`,
        value: p.name,
      })),
    },
  ]);

  // 确认删除
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `确认删除插件 "${selectedPlugin}"?`,
      default: false,
    },
  ]);

  if (!confirm) {
    console.log('已取消删除。\n');
    return;
  }

  // 执行删除
  const plugin = plugins.find(p => p.name === selectedPlugin);
  if (plugin && existsSync(plugin.path)) {
    await fs.rm(plugin.path, { recursive: true, force: true });
    console.log(`✅ 已删除插件: ${selectedPlugin}\n`);
  } else {
    console.log(`❌ 删除失败: 插件路径不存在\n`);
  }
}

export async function uninstallByName(pluginName: string, scope?: 'global' | 'project'): Promise<boolean> {
  const plugins = await getPlugins();
  const plugin = plugins.find(p => p.name === pluginName && (!scope || p.scope === scope));

  if (!plugin) {
    console.log(`❌ 未找到插件: ${pluginName}\n`);
    return false;
  }

  if (existsSync(plugin.path)) {
    await fs.rm(plugin.path, { recursive: true, force: true });
    console.log(`✅ 已删除插件: ${pluginName}\n`);
    return true;
  }

  console.log(`❌ 删除失败: 插件路径不存在\n`);
  return false;
}
