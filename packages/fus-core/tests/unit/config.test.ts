import { describe, it, expect } from 'vitest';
import { mergeConfig } from '../src/config/index.js';

describe('config', () => {
  it('should merge configs', () => {
    const base = { rules: { rule1: { enabled: true } } };
    const override = { rules: { rule2: { enabled: false } } };
    const merged = mergeConfig(base, override);
    expect(merged.rules?.rule1).toBeDefined();
    expect(merged.rules?.rule2).toBeDefined();
  });

  it('should override existing rules', () => {
    const base = { rules: { rule1: { enabled: true, severity: 'warning' as const } } };
    const override = { rules: { rule1: { enabled: false } } };
    const merged = mergeConfig(base, override);
    expect(merged.rules?.rule1?.enabled).toBe(false);
    expect(merged.rules?.rule1?.severity).toBe('warning');
  });
});
