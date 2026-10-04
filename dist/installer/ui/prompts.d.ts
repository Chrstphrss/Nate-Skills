export interface SelectOption<T> {
    label: string;
    value: T;
    description?: string;
    details?: string[];
    hint?: string;
}
export declare class CliCancelledError extends Error {
    constructor(message?: string);
}
/**
 * Single Select with Arrow Keys (Up/Down), Enter to confirm, Esc to cancel.
 * Supports multi-line option rendering (description and detail lines).
 */
export declare function promptSelect<T>(title: string, options: SelectOption<T>[], defaultIndex?: number): Promise<T>;
/**
 * Multi Select with Arrow Keys (Up/Down), Space to toggle, Enter to confirm, Esc to cancel.
 * Shows ✓ next to selected items and dynamically displays description for the highlighted item.
 */
export declare function promptMultiSelect<T extends string>(title: string, options: SelectOption<T>[], defaultSelected?: T[]): Promise<T[]>;
/**
 * Confirmation prompt with Enter to proceed, Esc to cancel.
 */
export declare function promptConfirm(title: string, hint?: string): Promise<boolean>;
