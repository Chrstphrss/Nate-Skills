import { AgentAdapter, AgentContext } from '../agents/base.js';
export interface ValidationReport {
    valid: boolean;
    issues: string[];
    skillsPresent: string[];
    skillsMissing: string[];
    configFilePresent: boolean;
    configFilePath?: string;
}
export declare function validateInstallation(adapter: AgentAdapter, ctx: AgentContext): Promise<ValidationReport>;
