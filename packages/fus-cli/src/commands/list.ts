import fs from 'fs/promises';
import path from 'path';

const GLOBAL_PATH = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
const PROJECT_PATH = '.claude/skills';

export const GlobalPath = GLOBAL_PATH;
export const ProjectPath = PROJECT_PATH;

export interface PluginInfo {
  name: string;
  path: string;
  scope: 'global' | 'project';
}

export async function list(): Promise<void> {
  console.log('\n📦 Installed Plugins:\n');

  // Global plugins
  console.log('Global Plugins:');
  await listDirectory(GLOBAL_PATH);

  // Project plugins
  console.log('\nProject Plugins:');
  await listDirectory(PROJECT_PATH);

  console.log('');
}

export async function getPlugins(): Promise<PluginInfo[]> {
  const plugins: PluginInfo[] = [];

  // Get global plugins
  try {
    const globalEntries = await fs.readdir(GLOBAL_PATH, { withFileTypes: true });
    for (const entry of globalEntries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        plugins.push({
          name: entry.name,
          path: path.join(GLOBAL_PATH, entry.name),
          scope: 'global',
        });
      }
    }
  } catch {
    // Directory doesn't exist
  }

  // Get project plugins
  try {
    const projectEntries = await fs.readdir(PROJECT_PATH, { withFileTypes: true });
    for (const entry of projectEntries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        plugins.push({
          name: entry.name,
          path: path.join(PROJECT_PATH, entry.name),
          scope: 'project',
        });
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return plugins;
}

async function listDirectory(dirPath: string): Promise<void> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    const plugins = entries.filter(e => e.isDirectory() && !e.name.startsWith('.'));

    if (plugins.length === 0) {
      console.log('  (none)');
      return;
    }

    for (const plugin of plugins) {
      console.log(`  - ${plugin.name}`);
    }
  } catch {
    console.log('  (directory does not exist)');
  }
}
