console.log('svg.js')
import * as fs from 'fs'
// const htmlparser2 = require("htmlparser2");
import { parseSvg } from '../src/svg'
import { StdUI } from '../src/index'

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
</svg>
`
// const svgContent = fs.readFileSync('res/design.svg', 'utf8')
console.log('svgContent', svgContent)

const root = parseSvg(svgContent)

let stdUi = new StdUI({
    root,
})

// const svg = 
console.log('stdUi', JSON.stringify(stdUi, null, 4))

fs.writeFileSync('out/ui.svg', stdUi.toSvg({
    forceImage: true,
}), 'utf8')

// fs.writeFileSync('out/ui.svg', )