import { executeInstall } from './installer.js';
import { validateInstallation } from './validator.js';
export async function executeUpdate(adapter, ctx) {
    const validation = await validateInstallation(adapter, ctx);
    const skillsToUpdate = validation.skillsPresent.length > 0
        ? validation.skillsPresent
        : undefined;
    const result = await executeInstall({
        adapter,
        ctx,
        skillIds: skillsToUpdate
    });
    return {
        updatedSkills: result.installedSkills,
        configFilesUpdated: result.configFilesUpdated
    };
}
