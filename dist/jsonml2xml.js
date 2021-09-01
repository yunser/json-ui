"use strict";
// type JmNode = [ string, object, JmNode | JmNode[] ] | string
const uiUtil = require('./util');
const fs = require('fs');
console.log('uiUtil', uiUtil);
function isObjHasAttr(obj) {
    let count = 0;
    for (let _key in obj) {
        count++;
    }
    return count > 0;
}
const jsonml = ['html', [
        ['head', [
                ['meta', { charset: 'utf-8' }],
                ['title', '这是标题'],
                ['link', { rel: 'stylesheet', href: './home.css' }],
            ]],
        ['body', { class: 'body' }, [
                ['script', { src: './home.js' }]
            ]],
    ]];
let j = ['as', {}, []];
// console.log('jsonml', JSON.stringify(jsonml, null, 4))
// type: 'svg',
//     attr: {
//         xmlns: 'http://www.w3.org/2000/svg',
//         version: "1.1", 
//         width: "400" ,
//         height: "200",
//     },
//     children:
function handleItem(jsonml) {
    let _children = [];
    let _attr = {};
    if (Array.isArray(jsonml[1])) {
        _children = jsonml[1];
    }
    else if (typeof jsonml[1] === 'object') {
        _attr = jsonml[1];
    }
    let result = {
        type: jsonml[0],
    };
    if (Array.isArray(jsonml[2])) {
        _children = jsonml[2];
    }
    if (_children.length) {
        result.children = _children.map(item => handleItem(item));
    }
    if (isObjHasAttr(_attr)) {
        result.attr = _attr;
    }
    return result;
}
const xmlObject = handleItem(jsonml);
console.log('xmlObject', xmlObject);
console.log('xml', uiUtil.svgObj2Xml(xmlObject));
// console.log('out.htm')
fs.writeFileSync('out.html', uiUtil.svgObj2Xml(xmlObject), 'utf8');
//# sourceMappingURL=jsonml2xml.js.map