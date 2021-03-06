
import { 
    twoDiff, sign, compare, estimate, expansionDiff, 
    expansionProduct, abs, twoSum 
} from 'flo-numerical';


/**
* Returns the point where two line segments intersect or undefined if they 
* don't intersect or if they intersect at infinitely many points.
* * see Geometric primitves http://algs4.cs.princeton.edu/91primitives
* * **certified**
* @param ab The first line 
* @param cd The second line
*/
function segSegIntersection(
        ab: number[][], 
        cd: number[][]): number[] | undefined {

    let [a,b] = ab;
    let [c,d] = cd;

    let [a0, a1] = a;
    let [b0, b1] = b;
    let [c0, c1] = c;
    let [d0, d1] = d;

    //let denom  = (b[0] - a[0])*(d[1] - c[1]) - (b[1] - a[1])*(d[0] - c[0]);
    let denom = expansionDiff(
        expansionProduct(twoDiff(b0, a0), twoDiff(d1, c1)),
        expansionProduct(twoDiff(b1, a1), twoDiff(d0, c0))
    );

    //let rNumer = (a[1] - c[1])*(d[0] - c[0]) - (a[0] - c[0])*(d[1] - c[1]);
    let rNumer = expansionDiff(
        expansionProduct(twoDiff(a1, c1), twoDiff(d0, c0)),
        expansionProduct(twoDiff(a0, c0), twoDiff(d1, c1)),
    );

    //let sNumer = (a[1] - c[1]) * (b[0] - a[0]) - (a[0] - c[0]) * (b[1] - a[1]); 
    let sNumer = expansionDiff(
        expansionProduct(twoDiff(a1, c1), twoDiff(b0, a0)),
        expansionProduct(twoDiff(a0, c0), twoDiff(b1, a1)),
    );

    if (denom[denom.length-1] === 0) {
        // parallel
        if (rNumer[rNumer.length-1] === 0) {
            // collinear
            // TODO Check if x-projections and y-projections intersect
            // and return the line of intersection if they do.
            return undefined;
        }
        return undefined;
    }

    //let r = rNumer / denom;
    //let s = sNumer / denom;

    // if (0 <= r && r <= 1 && 0 <= s && s <= 1)
    if (sign(rNumer) * sign(denom) >= 0 && compare(abs(denom), abs(rNumer)) >= 0 &&
        sign(sNumer) * sign(denom) >= 0 && compare(abs(denom), abs(sNumer)) >= 0) {

        let r = estimate(rNumer) / estimate(denom);

        //return [a0 + r*(b0 - a0), a1 + r*(b1 - a1)];
        return [
            estimate(twoSum(
                estimate(expansionProduct(twoDiff(b0, a0), rNumer)) / estimate(denom), 
                a0
            )),
            estimate(twoSum(
                estimate(expansionProduct(twoDiff(b1, a1), rNumer)) / estimate(denom), 
                a1
            ))
        ];
    } 

    return undefined;
}


export { segSegIntersection }
