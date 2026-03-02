import type { RuleResult } from '@fus/core';

export interface ReviewReport {
  total: number;
  errors: number;
  warnings: number;
  infos: number;
  results: RuleResult[];
}

export class Reporter {
  format(results: RuleResult[]): ReviewReport {
    const report: ReviewReport = {
      total: results.length,
      errors: 0,
      warnings: 0,
      infos: 0,
      results,
    };

    for (const result of results) {
      if (result.severity === 'error') report.errors++;
      else if (result.severity === 'warning') report.warnings++;
      else report.infos++;
    }

    return report;
  }

  toMarkdown(report: ReviewReport): string {
    let md = `# 代码审查报告\n\n`;
    md += `**总计**: ${report.total} 个问题\n`;
    md += `- 🔴 错误: ${report.errors}\n`;
    md += `- 🟡 警告: ${report.warnings}\n`;
    md += `- 🔵 信息: ${report.infos}\n\n`;

    if (report.results.length > 0) {
      md += `## 详细结果\n\n`;
      for (const result of report.results) {
        const icon = result.severity === 'error' ? '🔴' : result.severity === 'warning' ? '🟡' : '🔵';
        md += `${icon} **${result.ruleId}**: ${result.message}`;
        if (result.line) md += ` (行 ${result.line})`;
        md += '\n';
      }
    }

    return md;
  }

  toJSON(report: ReviewReport): string {
    return JSON.stringify(report, null, 2);
  }
}
