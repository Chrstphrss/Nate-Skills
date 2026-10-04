import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { AgentAdapter, AgentContext, SkillInstallResult, updateAgentsMarkdown, removeAgentsMarkdown } from './base.js';
import { getModeDefinition } from '../modes/index.js';

function copyDirRecursive(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export class AntigravityAdapter implements AgentAdapter {
  readonly id = 'antigravity';
  readonly name = 'Antigravity';
  readonly description = 'Google Deepmind Antigravity IDE and CLI agent environment.';

  async detect(ctx: AgentContext): Promise<boolean> {
    if (ctx.isGlobal) {
      const globalAntigravity = path.join(os.homedir(), '.gemini', 'antigravity');
      return fs.existsSync(globalAntigravity);
    }
    const localAgent = path.join(ctx.cwd, '.agent');
    const localAntigravity = path.join(ctx.cwd, '.antigravity');
    const localGemini = path.join(ctx.cwd, '.gemini');
    return fs.existsSync(localAgent) || fs.existsSync(localAntigravity) || fs.existsSync(localGemini);
  }

  getTargetSkillsDir(ctx: AgentContext): string {
    if (ctx.isGlobal) {
      return path.join(os.homedir(), '.gemini', 'antigravity', 'skills');
    }
    return path.join(ctx.cwd, '.agent', 'skills');
  }

  getAgentConfigFile(ctx: AgentContext): string | undefined {
    if (ctx.isGlobal) {
      return path.join(os.homedir(), '.gemini', 'antigravity', 'AGENTS.md');
    }
    return path.join(ctx.cwd, 'AGENTS.md');
  }

  async install(
    skillIds: string[],
    sourceSkillsDir: string,
    ctx: AgentContext
  ): Promise<SkillInstallResult> {
    const targetDir = this.getTargetSkillsDir(ctx);
    fs.mkdirSync(targetDir, { recursive: true });

    const installedSkills: string[] = [];
    for (const skillId of skillIds) {
      const src = path.join(sourceSkillsDir, skillId);
      const dest = path.join(targetDir, skillId);
      if (fs.existsSync(src)) {
        copyDirRecursive(src, dest);
        installedSkills.push(skillId);
      }
    }

    const configFile = this.getAgentConfigFile(ctx);
    const updatedFiles: string[] = [];
    if (configFile) {
      const modeDef = getModeDefinition(ctx.mode);
      const lines = [
        `# Nate Skills Configuration (${this.name})`,
        `Mode: ${ctx.mode} - ${modeDef?.description ?? ''}`,
        '',
        modeDef?.instructionPrefix ?? 'Apply the following guardrails:',
        ...installedSkills.map((s) => `- ${s}: See skills/${s}/SKILL.md`)
      ];
      updateAgentsMarkdown(configFile, lines.join('\n'));
      updatedFiles.push(configFile);
    }

    return {
      installedSkills,
      configFilesUpdated: updatedFiles
    };
  }

  async uninstall(ctx: AgentContext): Promise<void> {
    const targetDir = this.getTargetSkillsDir(ctx);
    if (fs.existsSync(targetDir)) {
      // Remove only skills managed by nate-skills
      const configFile = this.getAgentConfigFile(ctx);
      if (configFile) {
        removeAgentsMarkdown(configFile);
      }
    }
  }

  async validate(ctx: AgentContext): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];
    const targetDir = this.getTargetSkillsDir(ctx);
    if (!fs.existsSync(targetDir)) {
      issues.push(`Target skills directory does not exist: ${targetDir}`);
    }
    const configFile = this.getAgentConfigFile(ctx);
    if (configFile && !fs.existsSync(configFile)) {
      issues.push(`Agents pointer configuration does not exist: ${configFile}`);
    }
    return {
      valid: issues.length === 0,
      issues
    };
  }
}
