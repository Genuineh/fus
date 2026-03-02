import { readFile } from 'fs/promises';
import { resolve } from 'path';
import type { FusConfig } from '../types/index.js';

const CONFIG_FILES = ['.fusrc.json', '.fusrc.js', 'fus.config.js'];

export async function loadConfig(cwd: string = process.cwd()): Promise<FusConfig> {
  for (const file of CONFIG_FILES) {
    try {
      const configPath = resolve(cwd, file);
      const content = await readFile(configPath, 'utf-8');
      if (file.endsWith('.json')) {
        return JSON.parse(content);
      }
    } catch {
      // 配置不存在，继续尝试下一个
    }
  }
  return {};
}

export function mergeConfig(base: FusConfig, override: Partial<FusConfig>): FusConfig {
  return {
    ...base,
    rules: { ...base.rules, ...override.rules },
    skills: { ...base.skills, ...override.skills },
  };
}
