import { $ } from 'zx';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { InstallOptions } from '../types.js';

const GLOBAL_PATH = path.join(process.env.HOME || '~', '.claude/plugins/user-plugins');
const PROJECT_PATH = '.claude/skills';

export async function install(options: InstallOptions): Promise<void> {
  const targetPath = options.scope === 'global' ? GLOBAL_PATH : PROJECT_PATH;

  console.log(`\n→ Target path: ${targetPath}`);

  try {
    if (options.source === 'local' && options.path) {
      await installFromLocal(options.path, targetPath);
    } else if (options.source === 'npm' && options.npmPackage) {
      await installFromNpm(options.npmPackage, targetPath);
    }

    console.log('✅ Installation successful!\n');
  } catch (error) {
    console.error('❌ Installation failed:', error);
    process.exit(1);
  }
}

async function installFromLocal(sourcePath: string, targetPath: string): Promise<void> {
  const resolvedPath = path.resolve(sourcePath.replace('~', process.env.HOME || ''));

  if (!existsSync(resolvedPath)) {
    throw new Error(`Path does not exist: ${resolvedPath}`);
  }

  // Get plugin name
  const pluginName = path.basename(resolvedPath);
  const destPath = path.join(targetPath, pluginName);

  // Check if it's a subdirectory or same directory
  const resolvedDest = path.resolve(destPath);
  if (resolvedPath.startsWith(resolvedDest) || resolvedPath === resolvedDest) {
    throw new Error(`Cannot install a directory into its own subdirectory: ${resolvedPath}`);
  }

  // Copy files
  await fs.mkdir(targetPath, { recursive: true });
  await fs.cp(resolvedPath, destPath, { recursive: true });

  console.log(`Installed: ${pluginName} → ${destPath}`);
}

async function installFromNpm(packageName: string, targetPath: string): Promise<void> {
  // Temporary directory for installation
  const tempDir = path.join(targetPath, '.temp');
  await fs.mkdir(tempDir, { recursive: true });

  try {
    // Install to temporary directory
    await $`npm pack ${packageName} --pack-destination=${tempDir}`;

    // Extract
    const tarball = (await fs.readdir(tempDir)).find(f => f.endsWith('.tgz'));
    if (!tarball) {
      throw new Error('Download failed');
    }

    // Extract tarball
    const destDir = path.join(targetPath, packageName);
    await fs.mkdir(destDir, { recursive: true });
    await $`tar -xzf ${path.join(tempDir, tarball)} -C ${destDir} --strip-components=1`;

    console.log(`Installed: ${packageName}`);
  } finally {
    // Clean up temporary directory
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}
