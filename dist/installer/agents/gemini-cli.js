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
export class GeminiCliAdapter {
    id = 'gemini-cli';
    name = 'Gemini CLI';
    description = 'Google Gemini Developer CLI environment.';
    async detect(ctx) {
        if (ctx.isGlobal) {
            return fs.existsSync(path.join(os.homedir(), '.gemini'));
        }
        return (fs.existsSync(path.join(ctx.cwd, '.gemini')) ||
            fs.existsSync(path.join(ctx.cwd, 'GEMINI.md')));
    }
    getTargetSkillsDir(ctx) {
        if (ctx.isGlobal) {
            return path.join(os.homedir(), '.gemini', 'skills');
        }
        return path.join(ctx.cwd, '.gemini', 'skills');
    }
    getAgentConfigFile(ctx) {
        if (ctx.isGlobal) {
            return path.join(os.homedir(), '.gemini', 'GEMINI.md');
        }
        return path.join(ctx.cwd, 'GEMINI.md');
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
                `# Nate Skills Guardrails (${this.name})`,
                `Mode: ${ctx.mode} - ${modeDef?.description ?? ''}`,
                '',
                modeDef?.instructionPrefix ?? 'Gemini agent guidelines:',
                ...installedSkills.map((s) => `- ${s}: See .gemini/skills/${s}/SKILL.md`)
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
            issues.push(`Gemini configuration file does not exist: ${configFile}`);
        }
        return {
            valid: issues.length === 0,
            issues
        };
    }
}
