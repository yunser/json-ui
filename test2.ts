import { Graph } from './src/graph'
import * as fs from 'fs'

const root = {
    "_type": "graph",
    "version": "0.0.1",
    "width": 400,
    "height": 400,
    "_children": [
        {
            "_type": "rect",
            "x": 100,
            "y": 100,
            "width": 100,
            "height": 100,
            "color": "#f00",
            "_text": "开始"
        }
    ]
}

let graph = new Graph({
    root,
})


fs.writeFileSync('out/graph.json', graph.toJson(), 'utf8')
// fs.writeFileSync('out/doc.html', doc.toHtml(), 'utf8')
