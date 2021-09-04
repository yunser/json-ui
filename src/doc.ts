export class Doc {

    content: any

    constructor({ content }: any) {
        this.content = content
    }

    toHtml() {
        return ''   
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
