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
    color?: string;
    text?: string;
    _children?: StdUiRoot[];
    border?: any;
    textSize?: number;
}
export declare const StdUI: {
    toSvg({ root }: {
        root: StdUiRoot;
    }): string;
};
