import { $ } from 'zx';
import { existsSync } from 'fs';
import { BaseSkill, type SkillInput, type SkillResult } from '../../base/skill.js';

export class LintSkill extends BaseSkill {
  name = 'lint';
  description = '运行代码质量检查';
  aliases = ['/lint', '/code-quality'];

  async validate(input: SkillInput): Promise<boolean> {
    return existsSync('package.json');
  }

  async execute(input: SkillInput): Promise<SkillResult> {
    try {
      const lintCommand = this.detectLintCommand();
      if (!lintCommand) {
        return { success: false, message: '未找到lint命令，请在package.json中配置lint脚本' };
      }

      const result = await $`${lintCommand}`;

      const passed = result.exitCode === 0;
      return {
        success: passed,
        message: passed ? 'Lint通过' : 'Lint有问题',
        data: { output: result.stdout, exitCode: result.exitCode },
      };
    } catch (error) {
      return { success: false, message: `Lint运行失败: ${error}` };
    }
  }

  private detectLintCommand(): string | null {
    return 'pnpm lint';
  }
}
