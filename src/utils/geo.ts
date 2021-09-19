export class Rect {}

export class Point {
    readonly x: number
    readonly y: number

    constructor(...args) {

        if (args.length === 1) {
            if (args[0] instanceof Point) {
                this.x = args[0].x
                this.y = args[0].y
            }
        }
        this.x = args[0]
        this.y = args[1]
    }

    clone() {
        return new Point(this.x, this.y)
    }
}

export class Vector {
    readonly x: number
    readonly y: number
}

