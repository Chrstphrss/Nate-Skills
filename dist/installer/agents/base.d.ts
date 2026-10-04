import { SkillMode } from '../modes/during.js';
export interface AgentContext {
    cwd: string;
    isGlobal: boolean;
    mode: SkillMode;
}
export interface SkillInstallResult {
    installedSkills: string[];
    configFilesUpdated: string[];
    instructions?: string;
}
export interface AgentAdapter {
    readonly id: string;
    readonly name: string;
    readonly description: string;
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
export declare const AGENTS_MD_MARKER_START = "<!-- NATE-SKILLS:START -->";
export declare const AGENTS_MD_MARKER_END = "<!-- NATE-SKILLS:END -->";
export declare function updateAgentsMarkdown(filePath: string, contentToInsert: string): void;
export declare function removeAgentsMarkdown(filePath: string): void;
