import path from 'path';
import fs from 'fs/promises';

const GLOBAL_PATH = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
const PROJECT_PATH = '.claude/skills';

export async function check(): Promise<void> {
  console.log('🔍 Fus 状态检查\n');

  // 检查 fus 安装位置
  console.log('📍 安装位置:');
  console.log(`   全局: ${GLOBAL_PATH}`);
  console.log(`   项目: ${PROJECT_PATH}`);

  // 检查全局插件
  console.log('\n📦 全局插件:');
  try {
    const globalExists = await fs.access(GLOBAL_PATH).then(() => true).catch(() => false);
    if (globalExists) {
      const globalPlugins = await fs.readdir(GLOBAL_PATH);
      if (globalPlugins.length > 0) {
        for (const plugin of globalPlugins) {
          console.log(`   - ${plugin}`);
        }
      } else {
        console.log('   (无)');
      }
    } else {
      console.log('   (未安装)');
    }
  } catch {
    console.log('   (无)');
  }

  // 检查项目插件
  console.log('\n📦 项目插件:');
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
        console.log('   (无)');
      }
    } else {
      console.log('   (无)');
    }
  } catch {
    console.log('   (无)');
  }

  console.log('');
}
