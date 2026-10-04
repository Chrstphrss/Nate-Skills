# think-before-code

## Purpose
Prevents premature code modification by enforcing systematic codebase inspection, contextual awareness, and intentional planning.

## Usage
Add this skill to your AI agent rules or workflows to mandate pre-flight repository inspection and architectural consistency.

## Operational Workflow
1. **Inspect**: Use directory listings, file searches, or symbol grep to survey affected areas.
2. **Analyze**: Trace data flow, existing patterns, and integration points.
3. **Plan**: Formulate concrete change steps.
4. **Execute**: Implement precisely according to the verified plan.

## Examples
- *Good*: Searching existing string utilities in `src/utils` before writing a new slugify function.
- *Bad*: Immediately writing a new custom HTTP client when `ky` or `axios` is already configured in the repo.

## Limitations
- Does not replace deep architectural design documents for large enterprise systems.
- Inspection depth should be balanced against token budget.
