import { AgentAdapter, AgentContext, SkillInstallResult } from './base.js';
export declare class GeminiCliAdapter implements AgentAdapter {
    readonly id = "gemini-cli";
    readonly name = "Gemini CLI";
    readonly description = "Google Gemini Developer CLI environment.";
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
