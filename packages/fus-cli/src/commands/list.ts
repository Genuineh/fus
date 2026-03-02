import fs from 'fs/promises';
import path from 'path';

const GLOBAL_PATH = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
const PROJECT_PATH = '.claude/skills';

export async function list(): Promise<void> {
  console.log('\n📦 已安装的插件:\n');

  // 全局插件
  console.log('全局插件:');
  await listDirectory(GLOBAL_PATH);

  // 项目插件
  console.log('\n项目插件:');
  await listDirectory(PROJECT_PATH);

  console.log('');
}

async function listDirectory(dirPath: string): Promise<void> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    const plugins = entries.filter(e => e.isDirectory() && !e.name.startsWith('.'));

    if (plugins.length === 0) {
      console.log('  (无)');
      return;
    }

    for (const plugin of plugins) {
      console.log(`  - ${plugin.name}`);
    }
  } catch {
    console.log('  (目录不存在)');
  }
}
