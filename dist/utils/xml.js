"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlText2XmlObj = void 0;
// import * as path from 'path'
// const htmlparser = require("htmlparser2")
const htmlparser = require("htmlparser2");
// const { treeMap, treeFilter } = require('./util')
// const xmlContent = fs.readFileSync('ui.xml', 'utf8')
// const uiUtil = require('../util')
const helper_1 = require("../helper");
// import { add } from './core'
// const htmlString = `<svg xmlns="http://www.w3.org/2000/svg" 
// version="1.1" width="400" height="200" style="background-color: #09c">
//   <rect x="0" y="0" width="400" height="200" fill="none" stroke="#000" stroke-width="1"></rect>
//   <rect x="0" y="0" width="100" height="100" fill="#000" stroke="none"></rect>
//   <rect x="100" y="100" width="100" height="100" fill="#09c" stroke="none"></rect>
//   <circle cx="150" cy="50" r="50" stroke="none" stroke-width="2" fill="#f00"></circle>    
// </svg>`
function XmlText2XmlObj(xmlText) {
    let elements = htmlparser.parseDocument(xmlText);
    let out = helper_1.uiUtil.treeMap(elements, {
        nodeHandler(node) {
            let type;
            let attrs = {};
            if (node.type == 'root') {
                type = 'root';
            }
            else if (node.type == 'tag') {
                type = node.name;
                attrs = node.attribs;
            }
            else {
                if (node.type == 'text') {
                    // console.log('node', node)
                    const { data } = node;
                    if (data.match(/^\s+$/)) {
                        return null;
                    }
                }
                type = 'other:' + node.type;
                console.log('nodenode', node);
                attrs._dataText = node.data;
            }
            let result = Object.assign({ _type: type }, attrs);
            return result;
        }
    });
    out = helper_1.uiUtil.treeFilter(out.children[0], {
        nodeHandler: item => item
    });
    return out;
}
exports.XmlText2XmlObj = XmlText2XmlObj;
//# sourceMappingURL=xml.js.map