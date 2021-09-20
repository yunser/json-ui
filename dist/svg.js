"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSvg = void 0;
const htmlparser2 = require("htmlparser2");
// import * as htmlparser from 'htmlparser2'
// const svgContent = fs.readFileSync('res/design.svg', 'utf8')
// console.log('svgContent', svgContent)
const xml_1 = require("./utils/xml");
const helper_1 = require("./helper");
const allChildren = [];
function parseSvg(content) {
    const xmlObj = (0, xml_1.XmlText2XmlObj)(content);
    console.log('xmlObj', JSON.stringify(xmlObj, null, 4));
    // if (1 + 1 > 1) {
    //     throw new Error('asas')
    // }
    let out = helper_1.uiUtil.treeMap(xmlObj, {
        childrenKey: 'children',
        nodeHandler(node) {
            console.log('node', node);
            if (node._type == 'rect') {
                if (node.width != '800') {
                    let hasStroke = !!node['stroke'];
                    let strokeWidth = node['stroke-width'] ? parseInt(node['stroke-width']) : 1;
                    // if (hasStroke) {
                    // } else {
                    //     strokeWidth = node['stroke-width'] ? parseInt(node['stroke-width']) : 0
                    // }
                    const rect = {
                        "_type": "rect",
                        "x": parseInt(node.x) - strokeWidth / 2,
                        "y": parseInt(node.y) - strokeWidth / 2,
                        "width": parseInt(node.width) + strokeWidth,
                        "height": parseInt(node.height) + strokeWidth,
                        // color,
                        // "color": null,
                        // "color": "#f00",
                    };
                    let color = null;
                    if (node['fill']) {
                        rect.color = node['fill'];
                    }
                    if (node['rx']) {
                        rect.borderRadius = parseInt(node['rx']);
                    }
                    if (hasStroke) {
                        rect.border = {
                            color: node['stroke'],
                            width: strokeWidth,
                        };
                    }
                    allChildren.push(rect);
                }
            }
            if (node._type == 'ellipse') {
                let hasStroke = !!node['stroke'];
                let strokeWidth = node['stroke-width'] ? parseInt(node['stroke-width']) : 1;
                // if (hasStroke) {
                // } else {
                //     strokeWidth = node['stroke-width'] ? parseInt(node['stroke-width']) : 0
                // }
                const rx = parseInt(node.rx);
                const ry = parseInt(node.ry);
                const ellipse = {
                    "_type": "ellipse",
                    "cx": parseInt(node.cx),
                    "cy": parseInt(node.cy),
                    "rx": rx + strokeWidth / 2,
                    "ry": ry + strokeWidth / 2,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                };
                if (node['fill']) {
                    ellipse.color = node['fill'];
                }
                if (node['rx']) {
                    ellipse.borderRadius = parseInt(node['rx']);
                }
                if (hasStroke) {
                    ellipse.border = {
                        color: node['stroke'],
                        width: strokeWidth,
                    };
                }
                console.log('ellipse', ellipse);
                if (1 + 1 > 1) {
                    throw new Error('asas');
                }
                allChildren.push(ellipse);
            }
            else if (node._type == 'image') {
                const text = {
                    "_type": "image",
                    "x": parseInt(node.x),
                    "y": parseInt(node.y),
                    "width": parseInt(node.width),
                    "height": parseInt(node.height),
                    href: node.href,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                };
                console.log('textNode', node);
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(text);
            }
            else if (node._type == 'text') {
                const text = {
                    "_type": "text",
                    "x": parseInt(node.x),
                    "y": parseInt(node.y),
                    // "width": parseInt(node.width),
                    // "height": parseInt(node.height),
                    // href: node.href,
                    text: node.children[0]._dataText,
                    // text: node._dataText,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                };
                let color = null;
                if (node['fill']) {
                    text.color = node['fill'];
                }
                let fontSize = 14;
                let fontFamily = undefined;
                const styles = (node.style || '').split(';').filter(item => item).map(item => {
                    const _arr = item.split(':');
                    return {
                        key: _arr[0].trim(),
                        value: _arr[1] ? _arr[1].trim() : '',
                    };
                });
                console.log('styles', styles);
                for (let style of styles) {
                    if (style.key == 'font-size') {
                        fontSize = parseInt(style.value.replace('px', ''));
                    }
                    else if (style.key == 'font-family') {
                        fontFamily = style.value;
                        // fontSize = parseInt(style.value.replace('px', ''))
                    }
                }
                console.log('node', node);
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                text.textSize = fontSize;
                text.fontFamily = fontFamily;
                console.log('textNode', node);
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(text);
            }
            else if (node._type == 'path') {
                let hasStroke = !!node['stroke'];
                let strokeWidth = node['stroke-width'] ? parseInt(node['stroke-width']) : 1;
                const path = {
                    "_type": "path",
                    // "x": parseInt(node.x),
                    // "y": parseInt(node.y),
                    // "width": parseInt(node.width),
                    // "height": parseInt(node.height),
                    // href: node.href,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                    d: node.d,
                };
                console.log('textNode', node);
                if (node['fill']) {
                    path.color = node['fill'];
                }
                if (hasStroke) {
                    path.border = {
                        color: node['stroke'],
                        width: strokeWidth,
                    };
                }
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(path);
            }
            else if (node._type == 'text') {
                const text = {
                    "_type": "rect",
                    "x": parseInt(node.x),
                    "y": parseInt(node.y),
                    // "width": parseInt(node.width) + strokeWidth,
                    // "height": parseInt(node.height) + strokeWidth,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                };
                console.log('textNode', node);
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(text);
            }
            return {};
        }
    });
    const root = {
        "_type": "root",
        "width": 800,
        "height": 800,
        "color": "#E6E6FB",
        // "color": null,
        "_children": allChildren,
    };
    return root;
}
exports.parseSvg = parseSvg;
// export function add(num1: number, num2: number) {
//     return num1 + num2
// }
//# sourceMappingURL=svg.js.map