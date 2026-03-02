import type { SkillResult } from '@fus/core';

export type { SkillResult } from '@fus/core';

export interface SkillInput {
  args?: string[];
  options?: Record<string, unknown>;
}

export abstract class BaseSkill {
  abstract name: string;
  abstract description: string;
  abstract aliases: string[];

  abstract validate(input: SkillInput): Promise<boolean>;
  abstract execute(input: SkillInput): Promise<SkillResult>;

  format(result: SkillResult): string {
    if (result.success) {
      return `✅ ${result.message}`;
    }
    return `❌ ${result.message}`;
  }
}
