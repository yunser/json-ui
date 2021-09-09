export declare class Doc {
    content: any;
    constructor({ content }: any);
    toHtml(): string;
    toJson(): string;
    toMarkdown(): string;
}
