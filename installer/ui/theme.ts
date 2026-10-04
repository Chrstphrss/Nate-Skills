import * as process from 'node:process';

// Terminal capability detection
const isColorSupported =
  !process.env.NO_COLOR &&
  (process.env.FORCE_COLOR !== '0') &&
  (process.stdout.isTTY || process.env.CI || process.env.COLORTERM);

const isUnicodeSupported =
  process.platform !== 'win32' ||
  Boolean(process.env.WT_SESSION) || // Windows Terminal
  Boolean(process.env.TERMINUS_SUBLIME) ||
  process.env.ConEmuTask === '{cmd::Cmder}' ||
  process.env.TERM_PROGRAM === 'vscode' ||
  process.env.TERM === 'xterm-256color' ||
  process.env.TERM === 'alacritty';

export const theme = {
  reset: isColorSupported ? '\x1b[0m' : '',
  bold: isColorSupported ? '\x1b[1m' : '',
  dim: isColorSupported ? '\x1b[2m' : '',
  cyan: isColorSupported ? '\x1b[36m' : '',
  green: isColorSupported ? '\x1b[32m' : '',
  yellow: isColorSupported ? '\x1b[33m' : '',
  red: isColorSupported ? '\x1b[31m' : '',
  magenta: isColorSupported ? '\x1b[35m' : '',
  blue: isColorSupported ? '\x1b[34m' : '',
  gray: isColorSupported ? '\x1b[90m' : '',
  white: isColorSupported ? '\x1b[37m' : ''
};

export const symbols = {
  top: isUnicodeSupported ? '┌' : '+',
  pipe: isUnicodeSupported ? '│' : '|',
  step: isUnicodeSupported ? '◇' : '>',
  bottom: isUnicodeSupported ? '└' : '+',
  check: isUnicodeSupported ? '✓' : '√',
  cross: isUnicodeSupported ? '✗' : 'x',
  warning: isUnicodeSupported ? '⚠' : '!',
  bullet: isUnicodeSupported ? '•' : '*',
  arrow: isUnicodeSupported ? '→' : '->',
  pointer: isUnicodeSupported ? '❯' : '>',
  selected: isUnicodeSupported ? '◉' : '[*]',
  unselected: isUnicodeSupported ? '◯' : '[ ]',
  question: '?'
};

export function color(c: keyof typeof theme, text: string): string {
  if (!isColorSupported) return text;
  return `${theme[c]}${text}${theme.reset}`;
}
