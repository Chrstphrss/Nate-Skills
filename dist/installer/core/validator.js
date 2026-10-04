import * as fs from 'node:fs';
import * as path from 'node:path';
import { SKILLS } from './registry.js';
export async function validateInstallation(adapter, ctx) {
    const issues = [];
    const skillsPresent = [];
    const skillsMissing = [];
    const targetDir = adapter.getTargetSkillsDir(ctx);
    const configFile = adapter.getAgentConfigFile(ctx);
    const configFilePresent = !!(configFile && fs.existsSync(configFile));
    if (!configFilePresent && configFile) {
        issues.push(`Agent configuration file not found at: ${configFile}`);
    }
    if (!fs.existsSync(targetDir)) {
        issues.push(`Target skills directory not found at: ${targetDir}`);
        return {
            valid: false,
            issues,
            skillsPresent,
            skillsMissing: Object.keys(SKILLS),
            configFilePresent,
            configFilePath: configFile
        };
    }
    // Check each skill
    for (const skillId of Object.keys(SKILLS)) {
        const skillPath = path.join(targetDir, skillId);
        const skillMd = path.join(skillPath, 'SKILL.md');
        if (fs.existsSync(skillPath) && fs.existsSync(skillMd)) {
            skillsPresent.push(skillId);
        }
        else {
            skillsMissing.push(skillId);
        }
    }
    // Run adapter specific validation
    const adapterVal = await adapter.validate(ctx);
    for (const issue of adapterVal.issues) {
        if (!issues.includes(issue)) {
            issues.push(issue);
        }
    }
    return {
        valid: issues.length === 0,
        issues,
        skillsPresent,
        skillsMissing,
        configFilePresent,
        configFilePath: configFile
    };
}
