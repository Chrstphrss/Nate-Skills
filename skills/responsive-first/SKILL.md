---
name: responsive-first
description: >
  Treats viewport constraints as primary design inputs. Enforces mobile-first responsive architecture
  across viewports, typography, layouts, tables, and interaction targets, preventing broken desktop-down adaptations.
---

# Responsive First

## Purpose
Prevents broken, compressed, or horizontally scrolling mobile layouts by treating viewport boundaries as structural design inputs rather than cosmetic post-processing, designing systematically from the smallest practical viewport upwards.

## When to Apply
Activate whenever:
- Designing or implementing CSS, Tailwind styles, HTML layouts, or design system components.
- Building data tables, dashboards, navigation headers, modals, or card grids.
- Refactoring desktop-only views to support mobile or tablet viewports.
- Reviewing typography scaling, fluid spacing, or multi-column arrangements.

## Core Principles
1. **Design From the Smallest Practical Viewport**: Build the base styles for narrow screens ($320\text{px}-375\text{px}$) first, then layer progressive enhancements for wider viewports using `min-width` queries.
2. **Intentional Adaptation, Not Simple Shrinkage**: Do not merely scale down desktop tables or dense columns until unreadable; restructure content hierarchically (e.g., stacked cards, vertical flows).
3. **Fluid Layouts & Elastic Units**: Utilize relative units (`rem`, `ch`, `%`, `clamp()`, `vw`) and flexible container wrappers (`flex-wrap`, CSS Grid `auto-fit`/`auto-fill`).
4. **Touch & Ergonomic Compatibility**: Respect thumb reach on handheld screens and scale tap targets appropriately.

## Workflow
1. **Define Narrow-Screen Baseline**:
   - Author base styles assuming a single-column layout at $\approx 360\text{px}$.
   - Ensure headers, margins, and cards fit within viewport boundaries without horizontal scrollbars.
2. **Add Progressive Breakpoints**:
   - Introduce tablet breakpoints ($\approx 640\text{px}-768\text{px}$) for two-column splits or expanded toolbars.
   - Introduce desktop breakpoints ($\approx 1024\text{px}-1280\text{px}$) for full sidebars and multi-column grids.
3. **Restructure Complex Components**:
   - Navigation: Adapt hamburger/drawer navigation into sticky top or desktop side navigation.
   - Tables: Convert dense tabular data into expandable card summaries on mobile, or provide explicit horizontal scrolling containers with visible scroll indicators.
   - Modals: Render bottom-sheet or full-screen dialogs on mobile; centered dialogs on desktop.
4. **Audit Overflow & Viewport Boundaries**:
   - Check that `overflow-x: hidden` on `body` is not used merely as a band-aid to mask oversized child containers.

## Decision Rules
- **For Fixed Widths**: Never use fixed pixel widths on layout containers (e.g., `width: 1200px`). Use `max-width: 1200px; width: 100%`.
- **For Breakpoints**: Reuse existing project breakpoints or design tokens (e.g., Tailwind `sm`, `md`, `lg`). Do not invent arbitrary breakpoint values when established standards exist in the repository.
- **For Typography**: Use fluid typography (`clamp(1rem, 2.5vw, 1.5rem)`) or responsive utility classes so headings do not wrap awkwardly into single-word lines on small screens.
- **For Data Tables**: If a table has $>4$ columns, wrap it in an explicit `overflow-x: auto` container with pinned header/first column, or render responsive summary cards on mobile.

## Hard Rules
- **Zero horizontal scroll on mobile**: The viewport must never scroll horizontally at standard device widths ($320\text{px}$ to $430\text{px}$).
- **Minimum tap targets**: Interactive elements (buttons, links, form controls) must maintain a minimum touch target size of at least $44 \times 44\text{px}$.
- **Never disable user zoom**: Do not set `maximum-scale=1.0` or `user-scalable=no` in the viewport meta tag.
- **Images and media must be fluid**: All `img`, `video`, and `canvas` elements must have `max-width: 100%; height: auto`.

## Anti-Patterns
- Writing desktop styles first and then scattering fragile `max-width` media queries to reverse desktop styling.
- Shrinking 14px font down to 8px just to fit a desktop table onto a phone screen.
- Hiding critical functionality on mobile solely because it was difficult to format in a narrow column.
- Relying on `window.innerWidth` checks in JavaScript for layout decisions where pure CSS media queries or container queries suffice.

## Verification & Quality Gates
- Test interface rendering at $320\text{px}$, $375\text{px}$, $768\text{px}$, and $1280\text{px}$ viewports.
- Confirm zero unintentional horizontal scrollbars appear on any viewport size.
- Inspect tap targets to ensure comfortable touch ergonomics without overlapping buttons.

## Completion Criteria
- Layout flows naturally and legibly from $320\text{px}$ through wide desktop screens.
- Data tables, navigation, and modal dialogues adapt their structure intentionally to viewport constraints.
- All media and containers respect viewport boundaries without clipping or overflow.
