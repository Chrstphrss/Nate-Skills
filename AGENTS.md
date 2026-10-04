# AGENTS.md

## Repository Purpose
Nate Skills is an open-source framework and CLI tool providing:
> "Practical Guardrails for AI Coding Agents."

It equips autonomous and pair-programming coding agents across diverse host environments (Antigravity, Claude Code, Cursor, Codex, Gemini CLI, OpenCode) with battle-tested operational rules that enforce engineering discipline: pre-modification reconnaissance, unyielding fact verification, human-centric UI, mobile-first responsiveness, iOS-inspired ergonomics, defensive threat modeling, localized code cleanup, and token frugality.

## Core Philosophy
1. **Practical Guardrails Over Vague Maxims**: Instructions must be concrete, procedurally verifiable, and actionable. Avoid platitudes ("write good code", "be careful").
2. **Agent-Agnostic Core**: Skills represent universal software engineering principles independent of host platforms, proprietary models, or environment-specific wrappers.
3. **Evidence Over Confidence**: Facts observed from tool outputs, compiler logs, and file contents supersede speculative assertions.
4. **Minimal & Surgical Scope**: Modify only what is requested. Never perform unprompted rewrites, mass formatting, or premature architectural overhauls.
5. **Human-Centered Software**: Interfaces must be stateful, predictable, accessible, and resilient to adverse human and network conditions.
6. **Security by Default**: Zero secret leakage, mandatory validation boundaries, parameterized execution, and zero client-side trust assumptions.
7. **Token-Efficient Workflows**: Precision inspection, targeted searches, and surgical diffs conserve context without sacrificing correctness.

---

## Repository Structure
```
nate-skills/
├── skills/                     # Canonical, agent-agnostic skill definitions
│   ├── think-before-code/      # Pre-modification reconnaissance and execution planning
│   ├── anti-bullshit/          # Evidence-driven verification, zero hallucination
│   ├── human-ui/               # Stateful, accessible, human-centric interface design
│   ├── responsive-first/       # Mobile-first viewport hierarchy and fluid layouts
│   ├── ios-ui/                 # iOS-native-inspired ergonomics, sheets, safe areas
│   ├── security-first/         # Defensive threat modeling, credential and input hygiene
│   ├── code-cleaner/           # Scope-bound cleanup, dead code and debug pruning
│   └── frugal-token/           # Context window conservation, surgical operations
├── installer/                  # Cross-platform TypeScript CLI installer
│   ├── agents/                 # Agent adapters (Antigravity, Cursor, Claude Code, etc.)
│   ├── presets/                # Curated skill bundles (minimal, frontend, mobile, etc.)
│   ├── modes/                  # Operational modes (during, after, ask)
│   ├── ui/                     # Terminal theme, banner, spinner, arrow-key prompts
│   ├── core/                   # Engine: detector, installer, updater, validator, registry
│   └── cli.ts                  # CLI entrypoint
├── package.json                # Dependencies, scripts, and bin definition
├── tsconfig.json               # Strict TypeScript compiler configuration
├── README.md                   # Project documentation and showcase
└── AGENTS.md                   # Repository operational contract
```

---

## Skills Architecture
- **Independent & Modular**: Each skill lives in `skills/<skill-id>/` containing `SKILL.md` (authoritative operational specification) and `README.md` (usage context and limitations).
- **Agent-Agnostic Core**: Generic skills never reference vendor-specific CLI tools, proprietary model prompts, or environment idiosyncrasies.
- **Zero Extraneous Dependencies**: Skills must not impose runtime libraries or external package overhead on consumer projects.
- **Progressive Disclosure**: Keep core `SKILL.md` files concentrated on actionable execution rules. Do not dilute instructions with narrative bloat.

---

## SKILL.md Authoring Rules
When creating or modifying skills:
1. **Frontmatter**:
   - `name`: Must match the directory name.
   - `description`: Highly specific, trigger-oriented summary describing the exact situations and failure modes that mandate activating the skill.
2. **Standard Section Hierarchy**:
   - `Purpose`: Concrete problem being eliminated.
   - `When to Apply`: Specific triggers and file types.
   - `Core Principles`: Invariant engineering foundations.
   - `Workflow`: Sequential, procedural steps.
   - `Decision Rules`: Explicit conditional logic (`if X, do Y`).
   - `Hard Rules`: Non-negotiable negative constraints ("Never...").
   - `Anti-Patterns`: Explicit descriptions of unacceptable agent behavior.
   - `Verification & Quality Gates`: Observable checks that must pass.
   - `Completion Criteria`: Clear exit conditions.
3. **Actionability**: Every sentence must provide direct instructions. Avoid filler, conversational chatter, or platitudes.
4. **Epistemological Rigor**: Explicitly require agents to separate directly observed facts from inferences and unverified assumptions.

---

## Agent Adapter Rules
- Host-specific file paths, configuration files, and installation mechanisms belong exclusively in `installer/agents/<agent>.ts`.
- Adapters must implement the `AgentAdapter` interface:
  - `detect(ctx)`: Inspect verifiable filesystem markers (do not guess).
  - `getTargetSkillsDir(ctx)`: Return project or global skill destination.
  - `getAgentConfigFile(ctx)`: Return target configuration file or undefined.
  - `install(skillIds, sourceSkillsDir, ctx)`: Copy skill assets and inject configuration.
  - `uninstall(ctx)`: Cleanly remove managed skills and configuration blocks.
  - `validate(ctx)`: Audit installation integrity.
- Never place agent-specific paths or instructions inside generic skills.

---

## Installer Rules & Boundaries
- The installer adheres strictly to a 6-stage lifecycle:
  $$\text{Detect} \longrightarrow \text{Resolve} \longrightarrow \text{Select} \longrightarrow \text{Install} \longrightarrow \text{Configure} \longrightarrow \text{Report}$$
- **Keyboard Navigation**: Interactive CLI flows must use arrow-key navigation ($\uparrow/\downarrow$), multi-select toggling ($\text{Space}$), confirmation ($\text{Enter}$), and clean cancellation ($\text{Esc}$, $\text{Ctrl+C}$). Never regress to numbered choices or text-input prompts.
- **Safe Copying**: Use recursive directory copying with cross-platform separator handling. Never clobber unrelated files.
- **Managed Configuration Markers**: When updating configuration files (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`), Nate Skills content must strictly be wrapped in markers:
  ```markdown
  <!-- NATE-SKILLS:START -->
  ...
  <!-- NATE-SKILLS:END -->
  ```
  Content outside these markers must remain completely untouched.

---

## Detection Rules
Agent detection relies exclusively on observable filesystem signals:
- **Antigravity**: `~/.gemini/antigravity` (global), `.agent`, `.antigravity`, or `.gemini` (project).
- **Claude Code**: `~/.claude` (global), `CLAUDE.md`, or `.claude` (project).
- **Codex**: `~/.codex` (global), `.codex`, or `CODEX.md` (project).
- **Cursor**: `~/.cursor` (global), `.cursorrules`, or `.cursor` (project).
- **Gemini CLI**: `~/.gemini` (global), `GEMINI.md`, or `.gemini` (project).
- **OpenCode**: `~/.opencode` (global), `.opencode`, or `OPENCODE.md` (project).
- **Manual**: Universal fallback when no agent environment is detected.

Never assume an agent is present without verifiable filesystem evidence.

---

## Security
- **Credential Hygiene**: Never hardcode, commit, or log API keys, tokens, passwords, private keys, or personal secrets.
- **Input Validation**: Treat all external data (HTTP bodies, query params, file uploads, CLI arguments) as hostile. Validate shape and boundaries.
- **Safe Execution**: Prohibit string-interpolated child process execution (`exec`); use structured argument arrays (`spawn`, `execFile`).
- **Authorization**: Never treat client-side checks as security controls. Validate permissions at the authoritative server boundary.

---

## Evidence & Verification
- Treat compiler outputs, process return codes, and system logs as authoritative truth.
- Never state that code works, builds pass, or tests succeed without directly observing output.
- When modifying TypeScript files, always run `npm run build` and ensure zero errors before completing.

---

## Token Efficiency
- Do not read whole directories or large files when targeted grep or line-bounded inspection suffices.
- Avoid rereading files already present in context unless they have been modified externally.
- Execute surgical block replacements rather than full-file rewrites for localized changes.
- Broad repository scans are permitted *only* when establishing initial project architecture, tracing multi-file breaking changes, or resolving root-cause dependency collisions.

---

## Change Scope & Quality
- Keep edits localized to the direct requirements of the task.
- Zero unrelated refactoring, cosmetic reformatting, or unsolicited package additions.
- Strict TypeScript (`"strict": true`). Explicit types; no `any`.
- Zero runtime dependencies in `package.json` where native Node.js standard modules suffice (`readline`, `fs`, `path`, `os`, `url`, `process`).

---

## Definition of Done
A contribution or modification to Nate Skills is complete only when:
1. Requested functionality or documentation is fully authored, coherent, and verified.
2. Existing functionality, file markers, and configurations remain uncorrupted.
3. TypeScript compiler compiles with zero errors (`npm run build`).
4. All documented commands, options, and behaviors reflect actual code implementation.
