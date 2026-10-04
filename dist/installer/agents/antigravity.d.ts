import { AgentAdapter, AgentContext, SkillInstallResult } from './base.js';
export declare class AntigravityAdapter implements AgentAdapter {
    readonly id = "antigravity";
    readonly name = "Antigravity";
    readonly description = "Google Deepmind Antigravity IDE and CLI agent environment.";
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
