import type { InstallOptions } from '../types.js';

export async function install(options: InstallOptions): Promise<void> {
  console.log('Installing plugin...', options);
}
