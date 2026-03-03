#!/usr/bin/env node

import { mainMenu } from './interactive/wizard.js';
import { install } from './commands/install.js';
import { list } from './commands/list.js';
import { search } from './commands/search.js';
import { update } from './commands/update.js';
import { uninstall } from './commands/uninstall.js';
import { check } from './commands/check.js';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  console.log('fus - Fus Plugin Manager\n');

  if (!command) {
    await mainMenu();
    return;
  }

  // Support command line arguments
  switch (command) {
    case 'install':
    case 'i': {
      const scope = args.includes('--global') ? 'global' : 'project';
      const source = args.includes('--npm') ? 'npm' : 'local';
      const target = args.find(a => !a.startsWith('-')) || '';
      await install({ scope, source, path: source === 'local' ? target : undefined, npmPackage: source === 'npm' ? target : undefined });
      break;
    }
    case 'list':
    case 'ls':
      await list();
      break;
    case 'search':
    case 's': {
      const keyword = args[1] || '';
      if (!keyword) {
        console.log('Please provide a search keyword');
        process.exit(1);
      }
      await search(keyword);
      break;
    }
    case 'check':
    case 'c':
      await check();
      break;
    case 'update':
    case 'u':
      await update();
      break;
    case 'uninstall':
    case 'un':
      await uninstall();
      break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log('Usage: fus [install|list|search|check|update|uninstall]');
      process.exit(1);
  }
}

main();
