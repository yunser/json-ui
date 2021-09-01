"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// import * as path from 'path'
// const htmlparser = require("htmlparser2")
// import * as htmlparser from 'htmlparser2'
// const { treeMap, treeFilter } = require('./util')
const xmlContent = fs.readFileSync('ui.xml', 'utf8');
const xml_1 = require("./utils/xml");
let out = (0, xml_1.XmlText2XmlObj)(xmlContent);
console.log('out', JSON.stringify(out, null, 4));
fs.writeFileSync('out.json', JSON.stringify(out, null, 4), 'utf8');
//# sourceMappingURL=xml2json.js.map