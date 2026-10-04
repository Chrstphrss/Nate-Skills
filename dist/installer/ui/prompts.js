import * as readline from 'node:readline';
import { color, symbols } from './theme.js';
export class CliCancelledError extends Error {
    constructor(message = 'Cancelled by user') {
        super(message);
        this.name = 'CliCancelledError';
    }
}
/**
 * Ensures terminal cursor is visible and raw mode is cleanly exited.
 */
function cleanupRawMode() {
    if (process.stdin.isTTY) {
        try {
            process.stdin.setRawMode(false);
        }
        catch { }
    }
    process.stdout.write('\x1b[?25h'); // show cursor
}
/**
 * Single Select with Arrow Keys (Up/Down), Enter to confirm, Esc to cancel.
 * Supports multi-line option rendering (description and detail lines).
 */
export async function promptSelect(title, options, defaultIndex = 0) {
    if (!process.stdin.isTTY) {
        return options[defaultIndex]?.value ?? options[0].value;
    }
    let activeIndex = Math.max(0, Math.min(defaultIndex, options.length - 1));
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdout.write('\x1b[?25l'); // hide cursor
    let renderedLines = 0;
    function render(firstTime = false) {
        if (!firstTime && renderedLines > 0) {
            process.stdout.write(`\x1b[${renderedLines}A\r\x1b[J`);
        }
        const lines = [];
        lines.push(`? ${color('bold', title)}`);
        lines.push('');
        options.forEach((opt, idx) => {
            const isCurrent = idx === activeIndex;
            const pointer = isCurrent ? color('cyan', symbols.pointer) : ' ';
            const labelText = isCurrent ? color('cyan', color('bold', opt.label)) : opt.label;
            const hint = opt.hint ? ` ${color('dim', opt.hint)}` : '';
            lines.push(`${pointer} ${labelText}${hint}`);
            if (opt.description) {
                lines.push(`  ${color('dim', opt.description)}`);
            }
            if (opt.details && opt.details.length > 0) {
                for (const detail of opt.details) {
                    lines.push(`  ${color('dim', detail)}`);
                }
            }
            // Add blank spacing line between multi-line items if options have descriptions
            if (idx < options.length - 1 && (opt.description || opt.details)) {
                lines.push('');
            }
        });
        lines.push('');
        lines.push(color('dim', '↑↓ Navigate  Enter Select'));
        renderedLines = lines.length;
        process.stdout.write(lines.join('\n') + '\n');
    }
    render(true);
    return new Promise((resolve, reject) => {
        const onKeypress = (str, key) => {
            if (key.ctrl && key.name === 'c') {
                cleanup();
                process.stdout.write('\n');
                process.exit(130);
            }
            if (key.name === 'escape') {
                cleanup();
                process.stdout.write('\n');
                reject(new CliCancelledError());
                return;
            }
            if (key.name === 'up') {
                activeIndex = (activeIndex - 1 + options.length) % options.length;
                render();
                return;
            }
            if (key.name === 'down') {
                activeIndex = (activeIndex + 1) % options.length;
                render();
                return;
            }
            if (key.name === 'return' || key.name === 'enter') {
                cleanup();
                if (renderedLines > 0) {
                    process.stdout.write(`\x1b[${renderedLines}A\r\x1b[J`);
                }
                process.stdout.write(`${color('green', symbols.check)} ${color('bold', title)}: ${color('cyan', options[activeIndex].label)}\n\n`);
                resolve(options[activeIndex].value);
            }
        };
        function cleanup() {
            process.stdin.removeListener('keypress', onKeypress);
            cleanupRawMode();
        }
        process.stdin.on('keypress', onKeypress);
    });
}
/**
 * Multi Select with Arrow Keys (Up/Down), Space to toggle, Enter to confirm, Esc to cancel.
 * Shows ✓ next to selected items and dynamically displays description for the highlighted item.
 */
export async function promptMultiSelect(title, options, defaultSelected = []) {
    if (!process.stdin.isTTY) {
        return defaultSelected;
    }
    let activeIndex = 0;
    const selectedSet = new Set(defaultSelected);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdout.write('\x1b[?25l'); // hide cursor
    let renderedLines = 0;
    function render(firstTime = false) {
        if (!firstTime && renderedLines > 0) {
            process.stdout.write(`\x1b[${renderedLines}A\r\x1b[J`);
        }
        const lines = [];
        lines.push(`? ${color('bold', title)}`);
        lines.push('');
        options.forEach((opt, idx) => {
            const isCurrent = idx === activeIndex;
            const isSelected = selectedSet.has(opt.value);
            const pointer = isCurrent ? color('cyan', symbols.pointer) : ' ';
            const mark = isSelected ? color('green', symbols.check) : ' ';
            const labelText = isCurrent ? color('cyan', color('bold', opt.label)) : opt.label;
            const hint = opt.hint ? ` ${color('dim', opt.hint)}` : '';
            lines.push(`${pointer} ${mark} ${labelText}${hint}`);
        });
        lines.push('');
        // Dynamic description for currently highlighted option
        const currentOpt = options[activeIndex];
        if (currentOpt?.description) {
            lines.push(`  ${color('dim', currentOpt.description)}`);
            lines.push('');
        }
        lines.push(color('dim', '↑↓ Navigate  Space Toggle  Enter Confirm'));
        renderedLines = lines.length;
        process.stdout.write(lines.join('\n') + '\n');
    }
    render(true);
    return new Promise((resolve, reject) => {
        const onKeypress = (str, key) => {
            if (key.ctrl && key.name === 'c') {
                cleanup();
                process.stdout.write('\n');
                process.exit(130);
            }
            if (key.name === 'escape') {
                cleanup();
                process.stdout.write('\n');
                reject(new CliCancelledError());
                return;
            }
            if (key.name === 'up') {
                activeIndex = (activeIndex - 1 + options.length) % options.length;
                render();
                return;
            }
            if (key.name === 'down') {
                activeIndex = (activeIndex + 1) % options.length;
                render();
                return;
            }
            if (key.name === 'space') {
                const currentVal = options[activeIndex].value;
                if (selectedSet.has(currentVal)) {
                    selectedSet.delete(currentVal);
                }
                else {
                    selectedSet.add(currentVal);
                }
                render();
                return;
            }
            if (key.name === 'return' || key.name === 'enter') {
                const chosen = Array.from(selectedSet);
                cleanup();
                if (renderedLines > 0) {
                    process.stdout.write(`\x1b[${renderedLines}A\r\x1b[J`);
                }
                const summary = chosen.length > 0
                    ? `${chosen.length} skill(s) selected`
                    : 'None';
                process.stdout.write(`${color('green', symbols.check)} ${color('bold', title)}: ${color('cyan', summary)}\n\n`);
                resolve(chosen);
            }
        };
        function cleanup() {
            process.stdin.removeListener('keypress', onKeypress);
            cleanupRawMode();
        }
        process.stdin.on('keypress', onKeypress);
    });
}
/**
 * Confirmation prompt with Enter to proceed, Esc to cancel.
 */
export async function promptConfirm(title, hint = 'Enter Install   Esc Cancel') {
    if (!process.stdin.isTTY) {
        return true;
    }
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdout.write('\x1b[?25l'); // hide cursor
    const lines = [
        `  ${color('dim', hint)}`
    ];
    process.stdout.write(lines.join('\n') + '\n');
    const renderedLines = lines.length;
    return new Promise((resolve, reject) => {
        const onKeypress = (str, key) => {
            if (key.ctrl && key.name === 'c') {
                cleanup();
                process.stdout.write('\n');
                process.exit(130);
            }
            if (key.name === 'escape') {
                cleanup();
                if (renderedLines > 0) {
                    process.stdout.write(`\x1b[${renderedLines}A\r\x1b[J`);
                }
                reject(new CliCancelledError());
                return;
            }
            if (key.name === 'return' || key.name === 'enter') {
                cleanup();
                if (renderedLines > 0) {
                    process.stdout.write(`\x1b[${renderedLines}A\r\x1b[J`);
                }
                resolve(true);
            }
        };
        function cleanup() {
            process.stdin.removeListener('keypress', onKeypress);
            cleanupRawMode();
        }
        process.stdin.on('keypress', onKeypress);
    });
}
