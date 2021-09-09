"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
class Graph {
    constructor({ root }) {
        this.root = root;
    }
    toJson() {
        return JSON.stringify(this.root, null, 4);
    }
}
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map