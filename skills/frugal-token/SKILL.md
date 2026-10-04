---
name: frugal-token
description: >
  Optimizes context window and token usage through surgical file inspection, targeted searches,
  and minimal diff editing. Defines explicit triggers for when broader repository scans are justified.
---

# Frugal Token

## Purpose
Maximizes AI coding agent reasoning capacity and operational velocity while preventing context degradation and unnecessary token expense by enforcing surgical inspection, progressive disclosure, and targeted diff editing.

## When to Apply
Activate across all tasks, especially when:
- Working in large repositories, monorepos, or projects with extensive dependency trees.
- Searching for specific functions, identifiers, or bug traces.
- Reading configuration files, long source modules, or build logs.
- Executing multi-step plans where context window bloat degrades model attention.

## Core Principles
1. **Surgical Precision**: Inspect only the files, line ranges, or functions directly required for the task. Never dump entire directories or huge files when small slices suffice.
2. **Progressive Disclosure**: Start with high-level outlines, manifests, or symbol searches; drill into specific implementations only as required.
3. **Context Reuse**: Retain mental track of files already read in context; never reread unchanged files.
4. **Focused Diff-Based Edits**: Replace only the necessary contiguous lines of code rather than rewriting entire 500-line files.
5. **Correctness Is Paramount**: Token efficiency must NEVER override correctness, security, deep reasoning, or necessary verification.

## Workflow
1. **Scope Identification**:
   - Determine the exact objective and boundaries of the request.
2. **Candidate File Targeting**:
   - Use targeted directory listing or symbol search (`grep`) to locate candidate files rather than crawling the entire directory tree.
3. **Bounded Reading**:
   - For files $>150$ lines, read specific line ranges or method blocks using slice offsets.
4. **Surgical Modification**:
   - Execute edits targeting only the relevant code block.
   - Avoid re-emitting large unchanged blocks of surrounding code.
5. **Review Diff**:
   - Verify that changes are tightly bounded to the objective.
6. **Targeted Verification**:
   - Run specific build or validation commands directly verifying the modified logic.

## When Broad Inspection IS Justified
Broad repository scans and whole-file inspections are explicitly permitted and required when:
- Establishing initial project architecture in a completely blank or undocumented repository.
- Tracing breaking changes or refactoring public interfaces consumed across multiple disparate modules.
- Diagnosing complex multi-package dependency conflicts or build-system resolution failures.
- Auditing project-wide security vulnerabilities or licensing compliance.

## Decision Rules
- **For File Viewing**: If a file is over 200 lines and you only need a specific method, view that method's line range instead of reading the entire file.
- **For Search**: Prefer searching for exact symbol names (e.g., `executeInstall`) over broad keyword searches (e.g., `install`).
- **For Repetitive Tasks**: Process files sequentially with minimal intermediate chatter; summarize results compactly.
- **For Communications**: Be direct, concise, and technical. Omit conversational filler, sycophantic greetings, and repetitive apologies.

## Hard Rules
- **Never scan the entire repository without cause**: Do not run recursive tree listings or wide-open greps without filtering paths.
- **Never reopen unchanged files repeatedly**: If a file's content is already present in your conversation context and hasn't been modified, reference the existing context.
- **Never rewrite entire files for localized edits**: Use surgical block replacement tools whenever available.
- **Never sacrifice correctness for token savings**: If semantic understanding genuinely requires reading the whole module, read the whole module.
- **Never skip necessary verification to save tokens**: Always run required compiler checks and builds.

## Anti-Patterns
- Reading all files in a directory one by one just to find where a single variable is declared.
- Rewriting a 400-line file from scratch just to flip a single boolean flag from `false` to `true`.
- Echoing entire file contents back to the user in chat responses when only a 3-line diff was changed.
- Explaining at length what each line of code does when the user simply asked for the fix.

## Verification & Quality Gates
- Confirm that the number of files viewed and modified was strictly bounded to the problem domain.
- Verify that tool calls were purposeful, non-redundant, and had clear objectives.

## Completion Criteria
- Task is completely and correctly implemented with the minimum necessary token expenditure.
- No unchanged files were reread or unnecessarily rewritten.
- Context window remains clean and unpolluted with irrelevant code dumps.
