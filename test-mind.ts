import { MindMap } from './src/mindMap'
import * as fs from 'fs'

const root = {
    "_type": "node",
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

// const mindMap = new MindMap()
// const kmData = fs.readFileSync('res/root.km', 'utf8')
// mindMap.fromKityMinder(kmData)

const mindMap = new MindMap({
    root,
})


// 转成 Std Mind Map 格式
const stdMindMapContent = mindMap.toStdMindMapObject()
console.log('stdMindMapContent', stdMindMapContent)
fs.writeFileSync('out.json.stdmm', JSON.stringify(stdMindMapContent, null, 4), 'utf8')

// 转成百度脑图格式
const kmContent = mindMap.toKityMinder()
console.log('content', kmContent)
fs.writeFileSync('out.km', kmContent, 'utf8')

// 转成 FreeMind 格式
const mmContent = mindMap.toFreeMind()
console.log('content', mmContent)
fs.writeFileSync('out.mm', mmContent, 'utf8')

// 转成 ProcessOn 格式
const posContent = mindMap.toProcessOn()
console.log('content', posContent)
fs.writeFileSync('out.pos', posContent, 'utf8')