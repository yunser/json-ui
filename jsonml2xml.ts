// type JmNode = [ string, object, JmNode | JmNode[] ] | string
const uiUtil = require('./util')
const fs = require('fs')

interface XmlObject {
    type: string
    attr?: object
    children?: XmlObject[]
}

console.log('uiUtil', uiUtil)
// import { treeMap, treeFilter, svgObj2Xml } from './util'
// const { treeMap, treeFilter, svgObj2Xml } = uiUtil

type JsonML = [ string ] | [ string, object ] | [ string, object, JsonML[] ]

function isObjHasAttr(obj) {
    let count = 0
    for (let _key in obj) {
        count++
    }
    return count > 0
}

const jsonml: JsonML = ['html', [
    ['head', [
        ['meta', { charset: 'utf-8' }],
        ['title', '这是标题'],
        ['link', { rel: 'stylesheet', href: './home.css' }],
    ]],
    ['body', { class: 'body'}, [
        ['script', { src: './home.js' }]
    ]],
]]

interface JsonmlProperties {
    [key: string]: string | number
}




let j: JsonML = ['as', {}, []]


// console.log('jsonml', JSON.stringify(jsonml, null, 4))



// type: 'svg',
//     attr: {
//         xmlns: 'http://www.w3.org/2000/svg',
//         version: "1.1", 
//         width: "400" ,
//         height: "200",
//     },
//     children:



function handleItem(jsonml: JsonML): XmlObject {
    let _children: any = []
    let _attr: any = {}
    if (Array.isArray(jsonml[1])) {
        _children = jsonml[1]
    } else if (typeof jsonml[1] === 'object') {
        _attr = jsonml[1]
    }
    let result: XmlObject = {
        type: jsonml[0],
    }

    if (Array.isArray(jsonml[2])) {
        _children = jsonml[2]
    }

    if (_children.length) {
        result.children = _children.map(item => handleItem(item))
    }
    if (isObjHasAttr(_attr)) {
        result.attr = _attr
    }
    return result
}

const xmlObject = handleItem(jsonml)

console.log('xmlObject', xmlObject)

console.log('xml', uiUtil.svgObj2Xml(xmlObject))

// console.log('out.htm')

fs.writeFileSync('out.html', uiUtil.svgObj2Xml(xmlObject), 'utf8')
