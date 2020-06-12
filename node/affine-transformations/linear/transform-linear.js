"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformLinear = void 0;
function transformLinear([[a, b], [c, d]], p) {
    function transform([x, y]) {
        return [
            a * x + b * y,
            c * x + d * y
        ];
    }
    // Curry the function
    return p === undefined ? transform : transform(p);
}
exports.transformLinear = transformLinear;
//# sourceMappingURL=transform-linear.js.map