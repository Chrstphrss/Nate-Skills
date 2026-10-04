import { color, symbols } from './theme.js';
export class Spinner {
    message;
    frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    frameIndex = 0;
    intervalId;
    isSpinning = false;
    constructor(message) {
        this.message = message;
    }
    start() {
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
    succeed(message) {
        this.stop();
        const msg = message || this.message;
        if (process.stdout.isTTY) {
            process.stdout.write(`\r${symbols.pipe}  ${color('green', symbols.check)} ${msg}\n`);
        }
        else {
            console.log(`${symbols.pipe}  ${color('green', symbols.check)} ${msg}`);
        }
    }
    fail(message) {
        this.stop();
        const msg = message || this.message;
        if (process.stdout.isTTY) {
            process.stdout.write(`\r${symbols.pipe}  ${color('red', symbols.cross)} ${msg}\n`);
        }
        else {
            console.log(`${symbols.pipe}  ${color('red', symbols.cross)} ${msg}`);
        }
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        this.isSpinning = false;
    }
}
