export interface StdMindMapNode {
    _type: string;
    _text: string;
    _children?: StdMindMapNode[];
}
export interface StdMindMap {
    version?: string;
    root: StdMindMapNode;
}
export declare class MindMap {
    root: StdMindMapNode;
    constructor(obj?: StdMindMap);
    /**
     * import from KityMinder
     * @param content KityMinder file JSON content
     */
    fromKityMinder(content: string): void;
    /**
     * convert to KityMinder file content
     * @returns KityMinder file（ .km） content
     */
    toKityMinder(): string;
    /**
     * convert to FreeMind file content
     * @returns FreeMind file（ .mm） content
     */
    toFreeMind(): string;
    /**
     * convert to ProcessOn MindMap file content
     * @returns ProcessOn MindMap file（ .pos） content
     */
    toProcessOn(): string;
    /**
     * convert to STd Mind Map object
     * @returns ProcessOn MindMap file（ .pos） content
     */
    toStdMindMapObject(): StdMindMap;
}
