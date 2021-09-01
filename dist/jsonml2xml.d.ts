declare const uiUtil: any;
declare const fs: any;
interface XmlObject {
    type: string;
    attr?: object;
    children?: XmlObject[];
}
declare type JsonML = [string] | [string, object] | [string, object, JsonML[]];
declare function isObjHasAttr(obj: any): boolean;
declare const jsonml: JsonML;
interface JsonmlProperties {
    [key: string]: string | number;
}
declare let j: JsonML;
declare function handleItem(jsonml: JsonML): XmlObject;
declare const xmlObject: XmlObject;
