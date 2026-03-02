export type Scope = 'global' | 'project';

export type Source = 'local' | 'npm';

export interface Plugin {
  name: string;
  path: string;
  scope: Scope;
  source: Source;
  version?: string;
}

export interface InstallOptions {
  scope: Scope;
  source: Source;
  path?: string;
  npmPackage?: string;
}

export interface Config {
  globalPath: string;
  projectPath: string;
}
