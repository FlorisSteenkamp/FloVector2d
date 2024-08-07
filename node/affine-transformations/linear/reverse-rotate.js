/**
 * Returns a rotated (clockwise) version of the given 2-vector given the
 * sine and cosine of the angle.
 * @param p a 2d vector
 * @param sinθ
 * @param cosθ
 */
function reverseRotate(sinθ, cosθ, p) {
    return [
        +p[0] * cosθ + p[1] * sinθ,
        -p[0] * sinθ + p[1] * cosθ
    ];
}
export { reverseRotate };
//# sourceMappingURL=reverse-rotate.js.map