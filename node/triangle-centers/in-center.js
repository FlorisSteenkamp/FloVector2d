"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inCenter = void 0;
const distance_between_1 = require("../distance-and-length/distance-between");
/**
 * Returns the incenter of the given triangle.
 * * see Wikipedia - https://en.wikipedia.org/wiki/Incenter
 * @param triangle
 */
function inCenter(triangle) {
    const dst = distance_between_1.distanceBetween;
    let p = triangle[0];
    let q = triangle[1];
    let r = triangle[2];
    let a = dst(q, r);
    let b = dst(p, r);
    let c = dst(p, q);
    let lengthSum = a + b + c;
    return [
        (a * p[0] + b * q[0] + c * r[0]) / lengthSum,
        (a * p[1] + b * q[1] + c * r[1]) / lengthSum
    ];
}
exports.inCenter = inCenter;
//# sourceMappingURL=in-center.js.map