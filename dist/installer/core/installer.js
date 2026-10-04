import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKILLS } from './registry.js';
import { getPresetSkills } from '../presets/index.js';
export function resolveSourceSkillsDir() {
    // Try locating the bundled skills folder relative to current module or package root
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    // Possible locations:
    // 1. When running from root (ts-node / built into dist/installer/core):
    //    ../../skills
    const candidate1 = path.resolve(currentDir, '..', '..', '..', 'skills');
    const candidate2 = path.resolve(currentDir, '..', '..', 'skills');
    const candidate3 = path.resolve(process.cwd(), 'skills');
    if (fs.existsSync(candidate1) && fs.existsSync(path.join(candidate1, 'think-before-code'))) {
        return candidate1;
    }
    if (fs.existsSync(candidate2) && fs.existsSync(path.join(candidate2, 'think-before-code'))) {
        return candidate2;
    }
    if (fs.existsSync(candidate3) && fs.existsSync(path.join(candidate3, 'think-before-code'))) {
        return candidate3;
    }
    return candidate2;
}
export async function executeInstall(options) {
    const { adapter, ctx, skillIds, preset } = options;
    const sourceSkillsDir = resolveSourceSkillsDir();
    let targetSkills = [];
    if (skillIds && skillIds.length > 0) {
        targetSkills = skillIds.filter((id) => id in SKILLS);
    }
    else if (preset) {
        const presetSkills = getPresetSkills(preset);
        if (presetSkills) {
            targetSkills = [...presetSkills];
        }
    }
    if (targetSkills.length === 0) {
        targetSkills = Object.keys(SKILLS);
    }
    return adapter.install(targetSkills, sourceSkillsDir, ctx);
}
