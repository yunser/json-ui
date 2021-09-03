import * as fs from 'fs'

const content = fs.readFileSync('mindmap.pos.json', 'utf8')
const jsonObj = JSON.parse(content)

console.log('jsonObj', jsonObj)

jsonObj.diagram.elements