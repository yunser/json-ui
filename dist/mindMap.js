"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindMap = void 0;
// import { XmlObject } from './types'
const uiUtil = require('./util');
const uid_1 = require("uid");
const helper_1 = require("./helper");
exports.MindMap = {
    toKityMinder({ root }) {
        let kmObj = {
            root: uiUtil.treeMap(root, {
                childrenKey: '_children',
                nodeHandler(node) {
                    return {
                        data: {
                            id: (0, uid_1.uid)(12),
                            created: Math.floor(new Date().getTime() / 1000),
                            text: node._text
                        },
                    };
                }
            }),
            template: 'right',
            theme: 'fresh-blue',
            version: '1.4.43'
        };
        return JSON.stringify(kmObj, null, 4);
    },
    toFreeMind({ root }) {
        let rootNode = uiUtil.treeMap(root, {
            childrenKey: '_children',
            childrenSetKey: '_children',
            nodeHandler(node, { level }) {
                return {
                    _type: 'node',
                    CREATED: '' + new Date().getTime(),
                    ID: 'ID_' + (0, uid_1.uid)(32),
                    MODIFIED: '' + new Date().getTime(),
                    TEXT: node._text,
                };
            }
        });
        console.log('rootNode', rootNode);
        const xmlObj = {
            _type: 'map',
            version: '1.0.1',
            _children: [
                rootNode,
            ]
        };
        return uiUtil.svgObj2Xml((0, helper_1.convertTypedJson2XmlObject)(xmlObj));
    },
    toProcessOn({ root }) {
        let rootNode = uiUtil.treeMap(root, {
            childrenKey: '_children',
            // childrenSetKey: '_children',
            nodeHandler(node, { level }) {
                if (level === 0) {
                    return {
                        "root": true,
                        "theme": "delicate_caihong",
                        "id": "root",
                        "title": node._text,
                        "structure": "mind_free",
                        "leftChildren": [],
                        "note": "",
                        "watermark": "",
                    };
                }
                return {
                    "id": (0, uid_1.uid)(12),
                    "title": node._text,
                    // "parent": "root",
                    // "lineStyle": {
                    //     "randomLineColor": "#ff0000"
                    // },
                };
            }
        });
        rootNode = uiUtil.treeMap(rootNode, {
            childrenKey: 'children',
            // childrenSetKey: '_children',
            nodeHandler(node, { level, parent }) {
                if (level === 0) {
                }
                else {
                    node.parent = parent.id;
                }
                if (!node.children) {
                    node.children = [];
                }
                return node;
                // return {
                //     "id": uid(12),
                //     "title": node._text,
                //     // "parent": "root",
                //     "lineStyle": {
                //         "randomLineColor": "#ff0000"
                //     },
                // }
            }
        });
        // console.log('rootNode', rootNode)
        // const xmlObj: TypedJson = {
        //     _type: 'map',
        //     version: '1.0.1',
        //     _children: [
        //         rootNode,
        //     ]
        // }
        let posObj = {
            "diagram": {
                // "image": {
                //     "x": 0,
                //     "width": 200,
                //     "y": 0,
                //     "pngdata": "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAsUlEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8GXHmAAFMgHIEAAAAAElFTkSuQmCC",
                //     "height": 200
                // },
                elements: rootNode,
            },
            "meta": {
                // "exportTime": moment().format('YYYY-MM-DD HH:mm:ss'),
                // "member": "57f33ba3e4b0300f4fdc6b5d",
                "diagramInfo": {
                    // "creator": "57f33ba3e4b0300f4fdc6b5d",
                    // "created": moment().format('YYYY-MM-DD HH:mm:ss'),
                    // "modified": moment().format('YYYY-MM-DD HH:mm:ss'),
                    "title": "root",
                    "category": "mind_free"
                },
                // "id": uid(24),
                "type": "ProcessOn Schema File",
                "version": "1.0"
            }
        };
        return JSON.stringify(posObj, null, 4);
    },
};
// console.log('1630560256056', new Date().getTime())
//# sourceMappingURL=mindMap.js.map