import { color } from './theme.js';

export function printBanner(compact = true): void {
  console.log();
  console.log(`  ${color('bold', 'Nate Skills')}`);
  console.log(`  ${color('dim', 'Practical Guardrails for AI Coding Agents')}`);
  console.log();
}
