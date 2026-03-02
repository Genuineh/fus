import { readFile } from 'fs/promises';
import { BaseAgent, type AgentInput, type AgentOutput } from '../base/agent.js';
import { CodeAnalyzer } from './analyzer.js';
import { Reporter } from './reporter.js';

export class CodeReviewerAgent extends BaseAgent {
  name = 'code-reviewer';
  description = '代码审查Agent，支持质量、安全、性能、测试、文档检查';

  private analyzer: CodeAnalyzer;
  private reporter: Reporter;

  constructor(ruleConfig?: Record<string, unknown>) {
    super();
    this.analyzer = new CodeAnalyzer(ruleConfig as Record<string, Partial<import('@fus/core').RuleConfig>>);
    this.reporter = new Reporter();
  }

  async analyze(input: AgentInput): Promise<AgentOutput> {
    const files = await this.parseInput(input);
    const fileContents = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await readFile(file, 'utf-8');
          return { path: file, content };
        } catch {
          return null;
        }
      })
    );

    const validFiles = fileContents.filter(Boolean) as Array<{ path: string; content: string }>;
    const results = await this.analyzer.analyzeMultiple(validFiles);
    const report = this.reporter.format(results);

    return {
      results,
      summary: this.reporter.toMarkdown(report),
    };
  }
}
