import { AgentAdapter, AgentContext, SkillInstallResult } from './base.js';
export declare class ClaudeCodeAdapter implements AgentAdapter {
    readonly id = "claude-code";
    readonly name = "Claude Code";
    readonly description = "Anthropic Claude Code CLI environment (CLAUDE.md / .claude).";
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
