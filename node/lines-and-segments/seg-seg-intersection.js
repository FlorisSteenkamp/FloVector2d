import { twoDiff, eSign, eCompare, eEstimate, eDiff, expansionProduct, eAbs, twoSum } from 'big-float-ts';
/**
* Returns the point where two line segments intersect or undefined if they
* don't intersect or if they intersect at infinitely many points.
* * see Geometric primitves http://algs4.cs.princeton.edu/91primitives
* * **certified**
* @param ab The first line
* @param cd The second line
*/
function segSegIntersection(ab, cd) {
    let [a, b] = ab;
    let [c, d] = cd;
    let [a0, a1] = a;
    let [b0, b1] = b;
    let [c0, c1] = c;
    let [d0, d1] = d;
    //let denom  = (b[0] - a[0])*(d[1] - c[1]) - (b[1] - a[1])*(d[0] - c[0]);
    let denom = eDiff(expansionProduct(twoDiff(b0, a0), twoDiff(d1, c1)), expansionProduct(twoDiff(b1, a1), twoDiff(d0, c0)));
    //let rNumer = (a[1] - c[1])*(d[0] - c[0]) - (a[0] - c[0])*(d[1] - c[1]);
    let rNumer = eDiff(expansionProduct(twoDiff(a1, c1), twoDiff(d0, c0)), expansionProduct(twoDiff(a0, c0), twoDiff(d1, c1)));
    //let sNumer = (a[1] - c[1]) * (b[0] - a[0]) - (a[0] - c[0]) * (b[1] - a[1]); 
    let sNumer = eDiff(expansionProduct(twoDiff(a1, c1), twoDiff(b0, a0)), expansionProduct(twoDiff(a0, c0), twoDiff(b1, a1)));
    if (denom[denom.length - 1] === 0) {
        // parallel
        if (rNumer[rNumer.length - 1] === 0) {
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
    if (eSign(rNumer) * eSign(denom) >= 0 && eCompare(eAbs(denom), eAbs(rNumer)) >= 0 &&
        eSign(sNumer) * eSign(denom) >= 0 && eCompare(eAbs(denom), eAbs(sNumer)) >= 0) {
        let r = eEstimate(rNumer) / eEstimate(denom);
        //return [a0 + r*(b0 - a0), a1 + r*(b1 - a1)];
        return [
            eEstimate(twoSum(eEstimate(expansionProduct(twoDiff(b0, a0), rNumer)) / eEstimate(denom), a0)),
            eEstimate(twoSum(eEstimate(expansionProduct(twoDiff(b1, a1), rNumer)) / eEstimate(denom), a1))
        ];
    }
    return undefined;
}
export { segSegIntersection };
//# sourceMappingURL=seg-seg-intersection.js.map