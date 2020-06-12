"use strict";
//==================================
// 2d vector pure functions library
//==================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAffine = exports.transformLinear = exports.rotateNeg90Degrees = exports.rotate90Degrees = exports.reverseRotate = exports.det3 = exports.centroid = exports.inCenter = exports.circumCenter = exports.squaredDistanceBetweenPointAndLineSegment = exports.distanceBetweenPointAndLine = exports.manhattanLength = exports.manhattanDistanceBetween = exports.lengthSquared = exports.len = exports.distanceBetween = exports.toLength = exports.toUnitVector = exports.reverse = exports.scale = exports.doesSegSegIntersect = exports.segSegIntersection = exports.lineLineIntersection = exports.ccw = exports.getObjClosestTo = exports.getClosestTo = exports.equal = exports.rotate = exports.translate = exports.mean = exports.interpolate = exports.fromTo = exports.squaredDistanceBetween = exports.cross = exports.dot = void 0;
const flo_numerical_1 = require("flo-numerical");
const dot_1 = require("./dot");
Object.defineProperty(exports, "dot", { enumerable: true, get: function () { return dot_1.dot; } });
const cross_1 = require("./cross");
Object.defineProperty(exports, "cross", { enumerable: true, get: function () { return cross_1.cross; } });
const seg_seg_intersection_1 = require("./lines-and-segments/seg-seg-intersection");
Object.defineProperty(exports, "segSegIntersection", { enumerable: true, get: function () { return seg_seg_intersection_1.segSegIntersection; } });
const does_seg_seg_intersect_1 = require("./lines-and-segments/does-seg-seg-intersect");
Object.defineProperty(exports, "doesSegSegIntersect", { enumerable: true, get: function () { return does_seg_seg_intersect_1.doesSegSegIntersect; } });
const line_line_intersection_1 = require("./lines-and-segments/line-line-intersection");
Object.defineProperty(exports, "lineLineIntersection", { enumerable: true, get: function () { return line_line_intersection_1.lineLineIntersection; } });
const translate_1 = require("./affine-transformations/translate/translate");
Object.defineProperty(exports, "translate", { enumerable: true, get: function () { return translate_1.translate; } });
const rotate_1 = require("./affine-transformations/linear/rotate");
Object.defineProperty(exports, "rotate", { enumerable: true, get: function () { return rotate_1.rotate; } });
const scale_1 = require("./affine-transformations/linear/scale");
Object.defineProperty(exports, "scale", { enumerable: true, get: function () { return scale_1.scale; } });
const reverse_1 = require("./affine-transformations/linear/reverse");
Object.defineProperty(exports, "reverse", { enumerable: true, get: function () { return reverse_1.reverse; } });
const reverse_rotate_1 = require("./affine-transformations/linear/reverse-rotate");
Object.defineProperty(exports, "reverseRotate", { enumerable: true, get: function () { return reverse_rotate_1.reverseRotate; } });
const rotate_90_degrees_1 = require("./affine-transformations/linear/rotate-90-degrees");
Object.defineProperty(exports, "rotate90Degrees", { enumerable: true, get: function () { return rotate_90_degrees_1.rotate90Degrees; } });
const rotate_neg_90_degrees_1 = require("./affine-transformations/linear/rotate-neg-90-degrees");
Object.defineProperty(exports, "rotateNeg90Degrees", { enumerable: true, get: function () { return rotate_neg_90_degrees_1.rotateNeg90Degrees; } });
const transform_linear_1 = require("./affine-transformations/linear/transform-linear");
Object.defineProperty(exports, "transformLinear", { enumerable: true, get: function () { return transform_linear_1.transformLinear; } });
const transform_affine_1 = require("./affine-transformations/transform-affine");
Object.defineProperty(exports, "transformAffine", { enumerable: true, get: function () { return transform_affine_1.transformAffine; } });
const to_unit_vector_1 = require("./distance-and-length/to-unit-vector");
Object.defineProperty(exports, "toUnitVector", { enumerable: true, get: function () { return to_unit_vector_1.toUnitVector; } });
const to_length_1 = require("./distance-and-length/to-length");
Object.defineProperty(exports, "toLength", { enumerable: true, get: function () { return to_length_1.toLength; } });
const distance_between_1 = require("./distance-and-length/distance-between");
Object.defineProperty(exports, "distanceBetween", { enumerable: true, get: function () { return distance_between_1.distanceBetween; } });
const len_1 = require("./distance-and-length/len");
Object.defineProperty(exports, "len", { enumerable: true, get: function () { return len_1.len; } });
const length_squared_1 = require("./distance-and-length/length-squared");
Object.defineProperty(exports, "lengthSquared", { enumerable: true, get: function () { return length_squared_1.lengthSquared; } });
const manhattan_distance_between_1 = require("./distance-and-length/manhattan-distance-between");
Object.defineProperty(exports, "manhattanDistanceBetween", { enumerable: true, get: function () { return manhattan_distance_between_1.manhattanDistanceBetween; } });
const manhattan_length_1 = require("./distance-and-length/manhattan-length");
Object.defineProperty(exports, "manhattanLength", { enumerable: true, get: function () { return manhattan_length_1.manhattanLength; } });
const distance_between_point_and_line_1 = require("./distance-and-length/distance-between-point-and-line");
Object.defineProperty(exports, "distanceBetweenPointAndLine", { enumerable: true, get: function () { return distance_between_point_and_line_1.distanceBetweenPointAndLine; } });
const squared_distance_between_point_and_line_segment_1 = require("./distance-and-length/squared-distance-between-point-and-line-segment");
Object.defineProperty(exports, "squaredDistanceBetweenPointAndLineSegment", { enumerable: true, get: function () { return squared_distance_between_point_and_line_segment_1.squaredDistanceBetweenPointAndLineSegment; } });
const squared_distance_between_1 = require("./distance-and-length/squared-distance-between");
Object.defineProperty(exports, "squaredDistanceBetween", { enumerable: true, get: function () { return squared_distance_between_1.squaredDistanceBetween; } });
const circum_center_1 = require("./triangle-centers/circum-center");
Object.defineProperty(exports, "circumCenter", { enumerable: true, get: function () { return circum_center_1.circumCenter; } });
const in_center_1 = require("./triangle-centers/in-center");
Object.defineProperty(exports, "inCenter", { enumerable: true, get: function () { return in_center_1.inCenter; } });
const centroid_1 = require("./triangle-centers/centroid");
Object.defineProperty(exports, "centroid", { enumerable: true, get: function () { return centroid_1.centroid; } });
const det_1 = require("./matrix/det");
Object.defineProperty(exports, "det3", { enumerable: true, get: function () { return det_1.det3; } });
/**
 * Three 2d points are a counter-clockwise turn if ccw > 0, clockwise if
 * ccw < 0, and colinear if ccw === 0 because ccw is a determinant that gives
 * twice the signed area of the triangle formed by the points a, b and c.
 * * **certified**
 * @param A The first point
 * @param B The second point
 * @param C The third point
 */
const ccw = flo_numerical_1.orient2d;
exports.ccw = ccw;
/**
 * Returns the second 2-vector minus the first.
 * @param p the first vector
 * @param q the second vector
  */
function fromTo(p, q) {
    return [q[0] - p[0], q[1] - p[1]];
}
exports.fromTo = fromTo;
/**
 * Performs linear interpolation between two 2d points and returns the
 * resulting point.
 * @param p the first point.
 * @param q the second point.
 * @param t the interpolation fraction (often in [0,1]).
 */
function interpolate(p, q, t) {
    return [
        p[0] + (q[0] - p[0]) * t,
        p[1] + (q[1] - p[1]) * t
    ];
}
exports.interpolate = interpolate;
/**
 * Returns the mean of two 2d points.
 * @param ps the two points
 */
function mean(ps) {
    let p = ps[0];
    let q = ps[1];
    return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
}
exports.mean = mean;
/**
* Returns true if two 2-vectors are identical (by value), false otherwise.
* @param a a 2d vector
* @param b another 2d vector
*/
function equal(a, b) {
    return (a[0] === b[0] && a[1] === b[1]);
}
exports.equal = equal;
/**
 * Returns the closest point to the array of 2d points or if the array is empty
 * returns undefined.
 * @param p
 * @param ps
 */
function getClosestTo(p, ps) {
    let closestPoint = undefined;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < ps.length; i++) {
        let q = ps[i];
        let d = squared_distance_between_1.squaredDistanceBetween(p, q);
        if (d < closestDistance) {
            closestPoint = q;
            closestDistance = d;
        }
    }
    return closestPoint;
}
exports.getClosestTo = getClosestTo;
/**
 * Returns the closest point to the array of 2d points by providing a distance
 * function. If the given array is empty, returns undefined.
 * @param p
 * @param ps
 * @param f a function that takes the object and returns a point in order to
 * apply the Euclidian distance.
 */
function getObjClosestTo(p, ps, f) {
    let closestObj = undefined; // Closest Point
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < ps.length; i++) {
        let o = ps[i];
        let d = squared_distance_between_1.squaredDistanceBetween(p, f(o));
        if (d < closestDistance) {
            closestObj = o;
            closestDistance = d;
        }
    }
    return closestObj;
}
exports.getObjClosestTo = getObjClosestTo;
//# sourceMappingURL=index.js.map