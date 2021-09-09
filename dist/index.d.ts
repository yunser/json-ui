export interface StdUiRoot {
    _type: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    cx?: number;
    cy?: number;
    radius?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    color?: string | null;
    text?: string;
    _children?: StdUiRoot[];
    border?: any;
    textSize?: number;
}
interface StdUiDoc {
    root: StdUiRoot;
}
export declare class StdUI {
    root: StdUiRoot;
    constructor(doc: StdUiDoc);
    toSvg(): string;
    toProcessOn(): string;
}
export {};
