const PdfPrinter = require('pdfmake')
// import PdfPrinter from 'pdfmake'
// const pdfDocGenerator = pdfMake.createPdf({ content: 'test' });
// pdfDocGenerator.getBuffer((buffer) => {
//     // ...
// });
const path = require('path')
const fs = require('fs')
// const { pdfMakePrinter } = require('pdfmake/printer');

// console.log('pdfMakePrinter', pdfMakePrinter)
console.log('PdfPrinter', PdfPrinter)

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect x="0" y="0" width="300" height="300" fill="#E6E6FB"></rect>
    <g>
        <rect width="100" height="100" x="100" y="100" fill="none" stroke="#526BFF" stroke-width="2"></rect>
        <circle cx="250" cy="150" r="50" fill="none" stroke="#526BFF" stroke-width="2"></circle>
        <line x1="100" y1="200" x2="200" y2="300" stroke="#f00" stroke-width="1"></line>
        <text x="100" y="0" fill="none" stroke="#526BFF" stroke-width="2" style="font-size: 100px" alignment-baseline="hanging">你好</text>
        <polygon fill="#E56D6D" stroke="#526BFF" stroke-width="2" points="50,100 0,200 100,200"></polygon>
        <polyline stroke="#526BFF" fill="none" points="0,100 50,0 100,100"></polyline>
        <g>
            <ellipse cx="50" cy="250" rx="50" ry="25" fill="#E56D6D" stroke="#526BFF" stroke-width="2"></ellipse>
            <path d="M200,200.490196 L199.509804,300 C212.323108,269.060446 229.153174,253.590669 250,253.590669 C270.846826,253.590669 287.513493,268.897047 300,299.509804 L300,200 L200,200.490196 Z" fill="#E56D6D" stroke="#526BFF" stroke-width="2"></path>
</g>
</g>
</svg>`

var docDefinition = {
    content: [
        {
            // if you specify both width and height - svg will be stretched
            svg,
            width: 300,
            height: 300,
        },
        // margin: [left, top, right, bottom]
        { text: 'First paragraph', margin: [0, 0, 0, 16] },
        // 'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ],
    maxPagesNumber: 10,
};

var now = new Date();

// createPdfKitDocument
const printer = new PdfPrinter({
    Roboto: {
        normal: path.join(__dirname, './fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, './fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, './fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, './fonts/Roboto-MediumItalic.ttf')
    }
})

var doc = printer.createPdfKitDocument(docDefinition);

var chunks = [];
var result;

doc.on('data', function (chunk) {
    // console.log('on data')
    chunks.push(chunk);
});
doc.on('end', function () {
    console.log('on end')
    result = Buffer.concat(chunks);
    // callback('data:application/pdf;base64,' + result.toString('base64'));
    // fsyncSync.
    fs.writeFileSync('out.pdf', result)
});
doc.end();

// pdf.write('out/test.pdf').then(() => {
//     console.log(new Date() - now);
// }, err => {
//     console.error(err);
// });