import { convertTypedJson2XmlObject, TypedJson, xmlObj2Xml } from "./helper"

export class Doc {

    content: any

    constructor({ content }: any) {
        this.content = content
    }

    toHtml() {
        const html: TypedJson = {
            _type: 'html',
            _children: [
                {
                    _type: 'body',
                    _children: this.content.map(node => {
                        if (node._type == 'h1') {
                            return {
                                _type: 'h1',
                                _text: node._text,
                            }
                        }
                        if (node._type == 'h2') {
                            return {
                                _type: 'h2',
                                _text: node._text,
                            }
                            // return `## ${node._text}`
                        }
                        if (node._type == 'h3') {
                            return {
                                _type: 'h3',
                                _text: node._text,
                            }
                            // return `### ${node._text}`
                        }
                        if (node._type == 'p') {
                            return {
                                _type: 'p',
                                _text: node._text,
                            }
                            // return `${node._text}`
                        }
                        return {
                            _type: '?',
                            _text: node._text,
                        }
                    })
                }
            ]
        }
        return xmlObj2Xml(convertTypedJson2XmlObject(html))
    }

    toJson() {
        let json = {
            version: '0.0.1',
            content: this.content
        }
        return JSON.stringify(json, null, 4)
    }

    toMarkdown() {
        return this.content.map(node => {
            if (node._type == 'h1') {
                return `# ${node._text}`
            }
            if (node._type == 'h2') {
                return `## ${node._text}`
            }
            if (node._type == 'h3') {
                return `### ${node._text}`
            }
            if (node._type == 'p') {
                return `${node._text}`
            }
            return '?'
        }).join('\n\n') + '\n'
    }
}
