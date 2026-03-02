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
    default:
      console.log(`未知命令: ${command}`);
      console.log('使用: fus [install|list]');
      process.exit(1);
  }
}

main();
