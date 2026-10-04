import { AntigravityAdapter } from './antigravity.js';
import { ClaudeCodeAdapter } from './claude-code.js';
import { CodexAdapter } from './codex.js';
import { CursorAdapter } from './cursor.js';
import { GeminiCliAdapter } from './gemini-cli.js';
import { OpenCodeAdapter } from './opencode.js';
import { ManualAdapter } from './manual.js';
export * from './base.js';
export * from './antigravity.js';
export * from './claude-code.js';
export * from './codex.js';
export * from './cursor.js';
export * from './gemini-cli.js';
export * from './opencode.js';
export * from './manual.js';
export const AGENT_ADAPTERS = [
    new AntigravityAdapter(),
    new ClaudeCodeAdapter(),
    new CodexAdapter(),
    new CursorAdapter(),
    new GeminiCliAdapter(),
    new OpenCodeAdapter(),
    new ManualAdapter()
];
export function getAgentAdapter(id) {
    const normalized = id.toLowerCase().trim();
    return AGENT_ADAPTERS.find((a) => a.id.toLowerCase() === normalized || a.name.toLowerCase() === normalized);
}
export function getAllAgentAdapters() {
    return AGENT_ADAPTERS;
}
