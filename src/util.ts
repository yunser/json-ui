
function treeMap(treeObj, options: any = {}) {

    const { nodeHandler, childrenKey = 'children', childrenSetKey = 'children' } = options

    function dealList(children, level, p) {
        let results: any[] = []
        for (let child of children) {
            results.push(dealObj(child, level, p))
            // content += (indent ? ('\n' + textLoop(indent, level)) : '') + 
        }
        // content += (indent ? (textLoop(indent, level) + '\n') : '')
        return results
    }

    function dealObj(obj, level = 0, parent) {
        let children: any[] = []
        if (obj[childrenKey] && obj[childrenKey].length) {
            children = dealList(obj[childrenKey], level + 1, obj)
        }

        

        let result = nodeHandler(obj, { level, parent })
        if (children.length) {
            result[childrenSetKey] = children
        }
        return result
        // let attrContent = ''
        // if (obj.attr) {
        //     for (let key in obj.attr) {
        //         attrContent += ` ${key}="${obj.attr[key]}"`
        //     }
        // }

        // return result
    }

    return dealObj(treeObj, 0, null)
}

function treeFilter(treeObj, options: any = {}) {
    const { nodeHandler } = options

    function dealList(children, level) {
        let results: any[] = []
        for (let child of children) {
            let ret = dealObj(child, level)
            if (ret) {
                results.push(ret)
            }
            // content += (indent ? ('\n' + textLoop(indent, level)) : '') + 
        }
        // content += (indent ? (textLoop(indent, level) + '\n') : '')
        return results
    }

    function dealObj(obj, level = 0) {
        let children: any[] = []
        if (obj && obj.children && obj.children.length) {
            children = dealList(obj.children, level + 1)
        }

        

        let result = nodeHandler(obj)
        // if (result)
        if (result && children.length) {
            result.children = children
        }
        return result
        // let attrContent = ''
        // if (obj.attr) {
        //     for (let key in obj.attr) {
        //         attrContent += ` ${key}="${obj.attr[key]}"`
        //     }
        // }

        // return result
    }

    return dealObj(treeObj, 0)
}

function textLoop(indent, num) {
    let result = ''
    for (let i = 0; i < num; i++) {
        result += indent
    }
    return result
}

function svgObj2Xml(svgObj, options: any = {}) {

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
        let childrenContent = ''
        if (obj.children && obj.children.length) {
            childrenContent = dealList(obj.children, level + 1)
        }

        let attrContent = ''
        if (obj.attr) {
            for (let key in obj.attr) {
                attrContent += ` ${key}="${obj.attr[key]}"`
            }
        }

        return `<${obj.type}${attrContent}>${obj._data || ''}${childrenContent}</${obj.type}>`
    }

    return dealObj(svgObj, 0)
}

module.exports = {
    treeMap,
    treeFilter,
    svgObj2Xml,
}
