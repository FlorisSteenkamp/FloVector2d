"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.segSegIntersection = void 0;
const flo_numerical_1 = require("flo-numerical");
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
    let denom = flo_numerical_1.expansionDiff(flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(b0, a0), flo_numerical_1.twoDiff(d1, c1)), flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(b1, a1), flo_numerical_1.twoDiff(d0, c0)));
    //let rNumer = (a[1] - c[1])*(d[0] - c[0]) - (a[0] - c[0])*(d[1] - c[1]);
    let rNumer = flo_numerical_1.expansionDiff(flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(a1, c1), flo_numerical_1.twoDiff(d0, c0)), flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(a0, c0), flo_numerical_1.twoDiff(d1, c1)));
    //let sNumer = (a[1] - c[1]) * (b[0] - a[0]) - (a[0] - c[0]) * (b[1] - a[1]); 
    let sNumer = flo_numerical_1.expansionDiff(flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(a1, c1), flo_numerical_1.twoDiff(b0, a0)), flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(a0, c0), flo_numerical_1.twoDiff(b1, a1)));
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
    if (flo_numerical_1.sign(rNumer) * flo_numerical_1.sign(denom) >= 0 && flo_numerical_1.compare(flo_numerical_1.abs(denom), flo_numerical_1.abs(rNumer)) >= 0 &&
        flo_numerical_1.sign(sNumer) * flo_numerical_1.sign(denom) >= 0 && flo_numerical_1.compare(flo_numerical_1.abs(denom), flo_numerical_1.abs(sNumer)) >= 0) {
        let r = flo_numerical_1.estimate(rNumer) / flo_numerical_1.estimate(denom);
        //return [a0 + r*(b0 - a0), a1 + r*(b1 - a1)];
        return [
            flo_numerical_1.estimate(flo_numerical_1.twoSum(flo_numerical_1.estimate(flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(b0, a0), rNumer)) / flo_numerical_1.estimate(denom), a0)),
            flo_numerical_1.estimate(flo_numerical_1.twoSum(flo_numerical_1.estimate(flo_numerical_1.expansionProduct(flo_numerical_1.twoDiff(b1, a1), rNumer)) / flo_numerical_1.estimate(denom), a1))
        ];
    }
    return undefined;
}
exports.segSegIntersection = segSegIntersection;
//# sourceMappingURL=seg-seg-intersection.js.map