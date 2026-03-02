#!/usr/bin/env node

import { CommitSkill } from './skills/commit/index.js';
import { PrSkill } from './skills/pr/index.js';
import { TestSkill } from './skills/test/index.js';
import { LintSkill } from './skills/lint/index.js';

const skills = {
  commit: new CommitSkill(),
  pr: new PrSkill(),
  test: new TestSkill(),
  lint: new LintSkill(),
};

const args = process.argv.slice(2);
const skillName = args[0];
const skillArgs = args.slice(1);

async function main() {
  if (!skillName || !skills[skillName as keyof typeof skills]) {
    console.log('可用技能: commit, pr, test, lint');
    console.log('使用: fus-skills <skill> [args...]');
    process.exit(1);
  }

  const skill = skills[skillName as keyof typeof skills];
  const result = await skill.execute({ args: skillArgs });
  console.log(skill.format(result));
}

main();
