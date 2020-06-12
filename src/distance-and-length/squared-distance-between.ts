
/** 
 * Returns the squared distance between two 2d points.
 * @param p a point
 * @param q another point
 */
function squaredDistanceBetween(p: number[], q: number[]): number {
    let x = q[0] - p[0]; 
    let y = q[1] - p[1];

    return x*x + y*y;
}


export { squaredDistanceBetween }
