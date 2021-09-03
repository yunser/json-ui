import { XmlObject } from './types';
export interface TypedJson {
    _type: string;
    _children?: TypedJson[];
    [key: string]: any;
}
export declare function convertTypedJson2XmlObject(rootObj: TypedJson): XmlObject;
