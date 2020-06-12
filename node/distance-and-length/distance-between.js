"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceBetween = void 0;
/**
 * Returns the distance between two 2d points.
 * @param p a point
 * @param q another point
 */
function distanceBetween(p, q) {
    let x = q[0] - p[0];
    let y = q[1] - p[1];
    return Math.sqrt(x * x + y * y);
}
exports.distanceBetween = distanceBetween;
//# sourceMappingURL=distance-between.js.map