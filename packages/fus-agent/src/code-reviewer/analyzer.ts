import type { RuleConfig, RuleResult } from '@fus/core';
import { getRules } from './rules/index.js';

export class CodeAnalyzer {
  private rules: RuleConfig[];

  constructor(ruleConfig?: Record<string, Partial<RuleConfig>>) {
    this.rules = getRules(ruleConfig);
  }

  async analyze(file: string, content: string): Promise<RuleResult[]> {
    const results: RuleResult[] = [];

    for (const rule of this.rules) {
      for (const pattern of rule.patterns) {
        const regex = new RegExp(pattern, 'gim');
        let match;
        while ((match = regex.exec(content)) !== null) {
          const lines = content.substring(0, match.index).split('\n');
          results.push({
            ruleId: rule.id,
            severity: rule.severity,
            message: `${rule.name}: 匹配到 "${match[0]}"`,
            line: lines.length,
            column: lines[lines.length - 1]?.length || 0,
          });
        }
      }
    }

    return results;
  }

  async analyzeMultiple(files: Array<{ path: string; content: string }>): Promise<RuleResult[]> {
    const allResults: RuleResult[] = [];

    for (const file of files) {
      const results = await this.analyze(file.path, file.content);
      allResults.push(...results.map((r) => ({ ...r, file: file.path } as RuleResult & { file: string })));
    }

    return allResults;
  }
}
