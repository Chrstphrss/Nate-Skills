---
name: code-cleaner
description: >
  Performs localized, behavior-preserving code cleanup around modified areas. Prunes dead code,
  unused imports, stray debuggers, and accidental complexity without escalating tasks into broad refactors.
---

# Code Cleaner

## Purpose
Maintains codebase hygiene, readability, and structural leaness by eliminating dead code, orphaned imports, debug statements, and accidental complexity in the immediate vicinity of a change without turning tasks into disruptive, wide-ranging refactors.

## When to Apply
Activate whenever:
- Finishing any feature implementation, bug fix, or refactor before finalizing.
- Reviewing changed files for orphaned imports or left-over diagnostics.
- Pruning obsolete code paths directly replaced by new logic.
- Simplifying needlessly convoluted logic within modified files.

## Core Principles
1. **Scope-Bound Hygiene**: Clean code only within files and functions directly touched by the current task. Never launch unsolicited project-wide refactoring campaigns.
2. **Preserve External Behavior**: Code cleanup must be strictly behavioral-invariant. Never alter public contracts, function signatures, or observable return values during cleanup.
3. **Small Improvements Over Grand Rewrites**: Prefer localized simplifications over tearing down working architectures.
4. **Ruthless Elimination of Debris**: Strip unused imports, dead functions, unreachable branches, and debug artifacts (`console.log`, `debugger`, commented-out legacy code).

## Workflow
1. **Review Changed Files**:
   - Inspect the git diff or modified line set for the current task.
2. **Strip Diagnostics & Debug Artifacts**:
   - Remove temporary `console.log`, `print`, `debugger`, and experimental comments introduced during development.
3. **Prune Unused Symbols & Imports**:
   - Check imported modules against actual usage; remove unused imports and type references.
   - Delete private helper functions that became orphaned as a result of the change.
4. **Remove Commented-Out Zombie Code**:
   - Delete blocks of commented-out code. Version control preserves history; comments should explain *why*, not preserve old implementations.
5. **Flatten Accidental Complexity**:
   - Simplify nested conditionals using early returns or guard clauses.
   - Collapse redundant duplicate logic into clean, focused helpers within the module.
6. **Verify Invariant Behavior**:
   - Compile or typecheck the codebase to confirm no required symbols were accidentally pruned.

## Decision Rules
- **For Unused Imports in Untouched Files**: Do NOT touch them. Limit cleanup strictly to files modified in the active task.
- **For Public APIs / Exported Functions**: Do not delete exported functions even if they appear unused internally, unless you have verified that the package is private and all references are gone.
- **For Commented Code**: If a comment explains non-obvious business logic or technical context, KEEP it. If a comment is commented-out executable code, DELETE it.
- **For Abstractions**: If a helper function is only called once and adds cognitive indirection without reuse or testability benefits, inline it.

## Hard Rules
- **Never perform unrelated refactors**: Do not reformat files, reorganize directory structures, or rename untouched symbols outside the immediate task.
- **Never break public contracts**: Do not change exported function names, parameter orders, or return types unless explicitly tasked to do so.
- **Never leave debug print statements in committed code**: Remove all temporary diagnostic logging before declaring work done.
- **Never keep commented-out old code "just in case"**: Trust git history for rollback.

## Anti-Patterns
- Opening 15 untouched files across the repository to fix indentation or remove unused variables.
- Introducing a complex generic design pattern (e.g., AbstractFactoryProvider) to replace a 5-line switch statement.
- Accidentally deleting exported utility functions consumed by downstream consumers or external packages.
- Leaving `console.log('HERE 1')` or `console.log('val:', data)` in production code.

## Verification & Quality Gates
- Inspect the diff to verify that every deleted line was genuinely dead code, debug logging, or an unused import.
- Run the compiler or linter (`npm run build`, `tsc`, `eslint`) to confirm zero unresolved import errors or syntax breaks.

## Completion Criteria
- Modified files contain zero unused imports, dead branches, or stray debug statements.
- All code changes strictly preserve existing functionality and public interfaces.
- The diff contains only purposeful, intentional modifications.
