// import { XmlObject } from './types'
// const uiUtil = require('./util')
// import { uid } from 'uid'
import { uid, uiUtil } from './helper'
import { convertTypedJson2XmlObject, TypedJson } from './helper'
import * as moment from 'moment'

export interface StdMindMapNode {
    _type: string
    _text: string
    _children?: StdMindMapNode[]
}

export interface StdMindMap {
    version?: string
    root: StdMindMapNode
}

const mindMapUtil = {
    toKityMinder({ root }): string {
        let kmObj = {
            root: uiUtil.treeMap(root, {
                childrenKey: '_children',
                nodeHandler(node) {
                    return {
                        data: {
                            id: uid(12),
                            created: Math.floor(new Date().getTime() / 1000),
                            text: node._text
                        },
                    }
                }
            }),
            template: 'right',
            theme: 'fresh-blue',
            version: '1.4.43'
        }
        return JSON.stringify(kmObj, null, 4)
    },
    toFreeMind({ root }): string {
        let rootNode = uiUtil.treeMap(root, {
            childrenKey: '_children',
            childrenSetKey: '_children',
            nodeHandler(node, { level }) {
                return {
                    _type: 'node',
                    CREATED: '' + new Date().getTime(),
                    ID: 'ID_' + uid(32),
                    MODIFIED: '' + new Date().getTime(),
                    TEXT: node._text,
                }
            }
        })

        console.log('rootNode', rootNode)

        const xmlObj: TypedJson = {
            _type: 'map',
            version: '1.0.1',
            _children: [
                rootNode,
            ]
        }

        return uiUtil.svgObj2Xml(convertTypedJson2XmlObject(xmlObj))
    },
    toProcessOn({ root }): string {
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
                    }
                }
                return {
                    "id": uid(12),
                    "title": node._text,
                    // "parent": "root",
                    // "lineStyle": {
                    //     "randomLineColor": "#ff0000"
                    // },
                }
            }
        })
        rootNode = uiUtil.treeMap(rootNode, {
            childrenKey: 'children',
            // childrenSetKey: '_children',
            nodeHandler(node, { level, parent }) {
                if (level === 0) {
                } else {
                    node.parent = parent.id
                }
                if (!node.children) {
                    node.children = []
                }
                return node
                // return {
                //     "id": uid(12),
                //     "title": node._text,
                //     // "parent": "root",
                //     "lineStyle": {
                //         "randomLineColor": "#ff0000"
                //     },
                // }
            }
        })

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
        }
        return JSON.stringify(posObj, null, 4)
    },
}

// console.log('1630560256056', new Date().getTime())
export class MindMap {

    root: StdMindMapNode = {
        "_type": "node",
        "_text": "",
        "_children": [
        ]
    }

    constructor(obj?: StdMindMap) {
        if (obj) {
            this.root = obj.root
        }
    }

    /**
     * import from KityMinder
     * @param content KityMinder file JSON content
     */
    fromKityMinder(content: string) {
        let a = {
            "root": {
                "data": {
                    "id": "7905907e5583",
                        "created": 1630560479,
                            "text": "root"
                },
                "children": [
                    {
                        "data": {
                            "id": "cdzikk5kj3s0",
                            "created": 1630597495445,
                            "text": "1"
                        },
                        "children": [
                            {
                                "data": {
                                    "id": "cdziklqo8rk0",
                                    "created": 1630597498898,
                                    "text": "11"
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "id": "cdzikmsye2w0",
                                    "created": 1630597501213,
                                    "text": "12"
                                },
                                "children": []
                            }
                        ]
                    },
                    {
                        "data": {
                            "id": "cdziko7gzts0",
                            "created": 1630597504267,
                            "text": "2"
                        },
                        "children": [
                            {
                                "data": {
                                    "id": "cdzikt2nux40",
                                    "created": 1630597514860,
                                    "text": "21"
                                },
                                "children": []
                            }
                        ]
                    },
                    {
                        "data": {
                            "id": "cdzikpypppc0",
                            "created": 1630597508091,
                            "text": "3"
                        },
                        "children": []
                    }
                ]
            },
            "template": "right",
            "theme": "fresh-blue",
            "version": "1.4.43"
        }
        const km = JSON.parse(content)

        let root = uiUtil.treeMap(km.root, {
            // childrenKey: '_children',
            childrenSetKey: '_children',
            nodeHandler(node) {
                return {
                    _type: 'node',
                    _text: node.data.text,
                }
            }
        })

        console.log('root', root)
        this.root = root
    }

    /**
     * convert to KityMinder file content
     * @returns KityMinder file（ .km） content
     */
    toKityMinder(): string {
        return mindMapUtil.toKityMinder({ root: this.root })
    }

    /**
     * convert to FreeMind file content
     * @returns FreeMind file（ .mm） content
     */
    toFreeMind(): string {
        return mindMapUtil.toFreeMind({ root: this.root })
    }

    /**
     * convert to ProcessOn MindMap file content
     * @returns ProcessOn MindMap file（ .pos） content
     */
    toProcessOn(): string {
        return mindMapUtil.toProcessOn({ root: this.root })
    }

    /**
     * convert to STd Mind Map object
     * @returns ProcessOn MindMap file（ .pos） content
     */
    toStdMindMapObject(): StdMindMap {
        return JSON.parse(JSON.stringify(this.root))
    }
}