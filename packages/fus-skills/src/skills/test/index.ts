import { $ } from 'zx';
import { existsSync } from 'fs';
import { BaseSkill, type SkillInput, type SkillResult } from '../../base/skill.js';

export class TestSkill extends BaseSkill {
  name = 'test';
  description = '运行测试并报告结果';
  aliases = ['/test', '/run-test'];

  async validate(input: SkillInput): Promise<boolean> {
    return existsSync('package.json');
  }

  async execute(input: SkillInput): Promise<SkillResult> {
    try {
      const testCommand = this.detectTestCommand();
      if (!testCommand) {
        return { success: false, message: '未找到测试命令，请在package.json中配置test脚本' };
      }

      const result = await $([testCommand]);

      const passed = result.exitCode === 0;
      return {
        success: passed,
        message: passed ? '测试通过' : '测试失败',
        data: { output: result.stdout, exitCode: result.exitCode },
      };
    } catch (error) {
      return { success: false, message: `测试运行失败: ${error}` };
    }
  }

  private detectTestCommand(): string | null {
    return 'pnpm test';
  }
}
