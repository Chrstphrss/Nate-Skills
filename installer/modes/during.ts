export type SkillMode = 'during' | 'after' | 'ask';

export interface ModeDefinition {
  mode: SkillMode;
  name: string;
  description: string;
  instructionPrefix: string;
}

export const duringMode: ModeDefinition = {
  mode: 'during',
  name: 'During Implementation',
  description: 'Skills act as active, continuous behavioral rules during implementation.',
  instructionPrefix: 'Apply the following guardrails as continuous operational rules during implementation:'
};
