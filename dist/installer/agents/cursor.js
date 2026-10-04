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
export class CursorAdapter {
    id = 'cursor';
    name = 'Cursor';
    description = 'Cursor AI IDE (.cursorrules / .cursor/rules).';
    async detect(ctx) {
        if (ctx.isGlobal) {
            return fs.existsSync(path.join(os.homedir(), '.cursor'));
        }
        return (fs.existsSync(path.join(ctx.cwd, '.cursorrules')) ||
            fs.existsSync(path.join(ctx.cwd, '.cursor')));
    }
    getTargetSkillsDir(ctx) {
        if (ctx.isGlobal) {
            return path.join(os.homedir(), '.cursor', 'skills');
        }
        return path.join(ctx.cwd, '.cursor', 'skills');
    }
    getAgentConfigFile(ctx) {
        if (ctx.isGlobal) {
            return path.join(os.homedir(), '.cursor', 'rules.md');
        }
        // Cursor projects often have .cursorrules or .cursor/rules
        const cursorRulesFile = path.join(ctx.cwd, '.cursorrules');
        return cursorRulesFile;
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
                modeDef?.instructionPrefix ?? 'Cursor operational rules:',
                ...installedSkills.map((s) => `- ${s}: Follow rules in .cursor/skills/${s}/SKILL.md`)
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
            issues.push(`Cursor configuration file does not exist: ${configFile}`);
        }
        return {
            valid: issues.length === 0,
            issues
        };
    }
}
