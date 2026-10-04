import { AgentAdapter, AgentContext, SkillInstallResult } from '../agents/base.js';
import { executeInstall } from './installer.js';
import { validateInstallation } from './validator.js';

export interface UpdateResult {
  updatedSkills: string[];
  configFilesUpdated: string[];
}

export async function executeUpdate(
  adapter: AgentAdapter,
  ctx: AgentContext
): Promise<UpdateResult> {
  const validation = await validateInstallation(adapter, ctx);
  const skillsToUpdate = validation.skillsPresent.length > 0
    ? validation.skillsPresent
    : undefined;

  const result: SkillInstallResult = await executeInstall({
    adapter,
    ctx,
    skillIds: skillsToUpdate
  });

  return {
    updatedSkills: result.installedSkills,
    configFilesUpdated: result.configFilesUpdated
  };
}
