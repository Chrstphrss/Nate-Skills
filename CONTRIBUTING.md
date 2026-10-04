# Contributing to Nate Skills

Thank you for your interest in contributing to Nate Skills!

## Guiding Philosophy
- **Simple, Modular, Typed**: Clean TypeScript with zero unnecessary runtime bloat.
- **Agent Agnostic**: Guardrails must work smoothly across diverse LLMs and coding agents.
- **Cross-Platform**: Windows, macOS, and Linux compatibility is required.
- **Defensive & Respectful**: Never overwrite user configuration without clear markers.

## Development Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the CLI and adapters:
   ```bash
   npm run build
   ```

## Adding a New Skill
1. Add the skill folder under `skills/<skill-id>/` containing `SKILL.md` and `README.md`.
2. Register the skill metadata in `installer/core/registry.ts`.
3. Add the skill to any relevant presets in `installer/presets/`.

## Pull Request Guidelines
- Keep pull requests focused on a single concern.
- Ensure `npm run build` passes with zero TypeScript warnings or errors.
- Adhere to existing code conventions.
