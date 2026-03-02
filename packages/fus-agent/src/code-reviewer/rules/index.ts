import type { RuleConfig } from '@fus/core';

export const defaultRules: Record<string, RuleConfig> = {
  // 代码质量规则
  'naming-convention': {
    id: 'naming-convention',
    name: '命名规范',
    enabled: true,
    severity: 'warning',
    patterns: [
      '^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$', // camelCase
      '^[A-Z][a-zA-Z0-9]*$', // PascalCase
      '^[a-z][a-z0-9]*(_[a-z0-9]+)*$', // snake_case
    ],
  },
  'code-complexity': {
    id: 'code-complexity',
    name: '代码复杂度',
    enabled: true,
    severity: 'warning',
    patterns: ['function .*\\{.{200,}\\}'],
  },
  'dead-code': {
    id: 'dead-code',
    name: '死代码',
    enabled: true,
    severity: 'warning',
    patterns: ['// TODO:.*', '// FIXME:.*', '// XXX:.*'],
  },
  // 安全规则
  'sql-injection': {
    id: 'sql-injection',
    name: 'SQL注入',
    enabled: true,
    severity: 'error',
    patterns: ['`SELECT.*\\$\\{', '`INSERT.*\\$\\{', '`UPDATE.*\\$\\{', '`DELETE.*\\$\\{'],
  },
  'hardcoded-secrets': {
    id: 'hardcoded-secrets',
    name: '硬编码密钥',
    enabled: true,
    severity: 'error',
    patterns: ['password\\s*=\\s*["\'][^"\']+["\']', 'api[_-]?key\\s*=\\s*["\'][^"\']+["\']'],
  },
  // 性能规则
  'memory-leak': {
    id: 'memory-leak',
    name: '内存泄漏',
    enabled: true,
    severity: 'warning',
    patterns: ['addEventListener.*removeEventListener'],
  },
  // 测试规则
  'test-coverage': {
    id: 'test-coverage',
    name: '测试覆盖率',
    enabled: true,
    severity: 'info',
    patterns: [],
  },
  // 文档规则
  'jsdoc-completeness': {
    id: 'jsdoc-completeness',
    name: 'JSDoc完整性',
    enabled: true,
    severity: 'info',
    patterns: [],
  },
};

export function getRules(config?: Record<string, Partial<RuleConfig>>): RuleConfig[] {
  const merged = { ...defaultRules };
  if (config) {
    for (const [key, value] of Object.entries(config)) {
      if (merged[key]) {
        merged[key] = { ...merged[key], ...value };
      }
    }
  }
  return Object.values(merged).filter((rule) => rule.enabled);
}
