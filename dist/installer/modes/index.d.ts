import { ModeDefinition, SkillMode } from './during.js';
export * from './during.js';
export * from './after.js';
export * from './ask.js';
export declare const MODES: Record<SkillMode, ModeDefinition>;
export declare function getModeDefinition(mode: string): ModeDefinition | undefined;
export declare function getAllModeNames(): SkillMode[];
