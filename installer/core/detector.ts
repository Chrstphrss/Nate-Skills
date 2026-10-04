import { AgentAdapter, AgentContext } from '../agents/base.js';
import { getAllAgentAdapters } from '../agents/index.js';

export interface DetectionResult {
  detectedAgents: AgentAdapter[];
  recommendedAgent: AgentAdapter;
}

export async function detectEnvironment(ctx: AgentContext): Promise<DetectionResult> {
  const adapters = getAllAgentAdapters();
  const detected: AgentAdapter[] = [];

  for (const adapter of adapters) {
    if (adapter.id === 'manual') continue; // Manual is always fallback
    try {
      const match = await adapter.detect(ctx);
      if (match) {
        detected.push(adapter);
      }
    } catch {
      // Ignore detection errors safely
    }
  }

  const manualAdapter = adapters.find((a) => a.id === 'manual')!;
  const recommendedAgent = detected.length > 0 ? detected[0] : manualAdapter;

  return {
    detectedAgents: detected,
    recommendedAgent
  };
}
