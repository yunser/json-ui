"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = exports.Point = exports.Rect = void 0;
class Rect {
}
exports.Rect = Rect;
class Point {
    constructor(...args) {
        if (args.length === 1) {
            if (args[0] instanceof Point) {
                this.x = args[0].x;
                this.y = args[0].y;
            }
        }
        this.x = args[0];
        this.y = args[1];
    }
    clone() {
        return new Point(this.x, this.y);
    }
}
exports.Point = Point;
class Vector {
}
exports.Vector = Vector;
//# sourceMappingURL=geo.js.map