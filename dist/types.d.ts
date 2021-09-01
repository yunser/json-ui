/**
 * XML 对象
 */
export interface XmlObject {
    type: string;
    attr?: object;
    _data?: string;
    children?: XmlObject[];
}
