import type { RuleResult } from '@fus/core';

export interface AgentInput {
  files?: string[];
  diff?: string;
  prNumber?: number;
}

export interface AgentOutput {
  results: RuleResult[];
  summary: string;
}

export abstract class BaseAgent {
  abstract name: string;
  abstract description: string;

  abstract analyze(input: AgentInput): Promise<AgentOutput>;

  protected async parseInput(input: AgentInput): Promise<string[]> {
    if (input.files) {
      return input.files;
    }
    if (input.diff) {
      return this.extractFilesFromDiff(input.diff);
    }
    return [];
  }

  protected extractFilesFromDiff(diff: string): string[] {
    const files = new Set<string>();
    const lines = diff.split('\n');
    for (const line of lines) {
      if (line.startsWith('+++ b/') || line.startsWith('a/')) {
        files.add(line.replace(/^[+-]{3}\s*[ab]\//, ''));
      }
    }
    return Array.from(files);
  }
}
