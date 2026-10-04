export type SkillMode = 'during' | 'after' | 'ask';
export interface ModeDefinition {
    mode: SkillMode;
    name: string;
    description: string;
    instructionPrefix: string;
}
export declare const duringMode: ModeDefinition;
