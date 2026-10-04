import { ModeDefinition } from './during.js';

export const afterMode: ModeDefinition = {
  mode: 'after',
  name: 'After Implementation (Review/Cleanup)',
  description: 'Skills emphasize post-implementation review, validation, and cleanup.',
  instructionPrefix: 'After completing implementation, review your work against these guardrails before finalizing:'
};
