import { AgentAdapter, AgentContext, SkillInstallResult } from './base.js';
export declare class CursorAdapter implements AgentAdapter {
    readonly id = "cursor";
    readonly name = "Cursor";
    readonly description = "Cursor AI IDE (.cursorrules / .cursor/rules).";
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
