export declare const theme: {
    reset: string;
    bold: string;
    dim: string;
    cyan: string;
    green: string;
    yellow: string;
    red: string;
    magenta: string;
    blue: string;
    gray: string;
    white: string;
};
export declare const symbols: {
    top: string;
    pipe: string;
    step: string;
    bottom: string;
    check: string;
    cross: string;
    warning: string;
    bullet: string;
    arrow: string;
    pointer: string;
    selected: string;
    unselected: string;
    question: string;
};
export declare function color(c: keyof typeof theme, text: string): string;
