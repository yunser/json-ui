import * as fs from 'fs'
// import * as path from 'path'
// const { treeMap, treeFilter } = require('./util')

const xmlContent = fs.readFileSync('ui.xml', 'utf8')
import { XmlText2XmlObj } from './utils/xml'


let out = XmlText2XmlObj(xmlContent)

console.log('out', JSON.stringify(out, null, 4))

fs.writeFileSync('out.json', JSON.stringify(out, null, 4), 'utf8')
