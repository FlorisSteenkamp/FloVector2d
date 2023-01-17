
/** 
 * Returns the distance between two 2d points.
 * @param p a point
 * @param q another point
 */
function distanceBetween(p: number[], q: number[]): number {
    const x = q[0] - p[0]; 
    const y = q[1] - p[1];

    return Math.sqrt(x*x + y*y);
}


export { distanceBetween }
