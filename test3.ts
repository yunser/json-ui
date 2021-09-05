import { StdUI } from './src/index'
import * as fs from 'fs'

let root = {
    "_type": "root",
    "width": 300,
    "height": 300,
    "color": "#E6E6FB",
    "_children": [
        {
            "_type": "rect",
            "x": 100,
            "y": 100,
            "width": 100,
            "height": 100,
            "color": null,
            // "color": "#f00",
            border: {
                color: '#526BFF',
                width: 2,
            }
        },
        {
            "_type": "circle",
            "cx": 250,
            "cy": 150,
            "radius": 50,
            // "color": "#09c",
            "color": null,
            border: {
                color: '#526BFF',
                width: 2,
            }
        },
        {
            "_type": "line",
            "x1": 100,
            "y1": 200,
            "x2": 200,
            "y2": 300,
            color: '#f00',
        },
        {
            "_type": "text",
            "x": 100,
            "y": 0,
            "text": "你好",
            "textSize": 100,
            // color: '#f00',
            "color": null,
            border: {
                color: '#526BFF',
                width: 2,
            }
        },
        {
            "_type": "polygon",
            points: [
                {
                    x: 50,
                    y: 100,
                },
                {
                    x: 0,
                    y: 200,
                },
                {
                    x: 100,
                    y: 200,
                },
            ],
            color: '#E56D6D',
            border: {
                color: '#526BFF',
                width: 2,
            },
        },
        {
            _type: 'polyline',
            points: [
                {
                    x: 0,
                    y: 100,
                },
                {
                    x: 50,
                    y: 0,
                },
                {
                    x: 100,
                    y: 100,
                },
            ],
            color: '#526BFF',
        },
        {
            "_type": "ellipse",
            cx: 50,
            cy: 250,
            rx: 50,
            ry: 25,
            color: '#E56D6D',
            border: {
                color: '#526BFF',
                width: 2,
            },
        },
    ]
}
let stdUi = new StdUI({
    root,
})

// const svg = 
// console.log('svg', svg)

fs.writeFileSync('out/ui.svg', stdUi.toSvg(), 'utf8')
// fs.writeFileSync('out/ui.pos', stdUi.toProcessOn(), 'utf8')

// for sketch project
// fs.writeFileSync('/Users/yunser/app/sketch-test/root.json', JSON.stringify(root, null, 4), 'utf8')
