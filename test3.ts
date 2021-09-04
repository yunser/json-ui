import { StdUI } from './src/index'
import * as fs from 'fs'

let root = {
    "_type": "root",
    "width": 300,
    "height": 300,
    "color": "#000",
    "_children": [
        {
            "_type": "rect",
            "x": 100,
            "y": 100,
            "width": 100,
            "height": 100,
            "color": "#f00"
        },
        {
            "_type": "circle",
            "cx": 250,
            "cy": 150,
            "radius": 50,
            "color": "#09c"
        },
        {
            "_type": "line",
            "x1": 0,
            "y1": 0,
            "x2": 100,
            "y2": 100
        },
        {
            "_type": "text",
            "x": 100,
            "y": 0,
            "text": "你好",
            "textSize": 100,
            color: '#f90',
        }
    ]
}
let stdUi = new StdUI({
    root,
})

const svg = stdUi.toSvg()
console.log('svg', svg)
fs.writeFileSync('out.svg', svg, 'utf8')


fs.writeFileSync('out.pos', stdUi.toProcessOn(), 'utf8')
