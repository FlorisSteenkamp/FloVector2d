"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cross = void 0;
/**
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param a the first vector
 * @param b the second vector
 */
function cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}
exports.cross = cross;
//# sourceMappingURL=cross.js.map