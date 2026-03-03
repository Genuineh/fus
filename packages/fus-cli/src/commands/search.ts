import inquirer from 'inquirer';
import { $ } from 'zx';

export interface SearchResult {
  name: string;
  description: string;
  version: string;
}

export async function search(keyword: string): Promise<SearchResult[]> {
  console.log(`\n🔍 Searching: ${keyword}\n`);

  try {
    // Use npm search to get results
    const output = await $`npm search ${keyword} --json 2>/dev/null || echo "[]"`;

    let results: SearchResult[] = [];
    try {
      results = JSON.parse(output.stdout || '[]');
    } catch {
      // Parse failed, return empty array
      results = [];
    }

    if (results.length === 0) {
      console.log('No matching plugins found.\n');
      return [];
    }

    // Limit display count
    const displayResults = results.slice(0, 10);

    console.log(`Found ${results.length} results, showing first ${displayResults.length}:\n`);

    for (const result of displayResults) {
      console.log(`📦 ${result.name}`);
      console.log(`   Version: ${result.version}`);
      console.log(`   Description: ${result.description || 'N/A'}`);
      console.log('');
    }

    return displayResults;
  } catch (error) {
    console.log(`Search failed: ${error}\n`);
    return [];
  }
}

export async function searchInteractive(): Promise<void> {
  const { keyword } = await inquirer.prompt([
    {
      type: 'input',
      name: 'keyword',
      message: 'Enter search keyword:',
      validate: (input) => input.length > 0 || 'Please enter a search keyword',
    },
  ]);

  await search(keyword);
}
