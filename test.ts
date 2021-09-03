import { MindMap } from './src/mindMap'
import * as fs from 'fs'

const mindMap = new MindMap({
    root: {
        "_text": "root",
        "_children": [
            {
                "_type": "node",
                "_text": "1",
                "_children": [
                    {
                        "_type": "node",
                        "_text": "11"
                    },
                    {
                        "_type": "node",
                        "_text": "12"
                    }
                ]
            },
            {
                "_type": "node",
                "_text": "2",
                "_children": [
                    {
                        "_type": "node",
                        "_text": "21"
                    }
                ]
            },
            {
                "_type": "node",
                "_text": "3"
            }
        ]
    }
})

console.log('midMap', mindMap.toFreeMind())