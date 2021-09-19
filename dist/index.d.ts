export interface StdUiRoot {
    _type: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    cx?: number;
    cy?: number;
    rx?: number;
    ry?: number;
    radius?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    color?: string | null;
    text?: string;
    href?: string;
    _children?: StdUiRoot[];
    border?: any;
    fill?: any;
    points?: any;
    d?: any;
    textSize?: number;
}
export declare function _if(condition: boolean, obj: object): object[];
interface StdUiDoc {
    root: StdUiRoot;
}
interface ToSvgOpts {
    forceImage?: boolean;
}
export declare class StdUI {
    root: StdUiRoot;
    constructor(doc: StdUiDoc);
    toSvg(toSvgOpts?: ToSvgOpts): string;
    toProcessOn(): string;
    toHtml(): string;
}
export {};
