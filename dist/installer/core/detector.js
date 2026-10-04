import { getAllAgentAdapters } from '../agents/index.js';
export async function detectEnvironment(ctx) {
    const adapters = getAllAgentAdapters();
    const detected = [];
    for (const adapter of adapters) {
        if (adapter.id === 'manual')
            continue; // Manual is always fallback
        try {
            const match = await adapter.detect(ctx);
            if (match) {
                detected.push(adapter);
            }
        }
        catch {
            // Ignore detection errors safely
        }
    }
    const manualAdapter = adapters.find((a) => a.id === 'manual');
    const recommendedAgent = detected.length > 0 ? detected[0] : manualAdapter;
    return {
        detectedAgents: detected,
        recommendedAgent
    };
}
