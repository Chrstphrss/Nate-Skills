import { duringMode } from './during.js';
import { afterMode } from './after.js';
import { askMode } from './ask.js';
export * from './during.js';
export * from './after.js';
export * from './ask.js';
export const MODES = {
    during: duringMode,
    after: afterMode,
    ask: askMode
};
export function getModeDefinition(mode) {
    return MODES[mode.toLowerCase()];
}
export function getAllModeNames() {
    return ['during', 'after', 'ask'];
}
