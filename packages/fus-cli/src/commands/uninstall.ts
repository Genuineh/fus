import inquirer from 'inquirer';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { getPlugins, type PluginInfo } from './list.js';

export async function uninstall(): Promise<void> {
  console.log('\n🗑️  Remove Plugin\n');

  const plugins = await getPlugins();

  if (plugins.length === 0) {
    console.log('No plugins installed.\n');
    return;
  }

  // Let user select which plugin to remove
  const { selectedPlugin } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedPlugin',
      message: 'Select plugin to remove:',
      choices: plugins.map(p => ({
        name: `${p.name} (${p.scope === 'global' ? 'global' : 'project'})`,
        value: p.name,
      })),
    },
  ]);

  // Confirm removal
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm remove plugin "${selectedPlugin}"?`,
      default: false,
    },
  ]);

  if (!confirm) {
    console.log('Removal cancelled.\n');
    return;
  }

  // Execute removal
  const plugin = plugins.find(p => p.name === selectedPlugin);
  if (plugin && existsSync(plugin.path)) {
    await fs.rm(plugin.path, { recursive: true, force: true });
    console.log(`✅ Plugin removed: ${selectedPlugin}\n`);
  } else {
    console.log(`❌ Removal failed: plugin path does not exist\n`);
  }
}

export async function uninstallByName(pluginName: string, scope?: 'global' | 'project'): Promise<boolean> {
  const plugins = await getPlugins();
  const plugin = plugins.find(p => p.name === pluginName && (!scope || p.scope === scope));

  if (!plugin) {
    console.log(`❌ Plugin not found: ${pluginName}\n`);
    return false;
  }

  if (existsSync(plugin.path)) {
    await fs.rm(plugin.path, { recursive: true, force: true });
    console.log(`✅ Plugin removed: ${pluginName}\n`);
    return true;
  }

  console.log(`❌ Removal failed: plugin path does not exist\n`);
  return false;
}
