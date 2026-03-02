export interface RuleConfig {
  id: string;
  name: string;
  enabled: boolean;
  severity: 'error' | 'warning' | 'info';
  patterns: string[];
  options?: Record<string, unknown>;
}

export interface RuleResult {
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  column?: number;
}

export interface ReviewResult {
  file: string;
  results: RuleResult[];
}

export interface SkillResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface FusConfig {
  rules?: Record<string, Partial<RuleConfig>>;
  skills?: Record<string, unknown>;
}
