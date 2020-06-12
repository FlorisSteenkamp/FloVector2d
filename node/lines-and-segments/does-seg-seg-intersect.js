"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesSegSegIntersect = void 0;
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns true if the two given 2d line segments intersect, false otherwise.
 * * **robust** uses exact adaptive floating point arithmetic.
 * @param a a line segment
 * @param b another line segment
 */
function doesSegSegIntersect(a, b) {
    if ((flo_numerical_1.orient2d(a[0], a[1], b[0]) * flo_numerical_1.orient2d(a[0], a[1], b[1])) > 0) {
        return false;
    }
    if ((flo_numerical_1.orient2d(b[0], b[1], a[0]) * flo_numerical_1.orient2d(b[0], b[1], a[1])) > 0) {
        return false;
    }
    return true;
}
exports.doesSegSegIntersect = doesSegSegIntersect;
//# sourceMappingURL=does-seg-seg-intersect.js.map