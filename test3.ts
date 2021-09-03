import { StdUI } from './src'
import * as fs from 'fs'

const svg = StdUI.toSvg({
    root: {
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
            }
        ]
    }
})
console.log('svg', svg)
fs.writeFileSync('out.svg', svg, 'utf8')

