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
      message: 'Select action:',
      choices: [
        { name: 'Install Plugin', value: 'install' },
        { name: 'Update Plugin', value: 'update' },
        { name: 'Remove Plugin', value: 'uninstall' },
        { name: 'List Plugins', value: 'list' },
        { name: 'Search Plugins', value: 'search' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);

  if (action === 'exit') {
    console.log('Goodbye!');
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
  // Select global or project
  const { scope } = await inquirer.prompt([
    {
      type: 'list',
      name: 'scope',
      message: 'Install to:',
      choices: [
        { name: 'Global (available to all projects)', value: 'global' },
        { name: 'Current project', value: 'project' },
      ],
    },
  ]);

  // Select source
  const { source } = await inquirer.prompt([
    {
      type: 'list',
      name: 'source',
      message: 'Plugin source:',
      choices: [
        { name: 'Local path', value: 'local' },
        { name: 'NPM package', value: 'npm' },
      ],
    },
  ]);

  // Enter path or package name
  let input: string;
  if (source === 'local') {
    const { path } = await inquirer.prompt([
      {
        type: 'input',
        name: 'path',
        message: 'Enter plugin path:',
        validate: (input) => input.length > 0 || 'Please enter a valid path',
      },
    ]);
    input = path;
  } else {
    const { pkg } = await inquirer.prompt([
      {
        type: 'input',
        name: 'package',
        message: 'Enter NPM package name (e.g., @scope/name):',
        validate: (input) => input.length > 0 || 'Please enter a valid package name',
      },
    ]);
    input = pkg;
  }

  // Confirm installation
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Confirm install to ${scope === 'global' ? 'global' : 'current project'}?`,
      default: true,
    },
  ]);

  if (!confirm) {
    console.log('Cancelled');
    return;
  }

  // Execute installation
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
