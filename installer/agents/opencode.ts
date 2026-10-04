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

export class OpenCodeAdapter implements AgentAdapter {
  readonly id = 'opencode';
  readonly name = 'OpenCode';
  readonly description = 'Open-source coding agent framework (.opencode).';

  async detect(ctx: AgentContext): Promise<boolean> {
    if (ctx.isGlobal) {
      return fs.existsSync(path.join(os.homedir(), '.opencode'));
    }
    return (
      fs.existsSync(path.join(ctx.cwd, '.opencode')) ||
      fs.existsSync(path.join(ctx.cwd, 'OPENCODE.md'))
    );
  }

  getTargetSkillsDir(ctx: AgentContext): string {
    if (ctx.isGlobal) {
      return path.join(os.homedir(), '.opencode', 'skills');
    }
    return path.join(ctx.cwd, '.opencode', 'skills');
  }

  getAgentConfigFile(ctx: AgentContext): string | undefined {
    if (ctx.isGlobal) {
      return path.join(os.homedir(), '.opencode', 'instructions.md');
    }
    return path.join(ctx.cwd, 'OPENCODE.md');
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
        `# Nate Skills Guardrails (${this.name})`,
        `Mode: ${ctx.mode} - ${modeDef?.description ?? ''}`,
        '',
        modeDef?.instructionPrefix ?? 'Agent operational guardrails:',
        ...installedSkills.map((s) => `- ${s}: See .opencode/skills/${s}/SKILL.md`)
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
    const configFile = this.getAgentConfigFile(ctx);
    if (configFile) {
      removeAgentsMarkdown(configFile);
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
      issues.push(`OpenCode configuration file does not exist: ${configFile}`);
    }
    return {
      valid: issues.length === 0,
      issues
    };
  }
}
