import { AgentAdapter, AgentContext, SkillInstallResult } from '../agents/base.js';
export interface InstallOptions {
    adapter: AgentAdapter;
    ctx: AgentContext;
    skillIds?: string[];
    preset?: string;
}
export declare function resolveSourceSkillsDir(): string;
export declare function executeInstall(options: InstallOptions): Promise<SkillInstallResult>;
