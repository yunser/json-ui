// const PdfPrinter = require('pdfmake')
import PdfPrinter from 'pdfmake'
// const pdfDocGenerator = pdfMake.createPdf({ content: 'test' });
// pdfDocGenerator.getBuffer((buffer) => {
//     // ...
// });

// const { pdfMakePrinter } = require('pdfmake/printer');

// console.log('pdfMakePrinter', pdfMakePrinter)
console.log('PdfPrinter', PdfPrinter)

var docDefinition = {
    content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ],
    maxPagesNumber: 10,
};

var now = new Date();

// createPdfKitDocument

let printer = new PdfPrinter({})

var pdf = printer.createPdfKitDocument(docDefinition, {});
pdf.write('out/test.pdf').then(() => {
    console.log('ok')
    // console.log(new Date() - now);
}, err => {
    console.error(err);
});