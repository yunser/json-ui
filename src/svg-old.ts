const fs = require('fs')
const htmlparser = require("htmlparser2")
const uiUtil = require('./util')
const { svgObj2xml } = require('./util')

const jsonContent = fs.readFileSync('ui.json', 'utf8')

import { XmlObject } from './types'

// console.log('XmlObject', XmlObject)

console.log('jsonContent', jsonContent)

// const a: XmlObject = 999

const _svgObj: XmlObject = {
    type: 'svg',
    attr: {
        xmlns: 'http://www.w3.org/2000/svg',
        version: "1.1", 
        width: "400" ,
        height: "200",
    },
    children: [
        {
            type: 'rect',
            attr: {
                x: 0,
                y: 0,
                width: 400,
                height: 200,
                fill: "none", 
                stroke: "#000",
                'stroke-width': "1",
            }
        },
        {
            type: 'rect',
            attr: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                fill: "#000", 
                stroke: "none",
            }
        },
        {
            type: 'rect',
            attr: {
                x: 100,
                y: 100,
                width: 100,
                height: 100,
                fill: "#09c", 
                stroke: "none",
            }
        },
        {
            type: 'circle',
            attr: {
                cx: 150,
                cy: 50,
                r: 50,
                stroke: 'none',
                'stroke-width': 2,
                fill: '#f00',
            }
        },
// <circle cx="150" cy="50" r="50" stroke="none" stroke-width="2" fill="#f00" /
    ]
}



// console.log('svgObj', _svgObj)

// const svgContent = 
// console.log('xml', svgContent)
fs.writeFileSync('out.svg', uiUtil.svgObj2Xml(_svgObj), 'utf8')



// let out = uiUtil.treeMap(elements, {
//     nodeHandler(node) {
//         let type
//         let attrs = {}
//         if (node.type == 'root') {
//             type = 'root'
//         } else if (node.type == 'tag') {
//             type = node.name
//             attrs = node.attribs
//         } else {
//             if (node.type == 'text') {
//                 console.log('node', node)
//                 const { data } = node
//                 if (data.match(/^\s+$/)) {
//                     return null
//                 }
//             } 
//             type = 'other:' + node.type
//         }
//         let result = {
//             _type: type,
//             ...attrs,
//         }
//         return result
//     }
// })
// out = uiUtil.treeFilter(out.children[0], {
//     nodeHandler: item => item
// })

// console.log('elements', elements)
// console.log('out', JSON.stringify(out, null, 4))

// fs.writeFileSync('out.json', JSON.stringify(out, null, 4), 'utf8')
