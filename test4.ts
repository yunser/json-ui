import { Doc } from './src/doc'
import * as fs from 'fs'

const content = [
    {
        "_type": "h1",
        "_text": "一级标题"
    },
    {
        "_type": "h2",
        "_text": "二级标题"
    },
    {
        "_type": "p",
        "_text": "这是第一段"
    },
    {
        "_type": "p",
        "_text": "这是第二段"
    },
    {
        "_type": "h2",
        "_text": "二级标题"
    },
    {
        "_type": "p",
        "_text": "这是第三段"
    },
    {
        "_type": "image",
        "url": "https://icons.yunser.com/icons/app.png",
        // "width": 100,
        // "height": 100
    },
]
let doc = new Doc({
    content,
})

// const svg = stdUi.toSvg()
// console.log('svg', svg)
// fs.writeFileSync('out.svg', svg, 'utf8')



fs.writeFileSync('out/doc.md', doc.toMarkdown(), 'utf8')
fs.writeFileSync('out/doc.html', doc.toHtml(), 'utf8')
