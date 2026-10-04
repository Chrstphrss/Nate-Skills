import { minimalPreset } from './minimal.js';
import { frontendPreset } from './frontend.js';
import { mobilePreset } from './mobile.js';
import { backendPreset } from './backend.js';
import { fullPreset } from './full.js';

export const PRESETS: Record<string, readonly string[]> = {
  minimal: minimalPreset,
  frontend: frontendPreset,
  mobile: mobilePreset,
  backend: backendPreset,
  full: fullPreset
};

export function getPresetSkills(name: string): readonly string[] | undefined {
  return PRESETS[name.toLowerCase()];
}

export function getAllPresetNames(): string[] {
  return Object.keys(PRESETS);
}
