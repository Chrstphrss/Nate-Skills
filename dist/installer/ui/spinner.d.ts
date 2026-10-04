export declare class Spinner {
    private message;
    private frames;
    private frameIndex;
    private intervalId?;
    private isSpinning;
    constructor(message: string);
    start(): this;
    succeed(message?: string): void;
    fail(message?: string): void;
    stop(): void;
}
