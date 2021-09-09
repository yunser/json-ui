import { XmlObject } from './types'
// const uiUtil = require('./util')
import { uid, uiUtil } from './helper'
// import * as fs from 'fs'
import * as Color from 'color'

// console.log('a', a)

const NodeType = {
    Root: 'root',
    // if (node.type == 'root') {
}


// console.log('uiUtil', uiUtil, uiUtil.treeMap)

function objectSomeAttr(obj: object, attrs: string[]) {
    let result: any = {}
    for (let attr of attrs) {
        if (obj[attr] != undefined) {
            result[attr] = obj[attr]
        }
    }
    return result
}

// assert()
// console.log('objectSomeAttr', objectSomeAttr({ a: 'a', b: 'b' }, ['a']))

// TODO 膨胀？
export interface StdUiRoot {
    _type: string
    x?: number
    y?: number
    width?: number
    height?: number
    cx?: number
    cy?: number
    radius?: number
    x1?: number
    y1?: number
    x2?: number
    y2?: number
    color?: string | null
    text?: string
    _children?: StdUiRoot[]
    border?: any // TODO
    textSize?: number 
}

const uiObj: StdUiRoot = {
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
}

function convertUiObj2XmlObject(obj: StdUiRoot): XmlObject {
    let out = uiUtil.treeMap(obj, {
        childrenKey: '_children',
        nodeHandler(node: StdUiRoot) {
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
            let result: XmlObject = {
                type: node._type,
                // children: node._children as any,
                attr: attrs,
                // _type: type,
                // ...attrs,
            }
            return result
        }
    })
    return out
}

export function _if(condition: boolean, obj: object) {
    return condition ? [obj] : []
}

function convertUiObj2SvgObject(rootObj: StdUiRoot): XmlObject {

    function createShadow(shadow, node) {
        const id = uid(8)
        const color = Color(shadow.color || '#000')
        const rgb = color.object()
        // console.log('rgb', rgb)
        // console.log('color', )
        // fillStyle = {
        //     color: color.rgb().array().join(','),

        let json = {
            type: 'filter',
            attr: {
                id,
                // x: node.x,
                // y: node.x,
                width: 400, // TODO
                height: 400, // TODO
            },
            children: [
                {
                    type: 'feOffset',
                    attr: {
                        result: "offOut",
                        in: "SourceAlpha",
                        dx: shadow.x || 0,
                        dy: shadow.y || 0,
                    },
                },
                {
                    type: 'feGaussianBlur',
                    attr: {
                        result: "blurOut",
                        in: "offOut",
                        stdDeviation: shadow.blur ? (shadow.blur / 2) : 0,
                    },
                },
                {
                    type: 'feMorphology',
                    attr: {
                        in: "feGaussianBlur",
                        operator: "dilate",
                        radius: shadow.spread || 0,
                        result: "big",
                    },
                },
                // <feMorphology in="feGaussianBlur" > </feMorphology>
                {
                    type: 'feBlend',
                    attr: {
                        in: "SourceGraphic",
                        in2: "big",
                        mode: "normal",
                    },
                    children: [

                    ],
                },
                {
                    type: 'feColorMatrix',
                    attr: {
                        type: "matrix",
                        values: `0 0 0 0 ${rgb.r / 255}
            0 0 0 0 ${rgb.g / 255}
            0 0 0 0 ${rgb.b / 255}
            0 0 0 ${shadow.alpha || 1} 0`,
                        // radius: shadow.spread || 0,
                        // result: "big",
                    },
                },
                {
                    type: 'feBlend',
                    attr: {
                        in: "SourceGraphic",
                        // in2: "big",
                        mode: "normal",
                    },
                    children: [

                    ],
                },
                // <feBlend mode="normal" in="SourceGraphic" in2 = "effect1_dropShadow" result = "shape" />
            ],
        }
        return {
            id,
            json,
        }
    }

    const defs: any[] = [
        
    ]

    function fillAndStroke(attrs, _attr) {
        if (attrs.fill) {
            if (attrs.fill.type == 'linearGradient') {
                let ret = createLinearGradient(attrs.fill)
                defs.push(ret.json)
                _attr.fill = `url(#${ret.id})`
            }
        } else {
            if (attrs.color) {
                _attr.fill = attrs.color
            } else {
                _attr.fill = 'none'
            }
        }

        if (attrs.border) {
            _attr.stroke = attrs.border.color || '#000'
            _attr['stroke-width'] = attrs.border.width || 1
        }
    }

    function handleShadow(attrs, _attr, node) {
        if (attrs.shadow) {
            let ret = createShadow(attrs.shadow, node)
            defs.push(ret.json)
            _attr.filter = `url(#${ret.id})`
        } 
    }

    let out = uiUtil.treeMap(rootObj, {
        childrenKey: '_children',
        nodeHandler(node: StdUiRoot) {
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
            if (_type === 'root') {
                return {
                    type: 'svg',
                    attr: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        version: '1.1',
                        // "width": 200,
                        // "height": 200
                    },
                }
            }
            if (_type === 'rect') {
                let _attr = objectSomeAttr(attrs, ['width', 'height', 'x', 'y'])

                fillAndStroke(attrs, _attr)
                
                if (attrs.radius) {
                    _attr.rx = attrs.radius
                    _attr.ry = attrs.radius
                }

                handleShadow(attrs, _attr, node)
                
                let _node: any = {
                    type: 'rect',
                    attr: _attr,
                }
                return _node
            }
            if (_type === 'circle') {
                let _attr = objectSomeAttr(attrs, ['cx', 'cy'])

                fillAndStroke(attrs, _attr)

                handleShadow(attrs, _attr, node)

                if (attrs.radius) {
                    _attr.r = attrs.radius
                }
                let _node: any = {
                    type: 'circle',
                    attr: _attr,
                }
                return _node
            }
            if (_type === 'text') {
                let _attr = objectSomeAttr(attrs, ['x', 'y'])
                let style = ''
                if (attrs.textSize) {
                    style += `font-size: ${attrs.textSize}px`
                }

                fillAndStroke(attrs, _attr)
                handleShadow(attrs, _attr, node)

                _attr.style = style
                // _attr['dominant-baseline'] = 'text-before-edge'
                // refer https://www.zhihu.com/question/58620241
                _attr['alignment-baseline'] = 'hanging'
                // Attribute("alignment-baseline", "hanging");
                let _node: any = {
                    type: 'text',
                    attr: _attr,
                    _data: attrs.text
                    // _attrs: attrs,
                }
                    // < tspan xmlns = "http://www.w3.org/2000/svg" x = "100" y = "106" > 你好 < /tspan>
                return _node
            }
            if (_type === 'line') {
                let _attr = objectSomeAttr(attrs, ['x1', 'y1', 'x2', 'y2'])
                // if (attrs.radius) {
                //     _attr.r = attrs.radius
                // }
                // if (attrs.color) {
                //     _attr.fill = attrs.color
                // }
                // let style = ''
                // if (attrs.textSize) {
                //     style += `font-size: ${attrs.textSize}px`
                // }
                // _attr.style = style
                // _attr['stroke'] = '#000'
                // if (attrs.color) {
                //     _attr.stroke = attrs.color
                // } else {
                //     _attr.stroke = '#000'
                // }
                // _attr['stroke-width'] = 1
                const { border = {} } = attrs
                const { color = '#000', width = 1 } = border
                _attr.stroke = color
                _attr['stroke-width'] = width
                
                let node: any = {
                    type: 'line',
                    attr: _attr,
                    // _data: attrs.text
                    // _attrs: attrs,
                }
                // < tspan xmlns = "http://www.w3.org/2000/svg" x = "100" y = "106" > 你好 < /tspan>
                return node
            }
            if (_type === 'polygon') {
                let _attr = objectSomeAttr(attrs, [])

                fillAndStroke(attrs, _attr)
                handleShadow(attrs, _attr, node)

                if (attrs.points) {
                    _attr['points'] = attrs.points.map(pt => `${pt.x},${pt.y}`).join(' ')
                }
                let _node: any = {
                    type: 'polygon',
                    attr: _attr,
                    // _attrs: attrs,
                }
                return _node
            }
            if (_type === 'polyline') {
                let _attr = objectSomeAttr(attrs, [])
                // if (attrs.color) {
                //     _attr.fill = attrs.color
                // } else {
                //     _attr.fill = 'none'
                // }
                const { border = {} } = attrs
                const { color = '#000', width = 1 } = border
                _attr.stroke = color
                _attr['stroke-width'] = width
                
                // if (attrs.border) {
                // } else {
                    
                // }
                // if (attrs.color) {
                //     _attr.stroke = attrs.color
                // } else {
                //     _attr.stroke = '#000'
                // }
                _attr.fill = 'none'
                if (attrs.points) {
                    _attr['points'] = attrs.points.map(pt => `${pt.x},${pt.y}`).join(' ')
                }

                // if (attrs.radius) {
                //     _attr.rx = attrs.radius
                //     _attr.ry = attrs.radius
                // }
                let node: any = {
                    type: 'polyline',
                    attr: _attr,
                    // _attrs: attrs,
                }
                return node
            }
            if (_type === 'ellipse') {
                let _attr = objectSomeAttr(attrs, ['cx', 'cy', 'rx', 'ry'])

                fillAndStroke(attrs, _attr)
                handleShadow(attrs, _attr, node)

                let _node: any = {
                    type: 'ellipse',
                    attr: _attr,
                    // _attrs: attrs,
                }
                return _node
            }
            if (_type === 'path') {
                let _attr = objectSomeAttr(attrs, ['d'])

                fillAndStroke(attrs, _attr)
                handleShadow(attrs, _attr, node)

                if (attrs.points) {
                    _attr['points'] = attrs.points.map(pt => `${pt.x},${pt.y}`).join(' ')
                }
                let _node: any = {
                    type: 'path',
                    attr: _attr,
                }
                return _node
            }
            if (_type === 'group') {
                let _attr = objectSomeAttr(attrs, ['d'])
                
                let node: any = {
                    type: 'g',
                    attr: _attr,
                    // _attrs: attrs,
                }
                return node
            }
            if (attrs.border) {
                attrs.stroke = attrs.border.color
                attrs['stroke-width'] = attrs.border.width || 1
                // TODO
                delete attrs.border
            }
            let result = {
                type: node._type,
                // children: node._children as any,
                attr: attrs,
                // _attrs: attrs,
                // _type: type,
                // ...attrs,
            }
            return result
        }
    })

    function createLinearGradient(fill) {
        const { direction, colors = [] } = fill
            // colors: ['#09c', '#c90'],
        const [color1, color2] = colors

        const id = uid(8)
        let dradientAttrs = {
            right: {
                x1: "0%",
                y1: "0%",
                x2: "100%",
                y2: "0%",
            },
            left: {
                x1: "100%",
                y1: "0%",
                x2: "0%",
                y2: "0%",
            },
            top: {
                x1: "0%",
                y1: "100%",
                x2: "0%",
                y2: "0%",
            },
            bottom: {
                x1: "0%",
                y1: "0%",
                x2: "0%",
                y2: "100%",
            },
        }
        let dradientAttr = dradientAttrs[direction]
        // if (direction == 'right') {
        //     dradientAttr = 
        // }
        return {
            id,
            json: {
                type: 'linearGradient',
                attr: {
                    id,
                    ...dradientAttr,
                    // x1: "0%",
                    // y1: "0%",
                    // x2: "100%",
                    // y2: "0%",
                },
                children: [
                    {
                        type: 'stop',
                        attr: {
                            offset: "0%",
                            style: `stop-color:${color1};stop-opacity:1`,
                        },
                    },
                    {
                        type: 'stop',
                        attr: {
                            offset: "100%",
                            style: `stop-color:${color2};stop-opacity:1`,
                        },
                    },
                ],
            }
        }
    }

    // bg
    out.children = [
        {
            type: 'defs',
            attr: {
            },
            children: defs,
        },
        {
            type: 'rect',
            attr: {
                x: 0,
                y: 0,
                width: rootObj.width,
                height: rootObj.height,
                fill: rootObj.color || '#fff'
            },
        },
        {
            type: 'g',
            attr: {
            },
            children: out.children,
        },
    ]
    // out.children.unshift()
    // console.debug(out)
    return out
}

// console.log('json', JSON.stringify(uiObj, null, 4))
// console.log('xmlObj', JSON.stringify(convertUiObj2XmlObject(uiObj), null, 4))
// console.log('svgObj', JSON.stringify(convertUiObj2SvgObject(uiObj), null, 4))

// fs.writeFileSync('out.svg', uiUtil.svgObj2Xml(convertUiObj2SvgObject(uiObj)), 'utf8')

// console.log('json', {
//     a: '1',
//     a: '2',
// })

interface StdUiDoc {
    root: StdUiRoot
}

export class StdUI {

    root: StdUiRoot

    constructor(doc: StdUiDoc) {
        this.root = doc.root
    }

    toSvg(): string {
        // console.log('svgObj', JSON.stringify(convertUiObj2SvgObject(uiObj), null, 4))
    
        // fs.writeFileSync('out.svg', , 'utf8')
        return uiUtil.xmlObj2Xml(convertUiObj2SvgObject(this.root))
    }

    toProcessOn() {

        function createNode(node, otherAttr) {

            
            let fillStyle = {}
            if (node.color) {
                const color = Color(node.color)
                // console.log('color', )
                fillStyle = {
                    color: color.rgb().array().join(','),
                    "type": "solid"
                }
            }

            return {
                "parent": "",
                "link": "",
                "shapeStyle": {
                    "alpha": 1
                },
                "textBlock": [
                    {
                        "position": {
                            "w": "w-20",
                            "x": 10,
                            "h": "h",
                            "y": 0
                        },
                        "text": ""
                    }
                ],
                "lineStyle": {},
                "children": [],
                "resizeDir": [
                    "tl",
                    "tr",
                    "br",
                    "bl"
                ],
                fillStyle,
                "theme": {},
                "category": "basic",
                "locked": false,
                "group": "",
                ...otherAttr,
            }
        }
        function createRect(node) {
            return createNode(node, {
                "name": "rectangle",
                "anchors": [
                    {
                        "x": "w/2",
                        "y": "0"
                    },
                    {
                        "x": "w/2",
                        "y": "h"
                    },
                    {
                        "x": "0",
                        "y": "h/2"
                    },
                    {
                        "x": "w",
                        "y": "h/2"
                    }
                ],
                "title": "矩形",
                "props": {
                    "zindex": 1,
                    "w": node.width,
                    "x": node.x,
                    "h": node.height,
                    "y": node.y,
                    "angle": 0
                },
                "path": [
                    {
                        "actions": [
                            {
                                "x": "0",
                                "action": "move",
                                "y": "0"
                            },
                            {
                                "x": "w",
                                "action": "line",
                                "y": "0"
                            },
                            {
                                "x": "w",
                                "action": "line",
                                "y": "h"
                            },
                            {
                                "x": "0",
                                "action": "line",
                                "y": "h"
                            },
                            {
                                "action": "close"
                            }
                        ]
                    }
                ],
                "id": uid(13),
                "attribute": {
                    "container": false,
                    "rotatable": true,
                    "visible": true,
                    "collapsable": false,
                    "collapsed": false,
                    "linkable": true,
                    "markerOffset": 5
                },
            })
        }

        function createCircle(node) {

            return createNode(node, {
                "textBlock": [
                    {
                        "position": {
                            "w": "w-20",
                            "x": 10,
                            "h": "h",
                            "y": 0
                        },
                        "text": ""
                    }
                ],
                "anchors": [
                    {
                        "x": "w/2",
                        "y": "0"
                    },
                    {
                        "x": "w/2",
                        "y": "h"
                    },
                    {
                        "x": "0",
                        "y": "h/2"
                    },
                    {
                        "x": "w",
                        "y": "h/2"
                    }
                ],
                "title": "圆形",
                "fontStyle": {},
                "dataAttributes": [
                ],
                "props": {
                    "zindex": 1,
                    "x": node.cx - node.radius,
                    "y": node.cy - node.radius,
                    "w": node.radius * 2,
                    "h": node.radius * 2,
                    "angle": 0
                },
                "path": [
                    {
                        "actions": [
                            {
                                "x": "0",
                                "action": "move",
                                "y": "h/2"
                            },
                            {
                                "y1": "-h/6",
                                "x": "w",
                                "action": "curve",
                                "x1": "0",
                                "y2": "-h/6",
                                "y": "h/2",
                                "x2": "w"
                            },
                            {
                                "y1": "h+h/6",
                                "x": "0",
                                "action": "curve",
                                "x1": "w",
                                "y2": "h+h/6",
                                "y": "h/2",
                                "x2": "0"
                            },
                            {
                                "action": "close"
                            }
                        ]
                    }
                ],
                "lineStyle": {},
                "children": [],
                "resizeDir": [
                    "tl",
                    "tr",
                    "br",
                    "bl"
                ],
                "name": "round",
                "theme": {},
                "id": uid(13),
                "attribute": {
                    "container": false,
                    "rotatable": true,
                    "visible": true,
                    "collapsable": false,
                    "collapsed": false,
                    "linkable": true,
                    "markerOffset": 5
                },
                
            })
        }

        function createLine(node) {
            return {
                "linkerType": "normal",
                "lineStyle": {
                    "endArrowStyle": "none"
                },
                "name": "linker",
                "from": {
                    "x": node.x1,
                    "y": node.y1
                },
                "to": {
                    "x": node.x2,
                    "y": node.y2
                },
                "id": uid(14),
                "text": "",
                "locked": false,
                "props": {
                    "zindex": 1
                },
                "dataAttributes": [],
                "group": "",
                "points": []
            }
        }

        function createText(node) {
            let fontStyle: any = {
                size: node.textSize || 14
            }
            const color = Color(node.color)
            // console.log('color', )
            if (node.color) {
                fontStyle.color = color.rgb().array().join(',')
            }

            return createNode(node, {
                "name": "text",
                "parent": "",
                "link": "",
                "shapeStyle": {
                    "alpha": 1
                },

                "textBlock": [
                    {
                        "position": {
                            "w": "w",
                            "x": 0,
                            "h": "h",
                            "y": 0
                        },
                        "text": node.text
                    }
                ],
                "anchors": [
                    {
                        "x": "w/2",
                        "y": "0"
                    },
                    {
                        "x": "w/2",
                        "y": "h"
                    },
                    {
                        "x": "0",
                        "y": "h/2"
                    },
                    {
                        "x": "w",
                        "y": "h/2"
                    }
                ],
                "title": "文本",
                fontStyle,
                "props": {
                    "zindex": 1,
                    "x": node.x,
                    "w": (node.textSize || 14) * node.text.length,
                    "h": node.textSize || 14,
                    "y": node.y,
                    "angle": 0
                },
                "path": [
                    {
                        "lineStyle": {
                            "lineWidth": 0
                        },
                        "fillStyle": {
                            "type": "none"
                        },
                        "actions": [
                            {
                                "x": "0",
                                "action": "move",
                                "y": "0"
                            },
                            {
                                "x": "w",
                                "action": "line",
                                "y": "0"
                            },
                            {
                                "x": "w",
                                "action": "line",
                                "y": "h"
                            },
                            {
                                "x": "0",
                                "action": "line",
                                "y": "h"
                            },
                            {
                                "action": "close"
                            }
                        ]
                    }
                ],
                "lineStyle": {
                    "lineColor": "229,115,115"
                },
                "children": [],
                "resizeDir": [
                    "tl",
                    "tr",
                    "br",
                    "bl"
                ],
                
                "theme": {},
                "attribute": {
                    "container": false,
                    "rotatable": true,
                    "visible": true,
                    "collapsable": false,
                    "collapsed": false,
                    "linkable": true,
                    "markerOffset": 5
                },
                "category": "basic",
                "locked": false,
                "group": ""
            })
        }

        let elementMap = {}
        uiUtil.treeMap(this.root, {
            childrenKey: '_children',
            nodeHandler(node) {
                if (node._type == 'rect') {
                    let rect = createRect(node)
                    elementMap[rect.id] = rect
                    return rect
                }
                if (node._type == 'circle') {
                    let rect = createCircle(node)
                    elementMap[rect.id] = rect
                    return rect
                }
                if (node._type == 'line') {
                    let rect = createLine(node)
                    elementMap[rect.id] = rect
                    return rect
                }
                if (node._type == 'text') {
                    let rect = createText(node)
                    elementMap[rect.id] = rect
                    return rect
                }
                // if (node._type == 'text') {
                //     let rect = createText(node)
                //     elementMap[rect.id] = rect
                // }
                return {}
                // TODO 没有适配 root
                // throw new Error(`unknow type ${node._type}`)
            }
        })

        

        const obj = {

            "diagram": {
                "elements": {
                    "elements": elementMap,
                    "page": {
                        "padding": 0,
                        "backgroundColor": "transparent",
                        "orientation": "portrait",
                        "gridSize": 25,
                        "width": this.root.width,
                        "showGrid": true,
                        "lineJumps": false,
                        "height": this.root.height,
                    }
                }
            },
            "meta": {
                "diagramInfo": {
                    "title": "未命名文件",
                    "category": "flow"
                },
                "id": "6132cea2e0b34d35500338d3",
                "type": "ProcessOn Schema File",
                "version": "1.0"
            }
        }
        return JSON.stringify(obj, null, 4)
    }
}



