import { AgentAdapter, AgentContext, SkillInstallResult } from './base.js';
export declare class OpenCodeAdapter implements AgentAdapter {
    readonly id = "opencode";
    readonly name = "OpenCode";
    readonly description = "Open-source coding agent framework (.opencode).";
    detect(ctx: AgentContext): Promise<boolean>;
    getTargetSkillsDir(ctx: AgentContext): string;
    getAgentConfigFile(ctx: AgentContext): string | undefined;
    install(skillIds: string[], sourceSkillsDir: string, ctx: AgentContext): Promise<SkillInstallResult>;
    uninstall(ctx: AgentContext): Promise<void>;
    validate(ctx: AgentContext): Promise<{
        valid: boolean;
        issues: string[];
    }>;
}
