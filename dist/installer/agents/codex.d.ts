import { AgentAdapter, AgentContext, SkillInstallResult } from './base.js';
export declare class CodexAdapter implements AgentAdapter {
    readonly id = "codex";
    readonly name = "Codex";
    readonly description = "OpenAI Codex CLI and agent environment.";
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
