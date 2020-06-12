"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLength = void 0;
/**
 * Returns the given 2-vector scaled to the given length.
 * @param p a vector
 * @param length the length to scale to
 */
function toLength(p, length) {
    let c = length / Math.sqrt(p[0] * p[0] + p[1] * p[1]);
    return [c * p[0], c * p[1]];
}
exports.toLength = toLength;
//# sourceMappingURL=to-length.js.map