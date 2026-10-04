# responsive-first

## Purpose
Guarantees clean, adaptive multi-device experiences by starting with mobile constraints and building upward systematically.

## Usage
Use when designing websites, web applications, email templates, and responsive dashboards.

## Operational Workflow
1. **Base Styles**: Author core CSS for mobile / narrow viewports without media queries.
2. **Breakpoints**: Add `min-width` media queries for tablet (`768px`), desktop (`1024px`), and ultra-wide screens.
3. **Verification**: Check overflow properties, text wrapping, and button tap boundaries.

## Examples
- *Good*: Transforming a multi-column data grid into stacked swipeable cards on screens narrower than 640px.
- *Bad*: Applying `overflow-x: scroll` to the whole webpage body to avoid fixing oversized elements.

## Limitations
- Complex data visualization tables may require specialized column-toggling or horizontal scroll wrappers.
