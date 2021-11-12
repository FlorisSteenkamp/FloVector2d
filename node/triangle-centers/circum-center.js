import { lengthSquared } from "../distance-and-length/length-squared.js";
import { det3 } from "../matrix/det.js";
/**
* Returns the circumcenter of the given 2d triangle.
* @param triangle
*/
function circumCenter(triangle) {
    // See wikipedia
    let p1 = triangle[0];
    let p2 = triangle[1];
    let p3 = triangle[2];
    const sqLen = lengthSquared;
    let Sx = 0.5 * det3([sqLen(p1), p1[1], 1], [sqLen(p2), p2[1], 1], [sqLen(p3), p3[1], 1]);
    let Sy = 0.5 * det3([p1[0], sqLen(p1), 1], [p2[0], sqLen(p2), 1], [p3[0], sqLen(p3), 1]);
    let a = det3([p1[0], p1[1], 1], [p2[0], p2[1], 1], [p3[0], p3[1], 1]);
    return [Sx / a, Sy / a];
}
export { circumCenter };
//# sourceMappingURL=circum-center.js.map