/**
 * Performs linear interpolation between two 2d points and returns the
 * resulting point.
 * @param p the first point.
 * @param q the second point.
 * @param t the interpolation fraction (often in [0,1]).
 */
declare function interpolate(p: number[], q: number[], t: number): number[];
export { interpolate };
