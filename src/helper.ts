import { XmlObject } from './types'
const uiUtil = require('./util')
// import * as fs from 'fs'


export interface TypedJson {
    _type: string
    _children?: TypedJson[]
    [key: string]: any
}

function objectSomeAttr(obj: object, attrs: string[]) {
    let result: any = {}
    for (let attr of attrs) {
        if (obj[attr] != undefined) {
            result[attr] = obj[attr]
        }
    }
    return result
}

export function convertTypedJson2XmlObject(rootObj: TypedJson): XmlObject {
    let out = uiUtil.treeMap(rootObj, {
        childrenKey: '_children',
        nodeHandler(node: TypedJson) {
            // let type
            let attrs: any = {}
            for (let key in node) {
                if (!key.match(/^_/)) {
                    attrs[key] = node[key]
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
            let _type = node._type
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
                children: node._children as any,
                attr: attrs,
                // _attrs: attrs,
                // _type: type,
                // ...attrs,
            }
            return result
        }
    })
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
    return out
}