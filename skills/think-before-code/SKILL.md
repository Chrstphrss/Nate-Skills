---
name: think-before-code
description: >
  Mandates thorough pre-modification reconnaissance, architectural pattern discovery,
  dependency inspection, blast-radius mapping, and explicit planning before writing code.
---

# Think Before Code

## Purpose
Prevents premature, destructive, or hallucinated code changes by enforcing a systematic phase of codebase reconnaissance, architectural pattern discovery, and explicit planning before modifying or adding code.

## When to Apply
Activate whenever:
- Starting any new feature, bug fix, refactor, or test suite.
- Working in unfamiliar codebases, modules, or directories.
- Introducing, updating, or removing dependencies or configuration files.
- Responding to complex or multi-file user instructions.

## Core Principles
1. **Reconnaissance Before Modification**: Never write code in an environment you have not inspected. Read existing directory structures, conventions, and configurations first.
2. **Adhere to Architectural Conventions**: Mirror existing naming schemes, module boundaries, error handling idioms, and typing paradigms.
3. **Map the Blast Radius**: Trace callers, dependencies, sibling components, test suites, and documentation affected by the planned modification.
4. **Reuse Over Invention**: Search existing utilities, shared helpers, and imported packages before writing custom functions or classes.
5. **Zero Speculative Requirements**: Implement strictly what is requested and what direct technical necessity mandates. Never introduce unprompted abstractions or speculative features.
6. **Plan First**: Formulate an ordered, minimal execution sequence before touching files.

## Workflow
1. **Repository & Manifest Reconnaissance**:
   - Inspect package manifests (`package.json`, `Cargo.toml`, `pyproject.toml`) for installed dependencies and build scripts.
   - Inspect the top-level directory layout to locate architectural boundaries (e.g., `src/`, `lib/`, `core/`, `ui/`).
2. **Contextual File Inspection**:
   - Locate the exact files relevant to the task.
   - Inspect their imports, exported symbols, types, and internal style.
3. **Utility & Pattern Search**:
   - Search utility directories (`utils/`, `helpers/`, `common/`) for functions that already perform required operations (formatting, path parsing, validation).
4. **Blast-Radius Mapping & Plan Formulation**:
   - List the minimal set of files that must be modified.
   - Formulate an ordered, contiguous editing plan.
   - Note which tests or documentation need synchronized updates.
5. **Surgical Implementation**:
   - Execute the planned edits adhering strictly to established idioms.

## Decision Rules
- **For Small Changes (<20 lines)**: Inspect the immediate function and its caller/callee context; confirm no existing utility already solves the problem before editing.
- **For Large Changes / New Features**: Map out directory structure, create a step-by-step checklist of files to create/update, and verify alignment with existing architectural boundaries.
- **For Unfamiliar Code**: Read surrounding module comments, type signatures, and sibling components before writing code.
- **For Bug Fixes**: Trace the root cause from error logs or failing tests; understand *why* the existing implementation failed before altering it.
- **For Refactors**: Confirm existing behavior and interfaces; never change public contracts without explicit instruction.
- **For Dependency Changes**: Check if the runtime standard library or an already-installed package accomplishes the goal before proposing a new dependency.

## Hard Rules
- **Never modify a file without inspecting it first**: You cannot understand the context of code you haven't read.
- **Never invent file paths or APIs**: Verify that every referenced path, module export, and dependency exists.
- **Never rewrite unrelated code**: Do not format, reorder, or refactor files outside the direct scope of the task.
- **Never introduce premature abstractions**: Do not build generic frameworks, wrapper classes, or factory patterns for single-use logic.
- **Never alter architecture without justification**: Adhere to the design choices already established in the codebase.

## Anti-Patterns
- Jumping directly into file editing based on assumptions about how the codebase is structured.
- Writing custom string or array helpers when an identical utility is already available in the project.
- Re-architecting a module's design pattern (e.g., switching from procedural functions to classes) without an explicit directive.
- Adding heavy third-party libraries for trivial tasks that the standard library natively provides.

## Verification & Quality Gates
- Confirm that all newly introduced imports resolve to actual modules or installed packages.
- Verify that naming conventions and code style match sibling files.
- Ensure only files strictly necessary for the user's request were modified.

## Completion Criteria
- Codebase conventions and existing patterns have been verified and mirrored.
- No duplicate abstractions or unnecessary dependencies were introduced.
- Implementation matches the minimal plan formulated during pre-flight inspection.
