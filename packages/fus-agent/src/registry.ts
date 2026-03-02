import type { BaseAgent } from './base/agent.js';
import { CodeReviewerAgent } from './code-reviewer/index.js';

export const agentRegistry: Map<string, BaseAgent> = new Map();

export function registerAgent(agent: BaseAgent): void {
  agentRegistry.set(agent.name, agent);
}

export function getAgent(name: string): BaseAgent | undefined {
  return agentRegistry.get(name);
}

export function getAllAgents(): BaseAgent[] {
  return Array.from(agentRegistry.values());
}

// 默认注册
registerAgent(new CodeReviewerAgent());
