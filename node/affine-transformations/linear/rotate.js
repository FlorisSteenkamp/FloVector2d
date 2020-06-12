"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate = void 0;
function rotate(sinθ, cosθ, p) {
    function rotateByθ(p) {
        return [
            p[0] * cosθ - p[1] * sinθ,
            p[0] * sinθ + p[1] * cosθ
        ];
    }
    // Curry the function
    return p === undefined ? rotateByθ : rotateByθ(p);
}
exports.rotate = rotate;
//# sourceMappingURL=rotate.js.map