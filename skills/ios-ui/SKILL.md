---
name: ios-ui
description: >
  Applies an iOS-native-inspired UI design language across web, mobile, and desktop interfaces.
  Enforces typographic clarity, restrained depth, safe areas, navigation detents, sheets, and touch ergonomics.
---

# iOS UI

## Purpose
Brings refined, native-inspired human interface sensibilities—typographic hierarchy, proportional spacing, safe-area awareness, detent sheets, and tactile feedback—to cross-platform web and mobile interfaces without infringing proprietary Apple assets or cloning closed platform screens literally.

## When to Apply
Activate whenever:
- Building mobile web apps, PWAs, React Native, Capacitor, or hybrid frontend views targeting handheld devices.
- Implementing navigation patterns like bottom navigation bars, action sheets, segmented controls, or modal drawers.
- Integrating safe-area insets for modern notched screens and home indicators.
- Styling card-based grouped tables, forms, or touch-friendly lists across platforms.

## Core Principles
1. **Clarity, Hierarchy & Depth**: High-contrast typography with clear hierarchy (Large Title, Title, Headline, Subheadline, Body, Caption); clean grouping of content on subtle, layered neutral backgrounds.
2. **Restraint Over Excess**: Avoid excessive glassmorphism, heavy drop shadows, garish neon gradients, and gratuitous blur filters. Use subtle borders ($0.5\text{px}-1\text{px}$ hairline dividers) and neutral elevations.
3. **Ergonomic Safe-Area Awareness**: Adhere to device boundaries, hardware notches, dynamic islands, and bottom home indicator bars using standard CSS environment variables.
4. **Tactile Feedback & Natural Motion**: Provide snappy, natural feedback on interaction (e.g., slight opacity drop or micro-scaling on active press) using natural physics curves (`cubic-bezier(0.25, 1, 0.5, 1)`) rather than linear transitions.
5. **Zero Proprietary Cloning**: Emulate design *principles*, not proprietary Apple trademarks, copyrighted SF Symbols glyphs, or closed interface assets.

## Workflow
1. **Configure Safe Areas**:
   - Add viewport meta tag with `viewport-fit=cover`.
   - Incorporate `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` into fixed headers and footers:
     ```css
     padding-top: max(1rem, env(safe-area-inset-top));
     padding-bottom: max(1rem, env(safe-area-inset-bottom));
     ```
2. **Structure Grouped Card Layouts**:
   - Format lists and settings as grouped cards with rounded corners ($10\text{px}-16\text{px}$ radius), light dividers, and consistent padding ($16\text{px}$).
3. **Implement Navigation Ergonomics**:
   - Bottom tab bars for top-level navigation (pinned above the home indicator).
   - Bottom sheet presentations for secondary details and quick actions with swipe/tap to dismiss.
   - Segmented controls for mutually exclusive toggle views.
4. **Tune Touch Targets & Active States**:
   - Minimum tap target $44 \times 44\text{pt}$.
   - Add `:active` feedback: `opacity: 0.7` or `transform: scale(0.98)` with `transition: transform 120ms ease`.

## Decision Rules
- **For Modals**: On mobile viewports, present secondary forms or pickers as detent bottom sheets rather than centered desktop modal boxes.
- **For Dark Mode**: Implement true dark mode ergonomics using high-contrast foregrounds and deep neutral zinc/gray backgrounds (`#000000` or `#121212` base, `#1C1C1E` elevated cards) rather than low-contrast desaturated colors.
- **For Gestures**: If supporting swipe-to-dismiss, ensure keyboard or button fallbacks exist so users who cannot perform gestures are never blocked.

## Hard Rules
- **Never hardcode bottom zero for sticky footers**: Sticky bottom elements must always add `env(safe-area-inset-bottom)` to prevent collisions with the OS home indicator.
- **Never copy proprietary Apple trademarks or assets**: Do not rip proprietary Apple icons, branding, or closed typography. Use open-source font stacks (`system-ui`, `-apple-system`, `Inter`) and open-source icon sets (Lucide, Feather).
- **Never disable touch highlights without replacing them**: If `-webkit-tap-highlight-color: transparent` is set, explicit `:active` styling must be provided.
- **Avoid decorative blur overload**: Do not apply `backdrop-filter: blur(...)` to every container; restrict blurs to navigation bars and floating toolbars to preserve performance.

## Anti-Patterns
- Placing primary interactive buttons under the iOS home indicator where tapping activates app switching.
- Layering heavy gradients and multiple concentric borders that look dated and cluttered.
- Forcing Android or desktop users into non-standard iOS navigation paradigms where native browser controls are expected.

## Verification & Quality Gates
- Verify layout on notched mobile screens to confirm safe-area padding around headers and footers.
- Test touch interactions to ensure active press feedback triggers cleanly without lag.
- Check dark mode contrast and legibility across all grouped cards and text elements.

## Completion Criteria
- Layout respects all device safe-area insets cleanly.
- Visual hierarchy features balanced typography, clean rounded grouped containers, and restrained elevations.
- Zero proprietary Apple assets or trade-dress violations are present.
