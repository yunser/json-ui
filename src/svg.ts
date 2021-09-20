const htmlparser2 = require("htmlparser2");
// import * as htmlparser from 'htmlparser2'
// const svgContent = fs.readFileSync('res/design.svg', 'utf8')
// console.log('svgContent', svgContent)
import { XmlText2XmlObj } from './utils/xml'
import { uid, uiUtil } from './helper'
import * as Color from 'color'


function breakPoint() {
    if (1 + 1 > 1) {
        throw new Error('asas')
    }
}

/**
 * Clamps an angle into given boundaries
 * @param {Number} angle
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
const clampAngle = (angle, min = 0, max = 360) => {
    if (angle < min) {
        return 360 + angle;
    }

    if (angle > max) {
        return angle - 360;
    }

    return angle;
};

// export default clampAngle;

/**
 * Formats a given position attribute
 * @param {String} pos - the position value
 * @returns {Number}
 */
const formatPosition = (pos) => Number(`${pos}`.trim().endsWith('%') ?
    pos.trim().replace('%', '') : pos);

// https://github.com/odedglas/linear-gradient-parser/blob/d99aeb6c6960f32905d05cd03cf1b3229cc094d6/src/utils/getGradientAngle/index.js#L19
/**
 * Returns a gradient angle by a given position properties
 * @param {String} x1 - The gradient x1 position
 * @param {String} x2 - The gradient x2 position
 * @param {String} y1 - The gradient y1 position
 * @param {String} y2 - The gradient y2 position
 * @returns {Number}
 */
const getGradientAngle = ({ x1, x2, y1, y2 }) => {

    [x1, x2, y1, y2] = [x1, x2, y1, y2].map(formatPosition);

    const x = x2 - x1;
    const y = y2 - y1;

    // Single axis
    if (y === 0) {
        return x1 > x2 ? 270 : 90;
    }

    if (x === 0) {
        return y1 > y2 ? 0 : 180;
    }

    // Converts angle in degrees
    const angleRad = Math.atan2(y, x);
    return clampAngle((angleRad * 180 / Math.PI) + 90);
};

export default getGradientAngle;


const allChildren: any[] = []

function handleStyle(style) {
    let map: any = {}
    const styles = (style || '').split(';').filter(item => item).map(item => {
        const _arr = item.split(':')
        return {
            key: _arr[0].trim(),
            value: _arr[1] ? _arr[1].trim() : '',
        }
    })
    console.log('styles', styles)
    for (let style of styles) {
        map[style.key] = style.value
        // if (style.key == 'font-size') {
        //     fontSize = parseFloat(style.value.replace('px', ''))
        // }
        // else if (style.key == 'font-family') {
        //     fontFamily = style.value
        //     // fontSize = parseFloat(style.value.replace('px', ''))
        // }
    }
    return map
}

export function parseSvg(content: string) {
    const xmlObj = XmlText2XmlObj(content)
    if (!xmlObj) {
        throw new Error('parse svg fail')
    }
    console.log('xmlObj', JSON.stringify(xmlObj, null, 4))

    // breakPoint()
    // if (1 + 1 > 1) {
    //     throw new Error('asas')
    // }

    const gradientMap = {}
    const shadowMap = {}

    function createShape(node, { onBaseAttrs }) {
        
        // if (hasStroke) {
        // } else {
        //     strokeWidth = node['stroke-width'] ? parseFloat(node['stroke-width']) : 0
        // }

        const styles = handleStyle(node.style)

        const fillValue = styles['fill'] || node['fill'] || ''
        const strokeValue = styles['stroke'] || node['stroke'] || ''
        const strokeWidthValue = styles['stroke-width'] || node['stroke-width'] || ''

        let hasStroke = !!strokeValue
        let strokeWidth = strokeWidthValue ? parseFloat(strokeWidthValue) : 1

        const rect: any = {
            
            // color,
            // "color": null,
            // "color": "#f00",
        }

        let color = null
        
        if (fillValue) {
            if (fillValue.includes('url')) {
                const { fill, shadow } = getGradientFromNode(node)
                rect.fill = fill
                // rect.shadow = shadow
                console.log('rect.fill', rect.fill)
                // endPoint()
            } else {
                rect.color = fillValue
            }
        }
        if (node['filter']) {
            const { fill, shadow } = getShadowFromNode(node)
            rect.shadow = shadow
            // rect.borderRadius = parseFloat(node['rx'])
        }
        if (node['rx']) {
            rect.borderRadius = parseFloat(node['rx'])
        }

        if (hasStroke) {
            rect.border = {
                color: strokeValue,
                width: strokeWidth,
            }

        }

        return {
            ...rect,
            ...onBaseAttrs({ strokeWidth })
        }
    }

    function getGradientFromNode(node) {
        const id = node.fill.match(/url\(#([\d\D]+)\)/)[1]
        console.log('ud', id)
        // if (1 + 1 > 1) {
        //     throw new Error('asas')
        // }
        let gradient = null
        if (gradientMap[id]) {
            gradient = gradientMap[id]
        }
        let shadow = null
        // if (shadowMap[id]) {
        //     shadow = shadowMap[id]
        // }
        // const gradient = 
        return {
            fill: gradient,
            shadow,
        }
    }

    function getShadowFromNode(node) {
        const id = node.filter.match(/url\(#([\d\D]+)\)/)[1]
        console.log('ud', id)
        // if (1 + 1 > 1) {
        //     throw new Error('asas')
        // }
        let gradient = null
        // if (gradientMap[id]) {
        //     gradient = gradientMap[id]
        // }
        let shadow = null
        if (shadowMap[id]) {
            shadow = shadowMap[id]
        }
        // const gradient = 
        return {
            fill: gradient,
            shadow,
        }
    }
    
    function myParseNumber(num) {
        let m = ('' + num).match(/[\d.]+/)
        return m ? parseFloat(m[0]) : 0
    }

    function handleLineargradient(node) {
        gradientMap[node.id] = {
            type: 'linearGradient',
            direction: getGradientAngle(node),
            stops: node.children.map(item => {
                const styles = handleStyle(item.style)
                // 'stop-color:#28EC84;stop-opacity:1"'
                // TODO stop-opacity
                return {
                    color: styles['stop-color'],
                    position: myParseNumber(item.offset) / 100,
                }
            })
        }
    }

    function handleShadowMap(node) {
        console.log('handleShadowMap', node)
        let shadow = {
            x: 0,
            y: 0,
            blur: 0,
            spread: 0,
            color: '#000',
            alpha: 0,
        }
        node.children.map(item => {
            if (item._type == 'feGaussianBlur') {
                shadow.blur = parseFloat(item.stdDeviation) * 2
            }
            else if (item._type == 'feOffset') {
                console.log('item?', item)
                // breakPoint()
                shadow.x = parseFloat(item.dx)
                shadow.y = parseFloat(item.dy)
            }
            else if (item._type == 'feMorphology') {
                console.log('item?', item)
                // breakPoint()
                shadow.spread = parseFloat(item.radius)
            }
            else if (item._type == 'feColorMatrix') {
                console.log('item?', item)
                // breakPoint()
                const values = item.values.split(/\s+/).map(item => parseFloat(item))
                console.log('values?', values)
                // breakPoint()
                const color = Color({
                    r: values[4] * 255,
                    g: values[9] * 255,
                    b: values[14] * 255,
                    // a: values[18]
                })
                shadow.color = color.hex()
                shadow.alpha = values[18]
            }
            
            
                
            // const styles = handleStyle(item.style)
            // // 'stop-color:#28EC84;stop-opacity:1"'
            // // TODO stop-opacity
            // return {
            //     color: styles['stop-color'],
            //     position: myParseNumber(item.offset) / 100,
            // }
        })
        shadowMap[node.id] = shadow
    }

    

    uiUtil.treeMap(xmlObj, {
        childrenKey: 'children',
        nodeHandler(node) {
            if (node._type == 'defs') {
                console.log('defs node', node)
                if (node.children && node.children.length) {
                    for (let child of node.children) {
                        if (child._type == 'linearGradient') {
                            handleLineargradient(child)
                        }
                        else if (child._type == 'filter') {
                            handleShadowMap(child)
                        }
                    }
                }
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
            }
            return {}
        }
    })

    console.log('gradientMap', JSON.stringify(gradientMap, null, 4))
    console.log('shadowMap', shadowMap)
    // breakPoint()

    let out = uiUtil.treeMap(xmlObj, {
        childrenKey: 'children',
        nodeHandler(node) {
            console.log('node', node)
            if (node._type == 'rect') {
                // if (node.width != '800') {
                // }
                allChildren.push(createShape(node, {
                    onBaseAttrs({ strokeWidth }) {
                        return {
                            "_type": "rect",
                            "x": parseFloat(node.x || 0) - strokeWidth / 2,
                            "y": parseFloat(node.y || 0) - strokeWidth / 2,
                            "width": parseFloat(node.width || 0) + strokeWidth,
                            "height": parseFloat(node.height || 0) + strokeWidth,
                        }
                    }
                }))
            }
            if (node._type == 'ellipse') {
                allChildren.push(createShape(node, {
                    onBaseAttrs({ strokeWidth }) {
                        const rx = parseFloat(node.rx)
                        const ry = parseFloat(node.ry)
                        
                        return {
                            "_type": "ellipse",
                            "cx": parseFloat(node.cx),
                            "cy": parseFloat(node.cy),
                            "rx": rx + strokeWidth / 2,
                            "ry": ry + strokeWidth / 2,
                        }
                    }
                }))
            }
            else if (node._type == 'image') {
                const text: any = {
                    "_type": "image",
                    "x": parseFloat(node.x),
                    "y": parseFloat(node.y),
                    "width": parseFloat(node.width),
                    "height": parseFloat(node.height),
                    href: node.href,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                }
                console.log('textNode', node)
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(text)
            }
            else if (node._type == 'polygon') {
                allChildren.push(createShape(node, {
                    onBaseAttrs({ strokeWidth }) {
                        const nums = node.points.split(/[\s,]+/).map(item => parseFloat(item))
                        const points: any[] = []
                        for (let idx = 0; idx < nums.length; idx += 2) {
                            points.push({
                                x: nums[idx],
                                y: nums[idx + 1],
                            })
                        }
                        // const rx = parseFloat(node.rx)
                        // const ry = parseFloat(node.ry)

                        return {
                            "_type": "polygon",
                            points,
                        }
                    }
                }))
            }
            else if (node._type == 'polyline') {
                allChildren.push(createShape(node, {
                    onBaseAttrs({ strokeWidth }) {
                        const nums = node.points.split(/[\s,]+/).map(item => parseFloat(item))
                        const points: any[] = []
                        for (let idx = 0; idx < nums.length; idx += 2) {
                            points.push({
                                x: nums[idx],
                                y: nums[idx + 1],
                            })
                        }
                        // const rx = parseFloat(node.rx)
                        // const ry = parseFloat(node.ry)

                        return {
                            "_type": "polyline",
                            points,
                        }
                    }
                }))
            }
            else if (node._type == 'line') {
                allChildren.push(createShape(node, {
                    onBaseAttrs({ strokeWidth }) {
                        return {
                            "_type": "line",
                            x1: parseFloat(node.x1),
                            x2: parseFloat(node.x2),
                            y1: parseFloat(node.y1),
                            y2: parseFloat(node.y2),
                        }
                    }
                }))
            }
            else if (node._type == 'circle') {
                let hasStroke = !!node['stroke']
                let strokeWidth = node['stroke-width'] ? parseFloat(node['stroke-width']) : 1

                const circle: any = {
                    "_type": "circle",
                    "cx": parseFloat(node.cx),
                    "cy": parseFloat(node.cy),
                    "radius": parseFloat(node.r),
                    // "height": parseFloat(node.height),
                    // href: node.href,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                }
                console.log('textNode', node)
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                if (node['fill']) {
                    circle.color = node['fill']
                }
                if (hasStroke) {
                    circle.border = {
                        color: node['stroke'],
                        width: strokeWidth,
                    }

                }
                allChildren.push(circle)
            }
            else if (node._type == 'text') {
                const text: any = {
                    "_type": "text",
                    "x": parseFloat(node.x),
                    "y": parseFloat(node.y),
                    // "width": parseFloat(node.width),
                    // "height": parseFloat(node.height),
                    // href: node.href,
                    text: node.children[0]._dataText,
                    // text: node._dataText,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                }
                let color = null
                if (node['fill']) {
                    text.color = node['fill']
                }

                let fontSize = 14
                let fontFamily = undefined

                const styles = (node.style || '').split(';').filter(item => item).map(item => {
                    const _arr = item.split(':')
                    return {
                        key: _arr[0].trim(),
                        value: _arr[1] ? _arr[1].trim() : '',
                    }
                })
                console.log('styles', styles)
                for (let style of styles) {
                    if (style.key == 'font-size') {
                        fontSize = parseFloat(style.value.replace('px', ''))
                    }
                    else if (style.key == 'font-family') {
                        fontFamily = style.value
                        // fontSize = parseFloat(style.value.replace('px', ''))
                    }
                }
                console.log('node', node)
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }

                text.textSize = fontSize
                text.fontFamily = fontFamily
                console.log('textNode', node)
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(text)
            }
            else if (node._type == 'path') {
                let hasStroke = !!node['stroke']
                let strokeWidth = node['stroke-width'] ? parseFloat(node['stroke-width']) : 1

                const path: any = {
                    "_type": "path",
                    // "x": parseFloat(node.x),
                    // "y": parseFloat(node.y),
                    // "width": parseFloat(node.width),
                    // "height": parseFloat(node.height),
                    // href: node.href,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                    d: node.d,
                }
                console.log('textNode', node)

                if (node['fill']) {
                    path.color = node['fill']
                }

                if (hasStroke) {
                    path.border = {
                        color: node['stroke'],
                        width: strokeWidth,
                    }

                }
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(path)
            }
            else if (node._type == 'text') {
                const text: any = {
                    "_type": "rect",
                    "x": parseFloat(node.x),
                    "y": parseFloat(node.y),
                    // "width": parseFloat(node.width) + strokeWidth,
                    // "height": parseFloat(node.height) + strokeWidth,
                    // color,
                    // "color": null,
                    // "color": "#f00",
                }
                console.log('textNode', node)
                // if (1 + 1 > 1) {
                //     throw new Error('asas')
                // }
                allChildren.push(text)
            }
            return {}
        }
    })

    const root = {
        "_type": "root",
        "width": (xmlObj as any).width ? parseFloat((xmlObj as any).width) : 300,
        "height": (xmlObj as any).height ? parseFloat((xmlObj as any).height) : 300,
        "color": null,
        // "color": null,
        "_children": allChildren,
    }

    return root
}

// export function add(num1: number, num2: number) {
//     return num1 + num2
// }
