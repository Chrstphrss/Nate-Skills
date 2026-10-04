import { AgentAdapter, AgentContext, SkillInstallResult } from './base.js';
export declare class ManualAdapter implements AgentAdapter {
    readonly id = "manual";
    readonly name = "Manual / Custom";
    readonly description = "Universal fallback installer placing skills directly in .skills or AGENTS.md.";
    detect(_ctx: AgentContext): Promise<boolean>;
    getTargetSkillsDir(ctx: AgentContext): string;
    getAgentConfigFile(ctx: AgentContext): string | undefined;
    install(skillIds: string[], sourceSkillsDir: string, ctx: AgentContext): Promise<SkillInstallResult>;
    uninstall(ctx: AgentContext): Promise<void>;
    validate(ctx: AgentContext): Promise<{
        valid: boolean;
        issues: string[];
    }>;
}
