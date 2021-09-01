const fs = require('fs')
// const xml = require('xml')
// fs.writeFileSync('out.html')
// svgContent
var builder = require('xmlbuilder');
var xml = require('xml');
const { svgObj2xml } = require('./util')
// var obj = {
//     svg: {

//       xmlbuilder: {
//         repo: {
//           '@type': 'git', // attributes start with @
//           '#text': 'git://github.com/oozcitak/xmlbuilder-js.git' // text node
//         }
//       }
//     }
//   };
   
// const svgContent = builder.create(obj).end({ pretty: true});

// const svgContent = xml({
//     svg: [
//         {
//             _attr: {
//                 xmlns: 'http://www.w3.org/2000/svg',
//                 version: "1.1", 
//                 width: "400" ,
//                 height: "200",
//             }
//         },
//         {
//             rect: {
//                 x: 0,
//                 y: 0,
//                 width: 400,
//                 height: 200,
//                 fill: "none", 
//                 stroke: "#000",
//                 'stroke-width': "1",
//             }
//         }
//     ]
// }, {
//     indent: '    '
// })

// console.log('svgContent', svgContent)

const svgObj = {
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

const svgContent = svgObj2xml(svgObj)
console.log('xml', svgContent)
fs.writeFileSync('out.svg', svgContent, 'utf8')

console.log('end')

// `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="400" height="200">
// <rect x="0" y="0" width="400" height="200" fill="none" stroke="#000" stroke-width="1"></rect>
// <rect x="0" y="0" width="100" height="100" fill="#000" stroke="none"></rect>
// <circle cx="150" cy="50" r="50" stroke="none" stroke-width="2" fill="#f00" />
// </svg>`
