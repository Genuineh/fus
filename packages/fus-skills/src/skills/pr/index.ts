import { $ } from 'zx';
import { BaseSkill, type SkillInput, type SkillResult } from '../../base/skill.js';

export class PrSkill extends BaseSkill {
  name = 'pr';
  description = '创建和管理Pull Request';
  aliases = ['/pr', '/pull-request'];

  async validate(input: SkillInput): Promise<boolean> {
    const subcommand = input.args?.[0];
    return ['create', 'list', 'view', 'close'].includes(subcommand || '');
  }

  async execute(input: SkillInput): Promise<SkillResult> {
    const subcommand = input.args?.[0];

    switch (subcommand) {
      case 'create':
        return this.createPr(input);
      case 'list':
        return this.listPrs(input);
      case 'view':
        return this.viewPr(input);
      case 'close':
        return this.closePr(input);
      default:
        return { success: false, message: `未知子命令: ${subcommand}` };
    }
  }

  private async createPr(input: SkillInput): Promise<SkillResult> {
    try {
      const title = input.args?.[1] || 'Update';
      const body = input.options?.body as string || '';
      const branch = (await $`git branch --show-current`).stdout.trim();

      await $`gh pr create --title ${title} --body ${body} --base main`;

      return { success: true, message: `已创建PR: ${title}` };
    } catch (error) {
      return { success: false, message: `创建PR失败: ${error}` };
    }
  }

  private async listPrs(input: SkillInput): Promise<SkillResult> {
    try {
      const prs = await $`gh pr list --limit 10`;
      return { success: true, message: prs.stdout, data: prs.stdout };
    } catch (error) {
      return { success: false, message: `获取PR列表失败: ${error}` };
    }
  }

  private async viewPr(input: SkillInput): Promise<SkillResult> {
    try {
      const number = input.args?.[1];
      if (!number) {
        return { success: false, message: '请指定PR编号' };
      }
      const pr = await $`gh pr view ${number}`;
      return { success: true, message: pr.stdout, data: pr.stdout };
    } catch (error) {
      return { success: false, message: `获取PR失败: ${error}` };
    }
  }

  private async closePr(input: SkillInput): Promise<SkillResult> {
    try {
      const number = input.args?.[1];
      if (!number) {
        return { success: false, message: '请指定PR编号' };
      }
      await $`gh pr close ${number}`;
      return { success: true, message: `已关闭PR #${number}` };
    } catch (error) {
      return { success: false, message: `关闭PR失败: ${error}` };
    }
  }
}
