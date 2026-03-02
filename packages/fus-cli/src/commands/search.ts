import inquirer from 'inquirer';
import { $ } from 'zx';

export interface SearchResult {
  name: string;
  description: string;
  version: string;
}

export async function search(keyword: string): Promise<SearchResult[]> {
  console.log(`\n🔍 搜索: ${keyword}\n`);

  try {
    // 使用 npm search 获取结果
    const output = await $`npm search ${keyword} --json 2>/dev/null || echo "[]"`;

    let results: SearchResult[] = [];
    try {
      results = JSON.parse(output.stdout || '[]');
    } catch {
      // 解析失败返回空数组
      results = [];
    }

    if (results.length === 0) {
      console.log('未找到匹配的插件。\n');
      return [];
    }

    // 限制显示数量
    const displayResults = results.slice(0, 10);

    console.log(`找到 ${results.length} 个结果，显示前 ${displayResults.length} 个:\n`);

    for (const result of displayResults) {
      console.log(`📦 ${result.name}`);
      console.log(`   版本: ${result.version}`);
      console.log(`   描述: ${result.description || '无'}`);
      console.log('');
    }

    return displayResults;
  } catch (error) {
    console.log(`搜索失败: ${error}\n`);
    return [];
  }
}

export async function searchInteractive(): Promise<void> {
  const { keyword } = await inquirer.prompt([
    {
      type: 'input',
      name: 'keyword',
      message: '请输入搜索关键词:',
      validate: (input) => input.length > 0 || '请输入搜索关键词',
    },
  ]);

  await search(keyword);
}
