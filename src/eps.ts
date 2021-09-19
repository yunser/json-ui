import { uid, uiUtil } from './helper'
import { StdUiRoot } from './index'
import * as Color from 'color'

var parse = require('parse-svg-path')

const left_top_y = 700

class Builder {
    cmds: string[] = []

    comment(text: string) {
        this.cmds.push(`% ${text}`)
        return this
    }

    newPath() {
        this.cmds.push('newpath')
        return this
    }

    closePath() {
        this.cmds.push('closepath')
        return this
    }

    moveTo(x: number, y: number) {
        this.cmds.push(`${x} ${left_top_y - y} moveto`)
        return this
    }

    translate(x: number, y: number) {
        this.cmds.push(`${x} ${left_top_y - y} translate`)
        return this
    }

    

    lineTo(x: number, y: number) {
        this.cmds.push(`${x} ${left_top_y - y} lineto`)
        return this
    }

    curveTo(x1, y1, x2, y2, endX, endY) {
        this.cmds.push(`${x1} ${left_top_y - y1} ${x2} ${left_top_y - y2} ${endX} ${left_top_y - endY} curveto`)
    }

    end() {
        return this.cmds.join('\n')
    }

    rect(x, y, width, height) {
        this.comment('rect')
            .newPath()
            .moveTo(x, y)
            .lineTo(x + width, y)
            .lineTo(x + width, y + height)
            .lineTo(x, y + height)
            .closePath()
        // .end()
        return this
    }

    fill() {
        this.cmds.push('fill')
        return this
    }

    stroke() {
        this.cmds.push('stroke')
        return this
    }

    addCommand(text) {
        this.cmds.push(text)
        return this
    }

    _push(text) {
        this.cmds.push(text)
        return this
    }

    scale(x, y) {
        return `${x} ${y} scale`
    }

    circle(x, y, radius) {
        this.comment('circle')
            .newPath()
            ._push(`${x} ${left_top_y - y}`)
            ._push(`${radius}`)
            ._push(`0 360 arc`)
            .closePath()
        // .end()
        return this
    }

    line(x1, y1, x2, y2) {
        this.comment('line')
            .newPath()
            .moveTo(x1, y1)
            .lineTo(x2, y2)
            .closePath()
        return this
    }

    setFillColor(_color) {
        const color = Color(_color)
        const rgb = color.object()
        console.log('rgb', rgb)
        this._push(`${rgb.r / 255} ${rgb.g / 255} ${rgb.b / 255} setrgbcolor`)
        return this
    }

    setStrokeColor(color) {
        return this.setFillColor(color)
    }
}

function pt2px(num: number = 0) {
    return num * 0.5
}

export function toEps(root: StdUiRoot) {

    // const allChildren: string[] = []

    const builder = new Builder()

    builder.rect(0, 0, root.width, root.height)
        ._push(`1 0 0 setrgbcolor`)
        .setFillColor(root.color || '#fff')
        .fill()

    function handleCommon(node) {
        if (node.opacity) {
            // builder._push(`${node.opacity} setgray`)
        }
    }

    function handleFill(node, drawPath) {
        if (node.color != null) {
        // if (node.color != undefined) { TODO
            drawPath && drawPath()
            builder
                .setFillColor(node.color || '#000')
                .fill()
        }
    }

    function handleStroke(node, drawPath) {
        if (node.border) {
            drawPath && drawPath()
            const { width = 1, color = '#000' } = node.border
            builder._push(`${width} setlinewidth`)
                .setStrokeColor(color)
                .stroke()
        }
    }

    uiUtil.treeMap(root, {
        childrenKey: '_children',
        nodeHandler(node) {
            if (node._type === 'root') {
                
                // allChildren.push()
            }

            if (node._type === 'rect') {
                if (node.id) {
                    builder.comment(`id: ${node.id}`)
                }
                const drawPath = () => builder.rect(node.x, node.y, node.width, node.height)
                
                handleCommon(node)
                handleFill(node, drawPath)
                handleStroke(node, drawPath)
            }
            if (node._type === 'image') {
                builder.rect(node.x, node.y, node.width, node.height)
                    // ._push(`0 0 0 setrgbcolor`)
                    .fill()
                // allChildren.push()
            }
            if (node._type === 'circle') {
                const drawPath = () => builder.circle(node.cx, node.cy, node.radius)
                
                handleFill(node, drawPath)
                handleStroke(node, drawPath)
            }
            if (node._type === 'ellipse') {
                // builder.circle(node.cx, node.cy, node.radius)
                //     ._push(`0 0 0 setrgbcolor`)
                //     .fill()
                // builder.rect(node.x, node.y, node.width, node.height)
                //     .fill()
                // allChildren.push()
                function EvenCompEllipse(x, y, a, b) {
                    builder.comment('ellipse')
                    builder._push(`gsave`)
                    //选择a、b中的较大者作为arc方法的半径参数
                    var r = (a > b) ? a : b;
                    var ratioX = a / r; //横轴缩放比率
                    var ratioY = b / r; //纵轴缩放比率
                    // context.scale(ratioX, ratioY); //进行缩放（均匀压缩）
                    builder.scale(ratioX, ratioY)
                    console.log('ratioX, ratioY', ratioX, ratioY)
                    builder.newPath()
                    //从椭圆的左端点开始逆时针绘制
                    builder.translate((x + a) / ratioX, y / ratioY);

                    builder.circle(x / ratioX, y / ratioY, r)
                    builder.closePath()
                    builder.stroke()
                    builder.fill()
                    

                };
                // EvenCompEllipse(node.cx, node.cy, node.rx, node.cy)
                // handleFill(node)
                // builder._push(`grestore`)
            }

            if (node._type === 'line') {
                
                    // ._push(`2 setlinewidth`)
                    // ._push(`0 0 1 setrgbcolor`)
                    // .stroke()
                const drawPath = () => builder.line(node.x1, node.y1, node.x2, node.y2)
                handleStroke(node, drawPath)
                // builder.rect(node.x, node.y, node.width, node.height)
                //     .fill()
                // allChildren.push()
            }
            if (node._type === 'polyline') {
                const drawPath = () => {
                    builder.newPath()
                    node.points.forEach((pt, idx) => {
                        if (idx == 0) {
                            builder.moveTo(pt.x, pt.y)
                        } else {
                            builder.lineTo(pt.x, pt.y)
                        }
                    })
                }
                // builder
                    // .line(node.x1, node.y1, node.x2, node.y2)
                    // ._push(`2 setlinewidth`)
                    // ._push(`0 0 1 setrgbcolor`)
                    // .stroke()
                
                handleStroke(node, drawPath)
                    
                // builder.rect(node.x, node.y, node.width, node.height)
                //     .fill()
                // allChildren.push()
            }
            if (node._type === 'polygon') {
                const drawPath = () => {
                    builder.newPath()

                    node.points.forEach((pt, idx) => {
                        if (idx == 0) {
                            builder.moveTo(pt.x, pt.y)
                        } else {
                            builder.lineTo(pt.x, pt.y)
                        }
                    })

                    builder.closePath()
                }
                handleFill(node, drawPath)
                handleStroke(node, drawPath)
            }
            if (node._type === 'text') {
                builder
                    ._push(`/Times-Roman findfont 30 scalefont setfont`)
                    ._push(`${node.x} ${left_top_y - node.y} moveto (${node.text || ''}) show`)
            }
            if (node._type === 'path') {
                const segments = parse(node.d)
                console.log('segments', segments)

                const drawPath = () => {

                    let _segments = segments.map(item => {
                        return {
                            type: item[0],
                            data: item.slice(1)
                        }
                    })
                    console.log('_segments', _segments)
                    builder.newPath()
                    let aaa
                    let bbb
    
                    _segments.forEach((segment, idx) => {
                        // if (idx > 2) {
                        //     return
                        // }
                        // if (segment.type == 'M') {
    
                        // }
                        const { type, data } = segment
                        
                        switch (type) {
                            case 'M':
                                builder.moveTo(data[0], data[1])
                                break
                            case 'L':
                                builder.lineTo(data[0], data[1])
                                aaa = data[0]
                                bbb = data[1]
                                break
                            case 'C':
                                builder.curveTo(data[0], data[1], data[2], data[3], data[4], data[5])
                                break
                            case 'Z':
                                builder.closePath()
                                break
                        }
                        // if (idx == 0) {
                        //     builder.moveTo(pt.x, pt.y)
                        // } else {
                        //     builder.lineTo(pt.x, pt.y)
                        // }
                    })
                }

                // builder.fill()
                handleFill(node, drawPath)
                handleStroke(node, drawPath)
                // builder
                //     ._push(`/Times-Roman findfont 30 scalefont setfont`)
                //     ._push(`${node.x} ${left_top_y - node.y} moveto (${node.text || ''}) show`)
            }

            return {} // TODO 不能去掉
        }
    })

    // << /PageSize [${pt2px(root.width)} ${pt2px(root.height)}] >> setpagedevice
    const content = `%!PS-Adobe-3.0
/inch{72 mul} def
4.25 inch 5.5 inch
1.5 inch




${builder.end()}






showpage`

//     PostScript采用的坐标系以左下角为原点，水平向右为x轴正方向，水平向左为y轴正方向。
//     pt是PostScript里的基本长度单位，1英寸为72pt，相当于屏幕的96个像素。因此，可以认为3个pt和4个像素大小相当。
//     PostScript通常情况下默认的页面大小是A4大小。


    // .5 setgray 设置透明度

    return content
}