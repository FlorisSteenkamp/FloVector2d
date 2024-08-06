/**
 * Performs linear interpolation between two 2d points and returns the
 * resulting point.
 * @param p the first point.
 * @param q the second point.
 * @param t the interpolation fraction (often in [0,1]).
 */
function interpolate(p, q, t) {
    return [
        p[0] + (q[0] - p[0]) * t,
        p[1] + (q[1] - p[1]) * t
    ];
}
export { interpolate };
//# sourceMappingURL=interpolate.js.map