"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doc = void 0;
const helper_1 = require("./helper");
class Doc {
    constructor({ content }) {
        this.content = content;
    }
    toHtml() {
        const html = {
            _type: 'html',
            _children: [
                {
                    _type: 'body',
                    _children: this.content.map(node => {
                        if (node._type == 'h1') {
                            return {
                                _type: 'h1',
                                _text: node._text,
                            };
                        }
                        if (node._type == 'h2') {
                            return {
                                _type: 'h2',
                                _text: node._text,
                            };
                        }
                        if (node._type == 'h3') {
                            return {
                                _type: 'h3',
                                _text: node._text,
                            };
                        }
                        if (node._type == 'p') {
                            return {
                                _type: 'p',
                                _text: node._text,
                            };
                        }
                        if (node._type == 'image') {
                            return {
                                _type: 'img',
                                src: node.url,
                                width: node.width,
                                height: node.height,
                                // _text: node._text,
                            };
                        }
                        return {
                            _type: node._type,
                            // _text: node._text,
                        };
                    })
                }
            ]
        };
        return (0, helper_1.xmlObj2Xml)((0, helper_1.convertTypedJson2XmlObject)(html), {
            closeTags: ['img'],
        });
    }
    toJson() {
        let json = {
            version: '0.0.1',
            content: this.content
        };
        return JSON.stringify(json, null, 4);
    }
    toMarkdown() {
        return this.content.map(node => {
            if (node._type == 'h1') {
                return `# ${node._text}`;
            }
            if (node._type == 'h2') {
                return `## ${node._text}`;
            }
            if (node._type == 'h3') {
                return `### ${node._text}`;
            }
            if (node._type == 'p') {
                return `${node._text}`;
            }
            if (node._type == 'image') {
                return `![](${node.url})`;
            }
            return '?';
        }).join('\n\n') + '\n';
    }
}
exports.Doc = Doc;
//# sourceMappingURL=doc.js.map