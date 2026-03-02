import type { BaseSkill } from './base/skill.js';
import { CommitSkill } from './skills/commit/index.js';
import { PrSkill } from './skills/pr/index.js';
import { TestSkill } from './skills/test/index.js';
import { LintSkill } from './skills/lint/index.js';

export const skillRegistry: Map<string, BaseSkill> = new Map();

export function registerSkill(skill: BaseSkill): void {
  skillRegistry.set(skill.name, skill);
  for (const alias of skill.aliases) {
    skillRegistry.set(alias, skill);
  }
}

export function getSkill(name: string): BaseSkill | undefined {
  return skillRegistry.get(name);
}

export function getAllSkills(): BaseSkill[] {
  const seen = new Set<string>();
  const skills: BaseSkill[] = [];
  for (const skill of skillRegistry.values()) {
    if (!seen.has(skill.name)) {
      seen.add(skill.name);
      skills.push(skill);
    }
  }
  return skills;
}

// 默认注册
registerSkill(new CommitSkill());
registerSkill(new PrSkill());
registerSkill(new TestSkill());
registerSkill(new LintSkill());
