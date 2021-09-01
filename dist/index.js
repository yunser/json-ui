"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdUI = void 0;
const uiUtil = require('./util');
// import * as fs from 'fs'
function objectSomeAttr(obj, attrs) {
    let result = {};
    for (let attr of attrs) {
        if (obj[attr] != undefined) {
            result[attr] = obj[attr];
        }
    }
    return result;
}
const uiObj = {
    "_type": "root",
    "width": 1000,
    "height": 1000,
    "_children": [
        {
            "_type": "rect",
            "x": 0,
            "y": 0,
            "width": 100,
            "height": 100,
            "color": "#f00",
            radius: 8,
        },
        {
            "_type": "rect",
            "x": 100,
            "y": 100,
            "width": 100,
            "height": 100,
            "color": "#09c"
        },
        {
            "_type": "circle",
            "cx": 150,
            "cy": 50,
            // "width": 100,
            // "height": 100,
            radius: 50,
            "color": "#f00"
        },
        {
            "_type": "rect",
            "x": 200,
            "y": 0,
            "width": 100,
            "height": 100,
            // "color": "#09c",
            // "stroke": "#09c",
            "border": {
                color: "#09c",
                width: 10,
            }
        },
        {
            "_type": "text",
            "x": 200,
            "y": 0,
            // "width": 100,
            // "height": 100,
            // "color": "#f00",
            // radius: 8,
            text: '你好',
            textSize: 100,
        },
        {
            "_type": "circle",
            "cx": 350,
            "cy": 50,
            // "width": 100,
            // "height": 100,
            radius: 50,
            "border": {
                color: "#09c",
                width: 1,
            }
            // "color": "#f00"
        },
        {
            "_type": "line",
            "x1": 0,
            "y1": 100,
            x2: 100,
            y2: 200,
            "border": {
                color: "#f00",
                width: 1,
            }
            // "width": 100,
            // "height": 100,
            // "color": "#f00",
            // radius: 8,
        },
    ]
};
function convertUiObj2XmlObject(obj) {
    let out = uiUtil.treeMap(obj, {
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
            let result = {
                type: node._type,
                // children: node._children as any,
                attr: attrs,
                // _type: type,
                // ...attrs,
            };
            return result;
        }
    });
    return out;
}
function convertUiObj2SvgObject(rootObj) {
    let out = uiUtil.treeMap(rootObj, {
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
            if (_type === 'root') {
                return {
                    type: 'svg',
                    attr: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        version: '1.1',
                        // "width": 200,
                        // "height": 200
                    },
                };
            }
            if (_type === 'rect') {
                let _attr = objectSomeAttr(attrs, ['width', 'height', 'x', 'y']);
                if (attrs.color) {
                    _attr.fill = attrs.color;
                }
                else {
                    _attr.fill = 'none';
                }
                if (attrs.border) {
                    _attr.stroke = attrs.border.color;
                    _attr['stroke-width'] = attrs.border.width || 1;
                }
                if (attrs.radius) {
                    _attr.rx = attrs.radius;
                    _attr.ry = attrs.radius;
                }
                let node = {
                    type: 'rect',
                    attr: _attr,
                    // _attrs: attrs,
                };
                return node;
            }
            if (_type === 'circle') {
                let _attr = objectSomeAttr(attrs, ['cx', 'cy']);
                if (attrs.radius) {
                    _attr.r = attrs.radius;
                }
                if (attrs.color) {
                    _attr.fill = attrs.color;
                }
                else {
                    _attr.fill = 'none';
                }
                if (attrs.border) {
                    _attr.stroke = attrs.border.color;
                    _attr['stroke-width'] = attrs.border.width || 1;
                }
                let node = {
                    type: 'circle',
                    attr: _attr,
                    // _attrs: attrs,
                };
                return node;
            }
            if (_type === 'text') {
                let _attr = objectSomeAttr(attrs, ['x', 'y']);
                // if (attrs.radius) {
                //     _attr.r = attrs.radius
                // }
                // if (attrs.color) {
                //     _attr.fill = attrs.color
                // }
                let style = '';
                if (attrs.textSize) {
                    style += `font-size: ${attrs.textSize}px`;
                }
                _attr.style = style;
                _attr['dominant-baseline'] = 'text-before-edge';
                let node = {
                    type: 'text',
                    attr: _attr,
                    _data: attrs.text
                    // _attrs: attrs,
                };
                return node;
            }
            if (attrs.border) {
                attrs.stroke = attrs.border.color;
                attrs['stroke-width'] = attrs.border.width || 1;
                // TODO
                delete attrs.border;
            }
            let result = {
                type: node._type,
                // children: node._children as any,
                attr: attrs,
                // _attrs: attrs,
                // _type: type,
                // ...attrs,
            };
            return result;
        }
    });
    out.children.unshift({
        type: 'rect',
        attr: {
            x: 0,
            y: 0,
            width: rootObj.width,
            height: rootObj.height,
            fill: rootObj.color
        },
    });
    // console.debug(out)
    return out;
}
// console.log('json', JSON.stringify(uiObj, null, 4))
// console.log('xmlObj', JSON.stringify(convertUiObj2XmlObject(uiObj), null, 4))
// console.log('svgObj', JSON.stringify(convertUiObj2SvgObject(uiObj), null, 4))
// fs.writeFileSync('out.svg', uiUtil.svgObj2Xml(convertUiObj2SvgObject(uiObj)), 'utf8')
// console.log('json', {
//     a: '1',
//     a: '2',
// })
exports.StdUI = {
    toSvg({ root }) {
        // console.log('svgObj', JSON.stringify(convertUiObj2SvgObject(uiObj), null, 4))
        // fs.writeFileSync('out.svg', , 'utf8')
        return uiUtil.svgObj2Xml(convertUiObj2SvgObject(root));
    }
};
//# sourceMappingURL=index.js.map