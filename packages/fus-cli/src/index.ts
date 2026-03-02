#!/usr/bin/env node

import { mainMenu } from './interactive/wizard.js';

console.log('fus - Fus Plugin Manager\n');

await mainMenu();
