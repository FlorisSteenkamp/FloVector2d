
/**
 * Returns the distance between the given point and line. 
 * * see https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
 * @param p a point
 * @param l a line
 */
function distanceBetweenPointAndLine(p: number[], l: number[][]): number {
    let [x0,y0] = p;
    let [[x1,y1],[x2,y2]] = l;

    let y = y2-y1;
    let x = x2-x1;

    let a = (y*x0 - x*y0 + x2*y1 - y2*x1);
    let b = Math.sqrt(x*x + y*y);

    return Math.abs(a/b);
}


export { distanceBetweenPointAndLine }
