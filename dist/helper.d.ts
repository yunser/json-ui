import { XmlObject } from './types';
import { uid } from 'uid';
export { uid };
declare function treeMap(treeObj: any, options?: any): any;
declare function treeFilter(treeObj: any, options?: any): any;
export declare function xmlObj2Xml(svgObj: XmlObject, options?: any): string;
/**
 * @deprecated
 */
export declare const svgObj2Xml: typeof xmlObj2Xml;
export declare const uiUtil: {
    treeMap: typeof treeMap;
    treeFilter: typeof treeFilter;
    svgObj2Xml: typeof xmlObj2Xml;
    xmlObj2Xml: typeof xmlObj2Xml;
};
export interface TypedJson {
    _type: string;
    _children?: TypedJson[];
    [key: string]: any;
}
export declare function convertTypedJson2XmlObject(rootObj: TypedJson): XmlObject;
