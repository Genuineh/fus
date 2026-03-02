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
  const mergedRules: Record<string, unknown> = { ...base.rules };

  if (override.rules) {
    for (const [key, value] of Object.entries(override.rules)) {
      if (value && typeof value === 'object') {
        mergedRules[key] = { ...(base.rules?.[key] as object), ...value };
      } else {
        mergedRules[key] = value;
      }
    }
  }

  return {
    ...base,
    ...override,
    rules: mergedRules as FusConfig['rules'],
  };
}
