# human-ui

## Purpose
Enforces human-centered UI design principles, ensuring web and app interfaces are understandable, accessible, and robust against adverse states.

## Usage
Activate this skill when building or refactoring frontend interfaces, web forms, dashboards, and client-facing views.

## Operational Workflow
1. **Audit States**: Map out loading, empty, success, and error paths before styling.
2. **Structure Semantics**: Use native semantic HTML elements (`<button>`, `<main>`, `<nav>`, `<dialog>`).
3. **Refine Usability**: Ensure generous click/tap targets, high-contrast text, and explicit action feedback.

## Examples
- *Good*: Rendering an empty list message with a direct action button "Create your first project".
- *Bad*: Rendering an empty white space or throwing an unhandled `undefined.map()` error when arrays are empty.

## Limitations
- UI styling must still respect existing design systems or component libraries in the repository.
