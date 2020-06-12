"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUnitVector = void 0;
/**
 * Returns the given 2-vector scaled to a length of one.
 * @param p a vector
 */
function toUnitVector(p) {
    let scaleFactor = 1 / (Math.sqrt(p[0] * p[0] + p[1] * p[1]));
    return [p[0] * scaleFactor, p[1] * scaleFactor];
}
exports.toUnitVector = toUnitVector;
//# sourceMappingURL=to-unit-vector.js.map