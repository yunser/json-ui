"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTypedJson2XmlObject = exports.uiUtil = exports.svgObj2Xml = exports.xmlObj2Xml = exports.uid = void 0;
const uid_1 = require("uid");
Object.defineProperty(exports, "uid", { enumerable: true, get: function () { return uid_1.uid; } });
// const uiUtil = require('./util')
// import * as fs from 'fs'
function treeMap(treeObj, options = {}) {
    const { nodeHandler, childrenKey = 'children', childrenSetKey = 'children' } = options;
    function dealList(children, level, p) {
        let results = [];
        for (let child of children) {
            results.push(dealObj(child, level, p));
            // content += (indent ? ('\n' + textLoop(indent, level)) : '') + 
        }
        // content += (indent ? (textLoop(indent, level) + '\n') : '')
        return results;
    }
    function dealObj(obj, level = 0, parent) {
        let children = [];
        if (obj[childrenKey] && obj[childrenKey].length) {
            children = dealList(obj[childrenKey], level + 1, obj);
        }
        let result = nodeHandler(obj, { level, parent });
        if (children.length) {
            result[childrenSetKey] = children;
        }
        return result;
        // let attrContent = ''
        // if (obj.attr) {
        //     for (let key in obj.attr) {
        //         attrContent += ` ${key}="${obj.attr[key]}"`
        //     }
        // }
        // return result
    }
    return dealObj(treeObj, 0, null);
}
function treeFilter(treeObj, options = {}) {
    const { nodeHandler } = options;
    function dealList(children, level) {
        let results = [];
        for (let child of children) {
            let ret = dealObj(child, level);
            if (ret) {
                results.push(ret);
            }
            // content += (indent ? ('\n' + textLoop(indent, level)) : '') + 
        }
        // content += (indent ? (textLoop(indent, level) + '\n') : '')
        return results;
    }
    function dealObj(obj, level = 0) {
        let children = [];
        if (obj && obj.children && obj.children.length) {
            children = dealList(obj.children, level + 1);
        }
        let result = nodeHandler(obj);
        // if (result)
        if (result && children.length) {
            result.children = children;
        }
        return result;
        // let attrContent = ''
        // if (obj.attr) {
        //     for (let key in obj.attr) {
        //         attrContent += ` ${key}="${obj.attr[key]}"`
        //     }
        // }
        // return result
    }
    return dealObj(treeObj, 0);
}
function treeForEach(treeObj, nodeHandler) {
    function dealList(children, level) {
        let results = [];
        for (let child of children) {
            let ret = dealObj(child, level);
            if (ret) {
                results.push(ret);
            }
            // content += (indent ? ('\n' + textLoop(indent, level)) : '') + 
        }
        // content += (indent ? (textLoop(indent, level) + '\n') : '')
        return results;
    }
    function dealObj(obj, level = 0) {
        let children = [];
        if (obj && obj.children && obj.children.length) {
            children = dealList(obj.children, level + 1);
        }
        let result = nodeHandler(obj);
        // if (result)
        if (result && children.length) {
            result.children = children;
        }
        return result;
        // let attrContent = ''
        // if (obj.attr) {
        //     for (let key in obj.attr) {
        //         attrContent += ` ${key}="${obj.attr[key]}"`
        //     }
        // }
        // return result
    }
    return dealObj(treeObj, 0);
}
function textLoop(indent, num) {
    let result = '';
    for (let i = 0; i < num; i++) {
        result += indent;
    }
    return result;
}
// TODO 注意属性的各种类型 undefined null
function xmlObj2Xml(svgObj, options = {}) {
    console.log('svgObj', JSON.stringify(svgObj, null, 4));
    const { indent = '    ', closeTags = [] } = options;
    function dealList(children, level) {
        let content = '';
        for (let child of children) {
            content += (indent ? ('\n' + textLoop(indent, level)) : '') + dealObj(child, level);
        }
        content += (indent ? (textLoop(indent, level) + '\n') : '');
        return content;
    }
    function dealObj(obj, level = 0) {
        let childrenContent = '';
        if (obj.children && obj.children.length) {
            childrenContent = dealList(obj.children, level + 1);
        }
        let attrContent = '';
        if (obj.attr) {
            for (let key in obj.attr) {
                if (obj.attr[key] != undefined) {
                    attrContent += ` ${key}="${obj.attr[key]}"`;
                }
            }
        }
        const hasClose = closeTags.includes(obj.type);
        let closeHtml = hasClose ? ' />' : `</${obj.type}>`;
        let contentHtml = hasClose ? '' : `${obj._data || ''}${childrenContent}`;
        return `<${obj.type}${attrContent}${hasClose ? '' : '>'}${contentHtml}${closeHtml}`;
    }
    return dealObj(svgObj, 0);
}
exports.xmlObj2Xml = xmlObj2Xml;
exports.svgObj2Xml = xmlObj2Xml;
exports.uiUtil = {
    treeMap,
    treeFilter,
    svgObj2Xml: exports.svgObj2Xml,
};
function objectSomeAttr(obj, attrs) {
    let result = {};
    for (let attr of attrs) {
        if (obj[attr] != undefined) {
            result[attr] = obj[attr];
        }
    }
    return result;
}
function convertTypedJson2XmlObject(rootObj) {
    let out = exports.uiUtil.treeMap(rootObj, {
        childrenKey: '_children',
        nodeHandler(node) {
            // let type
            let attrs = {};
            for (let key in node) {
                if (!key.match(/^_/)) {
                    attrs[key] = node[key];
                }
            }
            // if (node._type == 'root') {
            //     type = 'root'
            // } else if (node._type == 'tag') {
            //     type = node.name
            //     attrs = node.attribs
            // } else {
            //     if (node._type == 'text') {
            //         console.log('node', node)
            //         const { data } = node
            //         if (data.match(/^\s+$/)) {
            //             return null
            //         }
            //     } 
            //     type = 'other:' + node._type
            // }
            let _type = node._type;
            // if (_type === 'root') {
            //     return {
            //         type: 'svg',
            //         attr: {
            //             xmlns: 'http://www.w3.org/2000/svg',
            //             version: '1.1',
            //             // "width": 200,
            //             // "height": 200
            //         },
            //     }
            // }
            // if (_type === 'rect') {
            //     let _attr = objectSomeAttr(attrs, ['width', 'height', 'x', 'y'])
            //     if (attrs.color) {
            //         _attr.fill = attrs.color
            //     } else {
            //         _attr.fill = 'none'
            //     }
            //     if (attrs.border) {
            //         _attr.stroke = attrs.border.color
            //         _attr['stroke-width'] = attrs.border.width || 1
            //     }
            //     if (attrs.radius) {
            //         _attr.rx = attrs.radius
            //         _attr.ry = attrs.radius
            //     }
            //     let node: any = {
            //         type: 'rect',
            //         attr: _attr,
            //         // _attrs: attrs,
            //     }
            //     return node
            // }
            // if (_type === 'circle') {
            //     let _attr = objectSomeAttr(attrs, ['cx', 'cy'])
            //     if (attrs.radius) {
            //         _attr.r = attrs.radius
            //     }
            //     if (attrs.color) {
            //         _attr.fill = attrs.color
            //     } else {
            //         _attr.fill = 'none'
            //     }
            //     if (attrs.border) {
            //         _attr.stroke = attrs.border.color
            //         _attr['stroke-width'] = attrs.border.width || 1
            //     }
            //     let node: any = {
            //         type: 'circle',
            //         attr: _attr,
            //         // _attrs: attrs,
            //     }
            //     return node
            // }
            // if (_type === 'text') {
            //     let _attr = objectSomeAttr(attrs, ['x', 'y'])
            //     // if (attrs.radius) {
            //     //     _attr.r = attrs.radius
            //     // }
            //     // if (attrs.color) {
            //     //     _attr.fill = attrs.color
            //     // }
            //     let style = ''
            //     if (attrs.textSize) {
            //         style += `font-size: ${attrs.textSize}px`
            //     }
            //     _attr.style = style
            //     _attr['dominant-baseline'] = 'text-before-edge'
            //     let node: any = {
            //         type: 'text',
            //         attr: _attr,
            //         _data: attrs.text
            //         // _attrs: attrs,
            //     }
            //     return node
            // }
            // if (attrs.border) {
            //     attrs.stroke = attrs.border.color
            //     attrs['stroke-width'] = attrs.border.width || 1
            //     // TODO
            //     delete attrs.border
            // }
            let result = {
                type: node._type,
                children: node._children,
                attr: attrs,
                _data: node._text, // TODO 重构
                // _attrs: attrs,
                // _type: type,
                // ...attrs,
            };
            return result;
        }
    });
    // out.children.unshift({
    //     type: 'rect',
    //     attr: {
    //         x: 0,
    //         y: 0,
    //         width: rootObj.width,
    //         height: rootObj.height,
    //         fill: rootObj.color
    //     },
    // })
    // console.debug(out)
    return out;
}
exports.convertTypedJson2XmlObject = convertTypedJson2XmlObject;
//# sourceMappingURL=helper.js.map