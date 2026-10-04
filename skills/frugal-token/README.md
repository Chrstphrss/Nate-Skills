# frugal-token

## Purpose
Enforces intelligent context management and frugal token usage for AI coding agents, maximizing model speed and reasoning focus.

## Usage
Activate across all workflows, especially in large codebases with extensive monorepos or multi-file dependencies.

## Operational Workflow
1. **Scope**: Identify key files and line segments before invoking read tools.
2. **Execute**: Read precise segments and make surgical edits.
3. **Communicate**: Provide clear, direct, and token-efficient answers.

## Examples
- *Good*: Using file search to inspect a specific method implementation rather than viewing all 2,000 lines of an entity file.
- *Bad*: Re-printing the entire 500-line configuration file when modifying a single boolean flag.

## Limitations
- When full-file context is genuinely required for semantic correctness, do not hesitate to inspect the necessary parts.
