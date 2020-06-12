"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scale = void 0;
/**
 * Returns a scaled version of the given 2-vector.
 * @param p a vector
 * @param c a scale factor
 */
function scale(p, c) {
    return [c * p[0], c * p[1]];
}
exports.scale = scale;
//# sourceMappingURL=scale.js.map