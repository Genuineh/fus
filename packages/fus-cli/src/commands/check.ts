import path from 'path';
import fs from 'fs/promises';

const GLOBAL_PATH = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
const PROJECT_PATH = '.claude/skills';

export async function check(): Promise<void> {
  console.log('🔍 Fus Status Check\n');

  // Check fus installation paths
  console.log('📍 Installation Paths:');
  console.log(`   Global: ${GLOBAL_PATH}`);
  console.log(`   Project: ${PROJECT_PATH}`);

  // Check global plugins
  console.log('\n📦 Global Plugins:');
  try {
    const globalExists = await fs.access(GLOBAL_PATH).then(() => true).catch(() => false);
    if (globalExists) {
      const globalPlugins = await fs.readdir(GLOBAL_PATH);
      if (globalPlugins.length > 0) {
        for (const plugin of globalPlugins) {
          console.log(`   - ${plugin}`);
        }
      } else {
        console.log('   (none)');
      }
    } else {
      console.log('   (not installed)');
    }
  } catch {
    console.log('   (none)');
  }

  // Check project plugins
  console.log('\n📦 Project Plugins:');
  try {
    const projectExists = await fs.access(PROJECT_PATH).then(() => true).catch(() => false);
    if (projectExists) {
      const projectPlugins = await fs.readdir(PROJECT_PATH);
      const validPlugins = projectPlugins.filter(p => !p.startsWith('.'));
      if (validPlugins.length > 0) {
        for (const plugin of validPlugins) {
          console.log(`   - ${plugin}`);
        }
      } else {
        console.log('   (none)');
      }
    } else {
      console.log('   (none)');
    }
  } catch {
    console.log('   (none)');
  }

  console.log('');
}
