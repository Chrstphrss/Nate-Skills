import { color, symbols } from './theme.js';

export class Spinner {
  private message: string;
  private frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private frameIndex = 0;
  private intervalId?: NodeJS.Timeout;
  private isSpinning = false;

  constructor(message: string) {
    this.message = message;
  }

  public start(): this {
    if (!process.stdout.isTTY) {
      console.log(`${symbols.pipe}  ${this.message}...`);
      return this;
    }
    this.isSpinning = true;
    this.frameIndex = 0;
    process.stdout.write(`${symbols.pipe}  ${this.frames[0]} ${this.message}`);
    this.intervalId = setInterval(() => {
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
      process.stdout.write(`\r${symbols.pipe}  ${color('cyan', this.frames[this.frameIndex])} ${this.message}`);
    }, 80);
    return this;
  }

  public succeed(message?: string): void {
    this.stop();
    const msg = message || this.message;
    if (process.stdout.isTTY) {
      process.stdout.write(`\r${symbols.pipe}  ${color('green', symbols.check)} ${msg}\n`);
    } else {
      console.log(`${symbols.pipe}  ${color('green', symbols.check)} ${msg}`);
    }
  }

  public fail(message?: string): void {
    this.stop();
    const msg = message || this.message;
    if (process.stdout.isTTY) {
      process.stdout.write(`\r${symbols.pipe}  ${color('red', symbols.cross)} ${msg}\n`);
    } else {
      console.log(`${symbols.pipe}  ${color('red', symbols.cross)} ${msg}`);
    }
  }

  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.isSpinning = false;
  }
}
