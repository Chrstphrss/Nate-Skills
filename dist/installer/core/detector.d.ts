import { AgentAdapter, AgentContext } from '../agents/base.js';
export interface DetectionResult {
    detectedAgents: AgentAdapter[];
    recommendedAgent: AgentAdapter;
}
export declare function detectEnvironment(ctx: AgentContext): Promise<DetectionResult>;
