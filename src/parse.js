var htmlparser = require("htmlparser2");
const htmlString = `<svg xmlns="http://www.w3.org/2000/svg" 
version="1.1" width="400" height="200" style="background-color: #09c">
  <rect x="0" y="0" width="400" height="200" fill="none" stroke="#000" stroke-width="1"></rect>
  <rect x="0" y="0" width="100" height="100" fill="#000" stroke="none"></rect>
  <rect x="100" y="100" width="100" height="100" fill="#09c" stroke="none"></rect>
  <circle cx="150" cy="50" r="50" stroke="none" stroke-width="2" fill="#f00"></circle>    
</svg>`

function convertTree(treeObj, options) {

    const { indent = '    ' } = options

    function dealList(children, level) {
        let content = ''
        for (let child of children) {
            content += (indent ? ('\n' + textLoop(indent, level)) : '') + dealObj(child, level)
        }
        content += (indent ? (textLoop(indent, level) + '\n') : '')
        return content
    }

    function dealObj(obj, level = 0) {
        let children = []
        if (obj.children && obj.children.length) {
            children = dealList(obj.children, level + 1)
        }

        let attrContent = ''
        if (obj.attr) {
            for (let key in obj.attr) {
                attrContent += ` ${key}="${obj.attr[key]}"`
            }
        }

        return `<${obj.type}${attrContent}>${childrenContent}</${obj.type}>`
    }

    return dealObj(treeObj, 0)
}

let elements = htmlparser.parseDocument(htmlString);


// type: 'root',
// parent: null,
// prev: null,
// next: null,
// startIndex: null,
// endIndex: null,
// children: [

    // type: 'tag',
    // name: 'svg',
    //   attribs: [Object]


// console.log(JSON.stringify(elements))

// const htmlparser2 = require("htmlparser2");
// const parser = new htmlparser2.Parser({
//     onopentag(name, attributes) {
//         /*
//          * This fires when a new tag is opened.
//          *
//          * If you don't need an aggregated `attributes` object,
//          * have a look at the `onopentagname` and `onattribute` events.
//          */
//         if (name === "script" && attributes.type === "text/javascript") {
//             console.log("JS! Hooray!");
//         }
//     },
//     ontext(text) {
//         /*
//          * Fires whenever a section of text was processed.
//          *
//          * Note that this can fire at any point within text and you might
//          * have to stich together multiple pieces.
//          */
//         console.log("-->", text);
//     },
//     onclosetag(tagname) {
//         /*
//          * Fires when a tag is closed.
//          *
//          * You can rely on this event only firing when you have received an
//          * equivalent opening tag before. Closing tags without corresponding
//          * opening tags will be ignored.
//          */
//         if (tagname === "script") {
//             console.log("That's it?!");
//         }
//     },
// });
// parser.write(
//     `<svg xmlns="http://www.w3.org/2000/svg" 
//     version="1.1" width="400" height="200" style="background-color: #09c">
//       <rect x="0" y="0" width="400" height="200" fill="none" stroke="#000" stroke-width="1"></rect>
//       <rect x="0" y="0" width="100" height="100" fill="#000" stroke="none"></rect>
//       <rect x="100" y="100" width="100" height="100" fill="#09c" stroke="none"></rect>
//       <circle cx="150" cy="50" r="50" stroke="none" stroke-width="2" fill="#f00"></circle>    
//   </svg>`
// );
// parser.end();