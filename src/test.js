// var parseString = require('xml2js').parseString;
var xml = `<root>Hello xml2js!<a a="a">aaa</a><item id="1"></item><item id="2"></item></root>`
// parseString(xml, function (err, result) {
//     console.log('result', JSON.stringify( result, null, 4));
// });


var parser = require('fast-xml-parser');
var jsonObj = parser.parse(xml );

console.log(JSON.stringify(jsonObj))