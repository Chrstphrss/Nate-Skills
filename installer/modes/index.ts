import { duringMode, ModeDefinition, SkillMode } from './during.js';
import { afterMode } from './after.js';
import { askMode } from './ask.js';

export * from './during.js';
export * from './after.js';
export * from './ask.js';

export const MODES: Record<SkillMode, ModeDefinition> = {
  during: duringMode,
  after: afterMode,
  ask: askMode
};

export function getModeDefinition(mode: string): ModeDefinition | undefined {
  return MODES[mode.toLowerCase() as SkillMode];
}

export function getAllModeNames(): SkillMode[] {
  return ['during', 'after', 'ask'];
}
