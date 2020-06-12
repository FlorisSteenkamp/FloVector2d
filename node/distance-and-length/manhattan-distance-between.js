"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manhattanDistanceBetween = void 0;
/**
 * Returns the Manhattan distance between two 2d points.
 * @param p a point.
 * @param q another point.
 */
function manhattanDistanceBetween(p, q) {
    return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);
}
exports.manhattanDistanceBetween = manhattanDistanceBetween;
//# sourceMappingURL=manhattan-distance-between.js.map