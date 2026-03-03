import inquirer from 'inquirer';
import { getPlugins } from './list.js';
import { install } from './install.js';
import type { InstallOptions } from '../types.js';

export async function update(): Promise<void> {
  console.log('\n🔄 Update Plugins\n');

  const plugins = await getPlugins();

  if (plugins.length === 0) {
    console.log('No plugins installed.\n');
    return;
  }

  // Let user select which plugin to update
  const { selectedPlugin } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedPlugin',
      message: 'Select plugin to update:',
      choices: [
        { name: 'Update all plugins', value: '__all__' },
        ...plugins.map(p => ({
          name: `${p.name} (${p.scope === 'global' ? 'global' : 'project'})`,
          value: p.name,
        })),
      ],
    },
  ]);

  if (selectedPlugin === '__all__') {
    // Update all plugins
    console.log('\nUpdate all plugins feature under development...\n');
    return;
  }

  // Get plugin info
  const plugin = plugins.find(p => p.name === selectedPlugin);
  if (!plugin) {
    console.log('❌ Plugin not found\n');
    return;
  }

  // Confirm update
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm update plugin "${selectedPlugin}"?`,
      default: true,
    },
  ]);

  if (!confirm) {
    console.log('Update cancelled.\n');
    return;
  }

  // Reinstall plugin (NPM packages need to re-download)
  console.log('\nUpdate requires original installation source.');
  console.log('Please use uninstall and then reinstall.\n');
}

export async function updateByName(pluginName: string): Promise<boolean> {
  const plugins = await getPlugins();
  const plugin = plugins.find(p => p.name === pluginName);

  if (!plugin) {
    console.log(`❌ Plugin not found: ${pluginName}\n`);
    return false;
  }

  console.log(`\n🔄 Updating plugin: ${pluginName}\n`);

  // Reinstall
  const options: InstallOptions = {
    scope: plugin.scope,
    source: 'local',
  };

  await install(options);
  return true;
}
