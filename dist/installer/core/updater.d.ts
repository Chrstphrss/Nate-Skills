import { AgentAdapter, AgentContext } from '../agents/base.js';
export interface UpdateResult {
    updatedSkills: string[];
    configFilesUpdated: string[];
}
export declare function executeUpdate(adapter: AgentAdapter, ctx: AgentContext): Promise<UpdateResult>;
