"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.squaredDistanceBetweenPointAndLineSegment = void 0;
const squared_distance_between_1 = require("./squared-distance-between");
/**
 * Returns the squared distance between the given point and line segment.
 * @param p a point
 * @param l a line
 */
function squaredDistanceBetweenPointAndLineSegment(p, l) {
    const sqDst = squared_distance_between_1.squaredDistanceBetween;
    let v = l[0];
    let w = l[1];
    let l2 = sqDst(v, w);
    if (l2 == 0) {
        return sqDst(p, v);
    }
    let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    let d2 = sqDst(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
    return d2;
}
exports.squaredDistanceBetweenPointAndLineSegment = squaredDistanceBetweenPointAndLineSegment;
//# sourceMappingURL=squared-distance-between-point-and-line-segment.js.map