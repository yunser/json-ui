import { StdUI } from './src/index'
import * as fs from 'fs'

let root = {
    "_type": "root",
    "width": 500,
    "height": 400,
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
                width: 4,
            }
        },
        {
            "_type": "circle",
            "cx": 250,
            "cy": 150,
            "radius": 50,
            // "color": "#09c",
            "color": null,
            fill: {
                type: 'linearGradient',
                direction: 'bottom',
                colors: ['#09c', '#c90'],
            },
            border: {
                color: '#526BFF',
                width: 4,
            }
        },
        {
            "_type": "line",
            "x1": 100,
            "y1": 200,
            "x2": 200,
            "y2": 300,
            // color: '#f00',
            border: {
                color: '#526BFF',
                width: 4,
            },
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
                width: 4,
            },
            fill: {
                type: 'linearGradient',
                direction: 'bottom',
                colors: ['#09c', '#c90'],
            },
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
                width: 4,
            },
            fill: {
                type: 'linearGradient',
                direction: 'bottom',
                colors: ['#09c', '#c90'],
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
            border: {
                color: '#526BFF',
                width: 4,
            },
        },
        {
            "_type": "group",
            _children: [
                {
                    "_type": "ellipse",
                    cx: 50,
                    cy: 250,
                    rx: 50,
                    ry: 25,
                    color: '#E56D6D',
                    border: {
                        color: '#526BFF',
                        width: 4,
                    },
                    fill: {
                        type: 'linearGradient',
                        direction: 'bottom',
                        colors: ['#09c', '#c90'],
                    },
                    opacity: 0.5,
                    shadow: {
                        x: 5,
                        y: 5,
                        blur: 10,
                        alpha: 0.2,
                    },
                },
                {
                    "_type": "path",
                    d: 'M200,200.490196 L199.509804,300 C212.323108,269.060446 229.153174,253.590669 250,253.590669 C270.846826,253.590669 287.513493,268.897047 300,299.509804 L300,200 L200,200.490196 Z',
                    color: '#E56D6D',
                    border: {
                        color: '#526BFF',
                        width: 4,
                    },
                    fill: {
                        type: 'linearGradient',
                        direction: 'bottom',
                        colors: ['#09c', '#c90'],
                    },
                },
            ],
        },
        {
            _type: 'image',
            x: 300,
            y: 0,
            width: 100,
            height: 100,
            href: "data:image/png;base64,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",
        },
        {
            "_type": "rect",
            "x": 300,
            "y": 100,
            "width": 100,
            "height": 100,
            // "color": null,
            "color": "#09c",
            // border: {
            //     color: '#526BFF',
            //     width: 4,
            // }
            fill: {
                type: 'linearGradient',
                direction: 'bottom',
                colors: ['#09c', '#c90'],
            },
        },
        {
            "_type": "rect",
            "x": 300,
            "y": 200,
            "width": 100,
            "height": 100,
            // "color": null,
            "color": "#f00",
            shadow: {
                x: 5,
                y: 5,
                blur: 10,
                // spread: 10,
                // color: '#09c',
                alpha: 0.2,
            },
            opacity: 0.5,
            // border: {
            //     color: '#526BFF',
            //     width: 4,
            // }
            // fill: {
            //     type: 'linearGradient',
            //     direction: 'bottom',
            //     colors: ['#09c', '#c90'],
            // },
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
fs.writeFileSync('/Users/yunser/app/sketch-test/root.json5', JSON.stringify(root, null, 4), 'utf8')
