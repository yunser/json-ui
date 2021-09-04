export class Graph {

    root: any

    constructor({ root }) {
        this.root = root
    }

    toJson() {
        return JSON.stringify(this.root, null, 4)
    }
}
