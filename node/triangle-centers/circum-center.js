"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circumCenter = void 0;
const length_squared_1 = require("../distance-and-length/length-squared");
const det_1 = require("../matrix/det");
/**
* Returns the circumcenter of the given 2d triangle.
* @param triangle
*/
function circumCenter(triangle) {
    // See wikipedia
    let p1 = triangle[0];
    let p2 = triangle[1];
    let p3 = triangle[2];
    const sqLen = length_squared_1.lengthSquared;
    let Sx = 0.5 * det_1.det3([sqLen(p1), p1[1], 1], [sqLen(p2), p2[1], 1], [sqLen(p3), p3[1], 1]);
    let Sy = 0.5 * det_1.det3([p1[0], sqLen(p1), 1], [p2[0], sqLen(p2), 1], [p3[0], sqLen(p3), 1]);
    let a = det_1.det3([p1[0], p1[1], 1], [p2[0], p2[1], 1], [p3[0], p3[1], 1]);
    return [Sx / a, Sy / a];
}
exports.circumCenter = circumCenter;
//# sourceMappingURL=circum-center.js.map