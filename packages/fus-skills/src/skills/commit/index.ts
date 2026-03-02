import { $ } from 'zx';
import { BaseSkill, type SkillInput, type SkillResult } from '../../base/skill.js';

export class CommitSkill extends BaseSkill {
  name = 'commit';
  description = '智能提交代码，生成符合Conventional Commits规范的commit message';
  aliases = ['/commit', '/git-commit'];

  async validate(input: SkillInput): Promise<boolean> {
    return input.args !== undefined;
  }

  async execute(input: SkillInput): Promise<SkillResult> {
    try {
      // 获取变更文件
      const status = await $`git status --porcelain`;
      if (!status.stdout.trim()) {
        return { success: false, message: '没有待提交的变更' };
      }

      // 分析变更类型
      const changes = status.stdout.trim().split('\n');
      const types = this.analyzeChangeTypes(changes);

      // 生成 commit message
      const message = this.generateCommitMessage(types, input.args);

      // 执行提交
      await $`git add -A`;
      await $`git commit -m ${message}`;

      return { success: true, message: `已提交: ${message}` };
    } catch (error) {
      return { success: false, message: `提交失败: ${error}` };
    }
  }

  private analyzeChangeTypes(changes: string[]): Set<string> {
    const types = new Set<string>();
    for (const change of changes) {
      const file = change.substring(3);
      if (file.startsWith('src/') || file.startsWith('packages/')) {
        types.add('feat');
      } else if (file.includes('.test.') || file.includes('.spec.')) {
        types.add('test');
      } else if (file.includes('docs/') || file.endsWith('.md')) {
        types.add('docs');
      } else if (file.includes('.css') || file.includes('.scss')) {
        types.add('style');
      }
    }
    return types;
  }

  private generateCommitMessage(types: Set<string>, args?: string[]): string {
    const scope = args?.[0] || '';
    const type = Array.from(types)[0] || 'chore';
    const scopePart = scope ? `(${scope})` : '';
    const message = args?.[1] || this.generateDefaultMessage(types);
    return `${type}${scopePart}: ${message}`;
  }

  private generateDefaultMessage(types: Set<string>): string {
    const typeList = Array.from(types);
    if (typeList.includes('feat')) return 'add new feature';
    if (typeList.includes('fix')) return 'fix bug';
    if (typeList.includes('test')) return 'add tests';
    if (typeList.includes('docs')) return 'update documentation';
    return 'update';
  }
}
