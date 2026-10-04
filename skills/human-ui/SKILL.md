---
name: human-ui
description: >
  Treats user interfaces as stateful human interactions. Mandates robust handling of loading,
  empty, error, disabled, and success states, accessibility, keyboard/touch ergonomics, and clear affordances.
---

# Human UI

## Purpose
Prevents confusing, fragile, or hostile user interfaces by ensuring software interfaces are architected around human cognitive constraints, predictable interaction patterns, complete state handling, and accessible ergonomics rather than visual novelty alone.

## When to Apply
Activate whenever:
- Designing or implementing frontend views, web components, forms, or interactive widgets.
- Creating command-line interactive prompts or terminal interfaces.
- Handling asynchronous network requests or long-running user actions.
- Reviewing UX edge cases such as error handling, empty lists, or validation states.

## Core Principles
1. **Optimize for Real Human Utility**: Predictable, intuitive layouts take precedence over esoteric visual trends.
2. **Comprehensive State Management**: Every interactive component or view must gracefully account for all 6 lifecycle states:
   - **Idle / Pristine State**: Initial presentation before user interaction.
   - **Loading / Pending State**: Immediate, clear indication that work is underway.
   - **Empty State**: Helpful, non-punitive messaging and obvious next steps when data is absent.
   - **Error State**: Actionable, human-readable explanations with clear recovery paths.
   - **Disabled State**: Visually distinct controls with obvious rationale for inaction.
   - **Success State**: Meaningful confirmation without disruptive interruptions.
3. **Accessibility First**: Semantic elements, keyboard focusability, screen-reader labels, and robust contrast ratios are non-negotiable.
4. **Affordance & Feedback**: Every interactive control must look interactive; non-interactive elements must never mimic interactive controls.

## Workflow
1. **Map User Journey & States**:
   - Trace what the user sees upon initial entry, during submission, on network failure, and on zero results.
2. **Implement Semantic Structure**:
   - Use native interactive elements (`<button>`, `<input>`, `<select>`, `<dialog>`) rather than `div` tags with click handlers.
3. **Provide Immediate Interaction Feedback**:
   - Add clear active/focus states, spinners/skeletons for async actions, and disabled states during in-flight operations.
4. **Form Usability & Validation**:
   - Provide persistent, readable labels for form inputs.
   - Render inline, contextual error messages adjacent to invalid fields rather than generic modal dialogs.
5. **Handle Destructive Actions**:
   - Require explicit confirmation or provide reversible "undo" mechanisms for irreversible or destructive actions.

## Decision Rules
- **For Asynchronous Operations**: Always disable the triggering button and display a loading indicator to prevent duplicate submissions.
- **For Empty Data Sets**: Never render a blank screen or broken list; display an informative empty state explaining why there are no items and how to create one.
- **For Form Validation**: Validate on blur or submission; do not shout error messages before the user has finished typing.
- **For Animation**: Use subtle, functional transitions ($150\text{ms}-300\text{ms}$) that guide spatial orientation; respect `prefers-reduced-motion` media queries.
- **For Touch Targets**: Interactive elements must meet minimum hit target dimensions (at least $44 \times 44\text{px}$ or equivalent padding).

## Hard Rules
- **Every meaningful action must have understandable feedback**: Users must never be left wondering if an interaction registered.
- **Never hide essential functionality behind obscure interactions**: Do not hide primary navigation or crucial actions behind hidden gestures, hover-only tooltips, or obscure shortcuts.
- **Never make non-interactive elements look clickable**: Avoid styling static badges, headers, or cards to look like buttons.
- **Do not optimize aesthetics at the expense of contrast or legibility**: Text must meet minimum WCAG contrast standards ($4.5:1$ for normal text, $3:1$ for large text).
- **Never trap keyboard focus**: All modals and dropdowns must allow escape via keyboard (`Tab`, `Shift+Tab`, `Esc`).

## Anti-Patterns
- Throwing unhandled exceptions or rendering blank pages when an API returns an empty array `[]`.
- Disabling submit buttons indefinitely without explaining which fields failed validation.
- Using generic error alerts ("An error occurred") that do not tell the user what happened or how to fix it.
- Autoplaying disruptive audio or video, or creating flashing animations that induce cognitive overload.

## Verification & Quality Gates
- Verify that every view handles empty, loading, error, and populated states correctly.
- Check keyboard navigability by tabbing through all interactive controls and triggering them with `Enter` or `Space`.
- Verify contrast ratios and readability on standard monitors and mobile viewports.

## Completion Criteria
- All 6 lifecycle states (idle, loading, empty, error, disabled, success) are cleanly handled.
- Form inputs feature explicit labels, validation indicators, and accessible attributes.
- No interactive dead-ends or uninformative errors remain.
