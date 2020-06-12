"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAffine = void 0;
function transformAffine([[a, b], [c, d]], [r, s], p) {
    function transform([x, y]) {
        return [
            a * x + b * y + r,
            c * x + d * y + s
        ];
    }
    // Curry the function
    return p === undefined ? transform : transform(p);
}
exports.transformAffine = transformAffine;
//# sourceMappingURL=transform-affine.js.map