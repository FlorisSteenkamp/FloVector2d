
import { orient2d } from 'flo-numerical';


/**
 * Returns true if the two given 2d line segments intersect, false otherwise.
 * * **robust** uses exact adaptive floating point arithmetic.
 * @param a a line segment
 * @param b another line segment
 */
function doesSegSegIntersect(a: number[][], b: number[][]): boolean {
    if ((orient2d(a[0], a[1], b[0]) * orient2d(a[0], a[1], b[1])) > 0) {
        return false;
    } 
    
    if ((orient2d(b[0], b[1], a[0]) * orient2d(b[0], b[1], a[1])) > 0) {
        return false;
    }

    return true;
} 


export { doesSegSegIntersect }
