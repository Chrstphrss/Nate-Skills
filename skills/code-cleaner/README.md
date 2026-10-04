# code-cleaner

## Purpose
Enforces code tidiness, reducing technical debt and mental friction by eliminating dead code, leftover diagnostics, and excessive abstractions.

## Usage
Apply during code authoring and post-implementation review phases to keep the codebase lean and maintainable.

## Operational Workflow
1. **Audit**: Scan changed files for unused imports and debug logs.
2. **Prune**: Safely delete dead branches and redundant code blocks.
3. **Verify**: Ensure the test suite and type checker pass after pruning.

## Examples
- *Good*: Deleting a helper function that is no longer imported anywhere in the project.
- *Bad*: Leaving multiple commented-out lines of old logic "just in case we need it later".

## Limitations
- Do not remove code intended as public API surface area in libraries even if not internally consumed.
