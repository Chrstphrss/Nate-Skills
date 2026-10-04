# ios-ui

## Purpose
Brings refined iOS Human Interface design sensibilities—fluid touch interaction, grouped lists, bottom sheets, safe area adherence—to hybrid, mobile, and web applications without proprietary asset infringement.

## Usage
Include in mobile web, React Native, Capacitor, Flutter, or PWA frontends where native feel is desired.

## Operational Workflow
1. **Safe Area Audit**: Confirm that status bar and home indicator insets are handled via CSS environment variables.
2. **Component Structure**: Implement rounded cards (typically 10-14px radius), segmented controls, and accessible action sheets.
3. **Refine Feedback**: Add subtle pressed states on touch targets.

## Examples
- *Good*: Grouped card views with subtle light grey dividers and padded list items.
- *Bad*: Hardcoded `bottom: 0px` floating bars overlapping the iOS home indicator bar.

## Limitations
- Must remain platform-agnostic when running on Android or desktop, avoiding unnatural inconsistencies.
