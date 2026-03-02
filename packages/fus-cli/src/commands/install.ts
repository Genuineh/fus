import { $ } from 'zx';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { InstallOptions } from '../types.js';

const GLOBAL_PATH = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
const PROJECT_PATH = '.claude/skills';

export async function install(options: InstallOptions): Promise<void> {
  const targetPath = options.scope === 'global' ? GLOBAL_PATH : PROJECT_PATH;

  console.log(`\n→ 目标路径: ${targetPath}`);

  try {
    if (options.source === 'local' && options.path) {
      await installFromLocal(options.path, targetPath);
    } else if (options.source === 'npm' && options.npmPackage) {
      await installFromNpm(options.npmPackage, targetPath);
    }

    console.log('✅ 安装成功!\n');
  } catch (error) {
    console.error('❌ 安装失败:', error);
    process.exit(1);
  }
}

async function installFromLocal(sourcePath: string, targetPath: string): Promise<void> {
  const resolvedPath = path.resolve(sourcePath.replace('~', process.env.HOME || ''));

  if (!existsSync(resolvedPath)) {
    throw new Error(`路径不存在: ${resolvedPath}`);
  }

  // 获取插件名称
  const pluginName = path.basename(resolvedPath);
  const destPath = path.join(targetPath, pluginName);

  // 检查是否是自身子目录或相同目录
  const resolvedDest = path.resolve(destPath);
  if (resolvedPath.startsWith(resolvedDest) || resolvedPath === resolvedDest) {
    throw new Error(`不能将目录安装到自身的子目录中: ${resolvedPath}`);
  }

  // 复制文件
  await fs.mkdir(targetPath, { recursive: true });
  await fs.cp(resolvedPath, destPath, { recursive: true });

  console.log(`已安装: ${pluginName} → ${destPath}`);
}

async function installFromNpm(packageName: string, targetPath: string): Promise<void> {
  // 临时目录安装
  const tempDir = path.join(targetPath, '.temp');
  await fs.mkdir(tempDir, { recursive: true });

  try {
    // 安装到临时目录
    await $`npm pack ${packageName} --pack-destination=${tempDir}`;

    // 解压
    const tarball = (await fs.readdir(tempDir)).find(f => f.endsWith('.tgz'));
    if (!tarball) {
      throw new Error('下载失败');
    }

    // 解压tarball
    const destDir = path.join(targetPath, packageName);
    await fs.mkdir(destDir, { recursive: true });
    await $`tar -xzf ${path.join(tempDir, tarball)} -C ${destDir} --strip-components=1`;

    console.log(`已安装: ${packageName}`);
  } finally {
    // 清理临时目录
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}
