import inquirer from 'inquirer';

export async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'List plugins', value: 'list' },
        { name: 'Install a plugin', value: 'install' },
        { name: 'Uninstall a plugin', value: 'uninstall' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ]);

  if (action === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  }

  console.log(`Action: ${action}`);
  await mainMenu();
}
