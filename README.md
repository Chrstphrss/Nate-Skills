# Nate Skills

<p align="center">
  <strong>Practical Guardrails for AI Coding Agents.</strong>
</p>

```
███╗   ██╗ █████╗ ████████╗███████╗    ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
████╗  ██║██╔══██╗╚══██╔══╝██╔════╝    ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
██╔██╗ ██║███████║   ██║   █████╗      ███████╗█████╔╝ ██║██║     ██║     ███████╗
██║╚██╗██║██╔══██║   ██║   ██╔══╝      ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
██║ ╚████║██║  ██║   ██║   ███████╗    ███████║██║  ██╗██║███████╗███████╗███████║
╚═╝  ╚═══╝╚═╝  ╚═╝   ╚══════╝    ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝
```

---

## What is Nate Skills?

Autonomous AI coding agents frequently suffer from predictable failure modes: they hallucinate non-existent APIs, claim unverified test successes, modify files blindly without architectural context, write insecure shell commands, and consume thousands of tokens on unfocused file scans.

**Nate Skills** equips AI coding agents with production-grade, agent-agnostic engineering guardrails. It enforces systematic reconnaissance, evidence-based verification, defensive threat modeling, accessibility, mobile responsiveness, and token frugality across your development workflows.

---

## Why Nate Skills?

- **Enforceable, Procedural Instructions**: Replaces vague platitudes ("write clean code", "be careful") with concrete, auditable procedural workflows.
- **Agent-Agnostic Core**: Works seamlessly across Antigravity, Claude Code, Cursor, OpenAI Codex, Gemini CLI, and OpenCode.
- **Evidence-Driven Engineering**: Prohibits agents from claiming success without verified compiler logs, test runs, or observable tool outputs.
- **Zero Runtime Dependencies**: Built with native Node.js capabilities for maximum performance, minimal footprint, and zero security overhead.

---

## Flagship Skills

Nate Skills centers around four foundational pillars of autonomous engineering:

### 1. 🔍 Think Before Code (`think-before-code`)
**Reconnaissance before modification.** Mandates that agents inspect project architecture, examine dependencies, locate existing utilities, map the blast radius, and formulate an explicit plan before touching a single line of code. Eliminates duplicate abstractions and unsolicited refactors.

### 2. 🛡️ Anti-Bullshit (`anti-bullshit`)
**Evidence over confidence.** Strictly enforces an epistemological hierarchy: facts (observed in tool outputs), inferences (logical deductions), and assumptions (unverified hypotheses). Prohibits claiming tests passed, builds succeeded, or APIs exist without direct proof.

### 3. 🔒 Security First (`security-first`)
**Threat modeling as a default.** Requires agents to map trust boundaries and data flows before implementation. Enforces zero credential leaks, parameterized queries, non-interpolated shell execution, strict input validation, and zero client-trust assumptions.

### 4. ⚡ Frugal Token (`frugal-token`)
**Precision context engineering.** Optimizes agent context windows through targeted symbol searches, slice-bounded file reads, and surgical diffs. Preserves model reasoning power while enforcing that token savings never compromise technical correctness or security.

---

## Complete Skill Matrix

| Skill ID | Category | Primary Focus |
|---|---|---|
| [`think-before-code`](skills/think-before-code/SKILL.md) | Methodology | Pre-modification inspection, pattern discovery, blast-radius mapping, and execution planning. |
| [`anti-bullshit`](skills/anti-bullshit/SKILL.md) | Quality | Evidence-driven verification, zero hallucinated APIs/files, and unvarnished reporting. |
| [`human-ui`](skills/human-ui/SKILL.md) | UI / UX | 6-state lifecycle handling (idle, loading, empty, error, disabled, success), accessibility, and clear affordances. |
| [`responsive-first`](skills/responsive-first/SKILL.md) | UI / UX | Mobile-first viewport hierarchy ($320\text{px}+$ upwards), fluid units, and zero mobile overflow. |
| [`ios-ui`](skills/ios-ui/SKILL.md) | UI / UX | iOS-native-inspired design language: typographic hierarchy, detent sheets, safe areas, and touch ergonomics. |
| [`security-first`](skills/security-first/SKILL.md) | Security | Defensive threat modeling, input validation schemas, credential hygiene, and parameterized execution. |
| [`code-cleaner`](skills/code-cleaner/SKILL.md) | Quality | Scope-bound code cleanup, dead code pruning, unused import stripping, and debug artifact removal. |
| [`frugal-token`](skills/frugal-token/SKILL.md) | Efficiency | Context window optimization, bounded file reads, surgical replacements, and progressive disclosure. |

---

## How Skills Work: Agent-Agnostic Architecture

Nate Skills separates canonical engineering discipline from host environment configuration:

```
┌────────────────────────────────────────────────────────┐
│             Nate Skills Canonical Core                 │
│   skills/*/SKILL.md (Agent-Agnostic Guardrails)        │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
   ┌───────────────────────┐ ┌───────────────────────┐
   │ Project Installation  │ │  Global Installation  │
   │ (.agent, .cursorrules)│ │  (~/.gemini, ~/.claude)│
   └───────────────────────┘ └───────────────────────┘
```

Each skill is self-contained within `skills/<skill-id>/SKILL.md`. Host adapters inject managed pointers into your agent's rule configurations within dedicated markers:

```markdown
<!-- NATE-SKILLS:START -->
# Nate Skills Configuration (Cursor)
Mode: during - Active guardrails during implementation
- think-before-code: Follow rules in .cursor/skills/think-before-code/SKILL.md
- anti-bullshit: Follow rules in .cursor/skills/anti-bullshit/SKILL.md
...
<!-- NATE-SKILLS:END -->
```

Existing user configuration outside these markers is completely preserved.

---

## Interactive Installer UX

Run without arguments to launch the modern, keyboard-navigated CLI installer:

```bash
npx nate-skills
```

```text
Nate Skills
Practical Guardrails for AI Coding Agents

? Select agents
❯ ◉ Cursor (detected)
  ◉ Claude Code (detected)
  ◯ Antigravity
  ◯ Codex
  ◯ Gemini CLI
  ◯ OpenCode

↑↓ Navigate  Space Toggle  Enter Confirm

? Select preset
❯ Full (All 8 practical guardrail skills)
  Frontend (UI, responsive, cleaner, token, methodology)
  Backend (Security, cleaner, token, anti-bullshit, methodology)
  Mobile (iOS UI, responsive, security, full frontend stack)
  Minimal (Core discipline: think, anti-bullshit, security)

? Installation scope
❯ Project (Install into current project repository)
  Global (Install into user profile home directory)

? Mode
❯ During (Active guardrails during implementation)
  After (Post-implementation review and cleanup)
  Ask (Agent dynamically decides relevance)
```

---

## Curated Presets

- **`minimal`**: Essential engineering discipline (`think-before-code`, `anti-bullshit`, `security-first`).
- **`frontend`**: Web & UI engineering (`think-before-code`, `anti-bullshit`, `human-ui`, `responsive-first`, `code-cleaner`, `frugal-token`).
- **`mobile`**: Full mobile & hybrid stack (`think-before-code`, `anti-bullshit`, `human-ui`, `responsive-first`, `ios-ui`, `security-first`, `code-cleaner`, `frugal-token`).
- **`backend`**: APIs & services (`think-before-code`, `anti-bullshit`, `security-first`, `code-cleaner`, `frugal-token`).
- **`full`**: Complete suite of all 8 guardrail skills.

---

## Operational Modes

- **`during`** *(default)*: Guardrails act as continuous, active operational constraints during implementation.
- **`after`**: Emphasizes post-implementation review, code hygiene, and verification gates before finishing.
- **`ask`**: Instructs the agent to evaluate the task and dynamically invoke relevant guardrails on demand.

---

## Supported Agents

Verified adapters with dedicated filesystem signals:

- **Antigravity** (`.agent`, `.antigravity`, `~/.gemini/antigravity`)
- **Claude Code** (`CLAUDE.md`, `.claude`, `~/.claude`)
- **Codex** (`CODEX.md`, `.codex`, `~/.codex`)
- **Cursor** (`.cursorrules`, `.cursor`, `~/.cursor`)
- **Gemini CLI** (`GEMINI.md`, `.gemini`, `~/.gemini`)
- **OpenCode** (`OPENCODE.md`, `.opencode`, `~/.opencode`)
- **Manual / Universal** (`.skills`, `AGENTS.md`)

---

## CLI Reference

Non-interactive commands for scripting, CI, or advanced setups:

```bash
# General
npx nate-skills --help
npx nate-skills --version
npx nate-skills --list

# Install specific presets or agents directly
npx nate-skills --agent cursor --preset frontend
npx nate-skills --agent codex --skill anti-bullshit
npx nate-skills --project --preset full
npx nate-skills --global --preset minimal

# Select operational mode
npx nate-skills --agent claude-code --preset backend --mode during

# Maintenance & Health Checks
npx nate-skills update --agent antigravity
npx nate-skills validate --agent cursor
npx nate-skills uninstall --agent cursor
```

---

## Contributing

Please review [CONTRIBUTING.md](CONTRIBUTING.md) and the operational rules in [AGENTS.md](AGENTS.md) before submitting pull requests.

```bash
git clone https://github.com/nateskills/nate-skills.git
cd nate-skills
npm install
npm run build
```

---

## License

[MIT](LICENSE)
