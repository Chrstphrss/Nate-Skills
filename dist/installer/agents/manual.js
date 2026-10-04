import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { updateAgentsMarkdown, removeAgentsMarkdown } from './base.js';
import { getModeDefinition } from '../modes/index.js';
function copyDirRecursive(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        }
        else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
export class ManualAdapter {
    id = 'manual';
    name = 'Manual / Custom';
    description = 'Universal fallback installer placing skills directly in .skills or AGENTS.md.';
    async detect(_ctx) {
        return true; // Always usable
    }
    getTargetSkillsDir(ctx) {
        if (ctx.isGlobal) {
            return path.join(os.homedir(), '.nate-skills', 'skills');
        }
        return path.join(ctx.cwd, '.skills');
    }
    getAgentConfigFile(ctx) {
        if (ctx.isGlobal) {
            return path.join(os.homedir(), '.nate-skills', 'AGENTS.md');
        }
        return path.join(ctx.cwd, 'AGENTS.md');
    }
    async install(skillIds, sourceSkillsDir, ctx) {
        const targetDir = this.getTargetSkillsDir(ctx);
        fs.mkdirSync(targetDir, { recursive: true });
        const installedSkills = [];
        for (const skillId of skillIds) {
            const src = path.join(sourceSkillsDir, skillId);
            const dest = path.join(targetDir, skillId);
            if (fs.existsSync(src)) {
                copyDirRecursive(src, dest);
                installedSkills.push(skillId);
            }
        }
        const configFile = this.getAgentConfigFile(ctx);
        const updatedFiles = [];
        if (configFile) {
            const modeDef = getModeDefinition(ctx.mode);
            const lines = [
                `# Nate Skills Guardrails (Universal Manual Setup)`,
                `Mode: ${ctx.mode} - ${modeDef?.description ?? ''}`,
                '',
                modeDef?.instructionPrefix ?? 'General agent guardrails:',
                ...installedSkills.map((s) => `- ${s}: See ${ctx.isGlobal ? targetDir : '.skills'}/${s}/SKILL.md`)
            ];
            updateAgentsMarkdown(configFile, lines.join('\n'));
            updatedFiles.push(configFile);
        }
        return {
            installedSkills,
            configFilesUpdated: updatedFiles
        };
    }
    async uninstall(ctx) {
        const configFile = this.getAgentConfigFile(ctx);
        if (configFile) {
            removeAgentsMarkdown(configFile);
        }
    }
    async validate(ctx) {
        const issues = [];
        const targetDir = this.getTargetSkillsDir(ctx);
        if (!fs.existsSync(targetDir)) {
            issues.push(`Target skills directory does not exist: ${targetDir}`);
        }
        const configFile = this.getAgentConfigFile(ctx);
        if (configFile && !fs.existsSync(configFile)) {
            issues.push(`Manual configuration file does not exist: ${configFile}`);
        }
        return {
            valid: issues.length === 0,
            issues
        };
    }
}
