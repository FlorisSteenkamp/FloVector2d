"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.squaredDistanceBetween = void 0;
/**
 * Returns the squared distance between two 2d points.
 * @param p a point
 * @param q another point
 */
function squaredDistanceBetween(p, q) {
    let x = q[0] - p[0];
    let y = q[1] - p[1];
    return x * x + y * y;
}
exports.squaredDistanceBetween = squaredDistanceBetween;
//# sourceMappingURL=squared-distance-between.js.map