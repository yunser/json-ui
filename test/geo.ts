import * as assert from 'assert'
import { Point, Rect } from '../src/utils/geo'
// import { describe, it } from 'mocha'
// const { describe, it } = require('mocha')

console.log('geo.ts')

const rect = new Rect()

assert(rect instanceof Rect)

const pt = new Point(200, 100)
assert.equal(pt.x, 200)
assert.equal(pt.y, 100)

const clonePt = pt.clone()
assert.equal(clonePt.x, 200)
assert.equal(clonePt.y, 100)
// clonePt.x = 200

// const pt2 = new Point(pt)
// assert.equal(pt2.x, 200)
// assert.equal(pt2.y, 100)

// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present', function () {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });