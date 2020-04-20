
import { 
    orient2d, twoDiff, sign, compare, estimate, expansionDiff, 
    expansionProduct, abs, twoSum 
} from 'flo-numerical';

import { lineLineIntersection } from './line-line-intersection';


export interface ICurriedFunction2<T, U, V> {
    (t: T): (u2: U) => V;
    (t: T, u: U): V;
}


export interface ICurriedMapFunction2<T, U, V> {
    (t: T): (us: U[]) => V[];
    (t: T, us: U[]): V[];
}


export interface ICurriedFunctionSpecial<S, T, U, V> {
    (s: S, t: T): (u: U) => V;
    (s: S, t: T, u: U): V;
}


export interface ICurriedMapFunctionSpecial<S, T, U, V> {
    (s: S, t: T): (us: U[]) => V[];
    (s: S, t: T, us: U[]): V[];
}


/**
* Creates a transformation function that operates on multiple points from the 
* given arity two function.
* @private
*/
function mapCurry2<T, U, V>(
        f: ICurriedFunction2<T,U,V>): ICurriedMapFunction2<T, U, V> {

    function g(t: T): (us: U[]) => V[]; 
    function g(t: T, us: U[]): V[];
    function g(t: T, us?: U[]) {
        let h = f(t);
        let hUs = (us:U[]) => us.map(h);
        
        // Curry the function
        return us === undefined ? hUs : hUs(us); 
    }
    
    return g;
}


/**
* Creates a transformation function that operates on multiple points from the 
* given arity 3 curried function (keeping the first two parameters uncurried).
* @private
*/
function specialMapCurry<S,T,U,V>(
    f: ICurriedFunctionSpecial<S,T,U,V>): ICurriedMapFunctionSpecial<S,T,U,V> {
        
    function g(s: S, t: T): (us: U[]) => V[]; 
    function g(s: S, t: T, us: U[]): V[];
    function g(s: S, t: T, us?: U[]) {
        let h = f(s,t);
        let hUs = (us:U[]) => us.map(h);
        
        // Curry the function
        return us === undefined ? hUs : hUs(us); 
    }
    
    return g;
}


/** 
 * Returns the dot (inner) product between two 2-vectors. 
 * @param a the first vector
 * @param b the second vector
 */
function dot(a: number[], b: number[]): number {
    return a[0]*b[0] + a[1]*b[1]; 
}


/** 
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param a - The first vector
 * @param b - The second vector
 */
function cross(a: number[], b: number[]): number {
    return a[0]*b[1] - a[1]*b[0]; 
}


/**
 * Three 2d points are a counter-clockwise turn if ccw > 0, clockwise if 
 * ccw < 0, and colinear if ccw === 0 because ccw is a determinant that gives 
 * twice the signed area of the triangle formed by the points a, b and c.
 * @param a The first point
 * @param b The second point
 * @param c The third point
 */
function ccw(a: number[], b: number[], c: number[]) {
    return orient2d(a,b,c);
}


/**
* Returns the point where two line segments intersect or undefined if they 
* don't intersect or if they intersect at infinitely many points.
* See Geometric primitves http://algs4.cs.princeton.edu/91primitives
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


/**
 * Returns true if the two given 2d line segments intersect, false otherwise.
 * 
 * Robust: uses exact adaptive floating point arithmetic.
 * 
 * @param a A line segment
 * @param b Another line segment
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


/** 
* Returns the squared distance between two 2d points.
* @param p1 A point
* @param p2 Another point
*/
function squaredDistanceBetween(p1: number[], p2: number[]): number {
    let x = p2[0] - p1[0]; 
    let y = p2[1] - p1[1];

    return x*x + y*y;
}


/**
* Returns a scaled version of the given 2-vector.
* @param p - A vector
* @param factor - A scale factor
*/
function scale(p: number[], factor: number): number[] {
    return [p[0] * factor, p[1] * factor];
}


/**
* Returns the given 2-vector reversed.
* @param p - A vector
*/
function reverse(p: number[]): number[] {
    return [-p[0], -p[1]];
}


/**
* Returns the given 2-vector scaled to a length of one.
* @param p - A vector
*/
function toUnitVector(p: number[]): number[] {
    let scaleFactor = 1 / (Math.sqrt(p[0]*p[0] + p[1]*p[1]));

    return [p[0] * scaleFactor, p[1] * scaleFactor];
}


/**
* Returns the given 2-vector scaled to the given length.
* @param p - A vector
* @param length - The length to scale to
*/
function toLength(p: number[], length: number): number[] {
    let scaleFactor = length / len(p);

    return [p[0]*scaleFactor, p[1]*scaleFactor];
}


/** 
* Returns the second 2-vector minus the first.
* @param p1 - The first vector
* @param p2 - The second vector
*/
function fromTo(p1: number[], p2: number[]): number[] {
    return [p2[0] - p1[0], p2[1] - p1[1]];
}


/**
* Performs linear interpolation between two 2d points and returns the resultant point.
* @param p1 - The first point.
* @param p2 - The second point.
* @param t - The interpolation fraction (often in [0,1]).  
*/
function interpolate(p1: number[], p2: number[], t: number): number[] {
    return [
        p1[0] + (p2[0] - p1[0])*t, 
        p1[1] + (p2[1] - p1[1])*t
    ];
}


/**
* Returns the mean of two 2d points. 
* @param ps - The two points
*/
function mean(ps: [number[], number[]]): number[] {
    let p1 = ps[0];
    let p2 = ps[1];

    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}


/** 
* Returns the distance between two 2d points.
* @param p1 - A point.
* @param p2 - Another point.
*/
function distanceBetween(p1: number[], p2: number[]): number {
    return Math.sqrt(squaredDistanceBetween(p1, p2));
}


/** 
* Returns the length of the given 2-vector.
* @param p A 2d vector
*/
function len(p: number[]): number {
    return Math.sqrt(p[0]*p[0] + p[1]*p[1]);
}


/**
* Returns the squared length of the given 2-vector.
* @param p - A vector
*/
function lengthSquared(v: number[]): number {
    return v[0]*v[0] + v[1]*v[1];
}


/** 
* Returns the Manhattan distance between two 2d points.
* @param p1 - A point.
* @param p2 - Another point.
*/
function manhattanDistanceBetween(p1: number[], p2: number[]): number {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}


/** 
* Returns the Manhattan length of the given 2-vector.
* @param p - A vector
*/
function manhattanLength(p: number[]): number {
    return Math.abs(p[0]) + Math.abs(p[1]);
}


/**
* <p>
* Returns the distance between the given point and line. 
* </p>
* <p>
* See <a href="https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points">
* this Wikipedia article</a>
* </p>
* @param p - A point
* @param l - A line
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


/**
* Returns the squared distance between the given point and line segment. 
* @param p - A point
* @param l - A line
*/
function squaredDistanceBetweenPointAndLineSegment(
        p: number[], 
        l: number[][]): number {
            
    const sqDst = squaredDistanceBetween;

    let v = l[0];
    let w = l[1];

    let l2 = sqDst(v, w);
    if (l2 == 0) { return sqDst(p, v); }

    let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));

    let d2 = sqDst(
        p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1]) ]);

    return d2;
}


/**
* Returns the circumcenter of the given 2d triangle.
* @param triangle 
*/
function circumCenter(triangle: number[][]): number[] {
    // See wikipedia
    let p1 = triangle[0];
    let p2 = triangle[1];
    let p3 = triangle[2];

    const sqLen = lengthSquared;

    let Sx = 0.5 * det3(
            [sqLen(p1), p1[1], 1],  
            [sqLen(p2), p2[1], 1],
            [sqLen(p3), p3[1], 1]
    );


    let Sy = 0.5 * det3(
            [p1[0], sqLen(p1), 1],  
            [p2[0], sqLen(p2), 1],
            [p3[0], sqLen(p3), 1]
    );

    let a = det3(
            [p1[0], p1[1], 1],  
            [p2[0], p2[1], 1],
            [p3[0], p3[1], 1]
    ); 

    /*
    let b = det3(
            [p1[0], p1[1], sqLen(p1)],  
            [p2[0], p2[1], sqLen(p2)],
            [p3[0], p3[1], sqLen(p3)]
    );
    */

    return [Sx/a, Sy/a];
}


/** 
* <p>
* Returns the incenter of the given triangle.
* </p>
* <p>
* See Wikipedia - https://en.wikipedia.org/wiki/Incenter 
* </p>
* @param triangle
*/
function inCenter(triangle: number[][]): number[] {
    const dst = distanceBetween;

    let p1 = triangle[0];
    let p2 = triangle[1];
    let p3 = triangle[2];

    let l1 = dst(p2, p3);
    let l2 = dst(p1, p3);
    let l3 = dst(p1, p2);
    let lengthSum = l1 + l2 + l3;
    return [
        (l1*p1[0] + l2*p2[0] + l3*p3[0]) / lengthSum,
        (l1*p1[1] + l2*p2[1] + l3*p3[1]) / lengthSum
    ];
}


/**
* Returns the centroid of the given polygon, e.g. triangle. The polygon
* must be simple, i.e. not self-intersecting.
* @param polygon_ 
*/
function centroid(polygon: number[][]): number[] {
    let polygon_: number[][] = [];

    if (polygon.length === 1) { return polygon[0]; }
    
    // remove duplicate points
    let prevP = polygon[polygon.length-1];
    for (let i=0; i<polygon.length; i++) {
        let [_x, _y] = prevP;
        let [x,y] = polygon[i];
        prevP = [x,y];
        
        if (x !== _x || y !== _y) {
            polygon_.push([x,y]);
        }
    }

    if (polygon_.length === 2) {
        let p1 = polygon_[0];
        let p2 = polygon_[1];
        
        let x = p1[0] + p2[0]; 
        let y = p1[1] + p2[1];
        
        return [x/2, y/2];
    }

    if (polygon_.length === 3) {
        let p1 = polygon_[0];
        let p2 = polygon_[1];
        let p3 = polygon_[2];
        
        let x = p1[0] + p2[0] + p3[0]; 
        let y = p1[1] + p2[1] + p3[1];
        
        return [x/3, y/3];
    }

    // polygon.length assumed > 3 and assumed to be non-self-intersecting
    // See wikipedia

    // First calculate the area, A, of the polygon
    let A = 0;
    for (let i=0; i<polygon_.length; i++) {
        let p0 = polygon_[i];
        let p1 = (i === polygon_.length-1) 
            ? polygon_[0]
            : polygon_[i+1];
            
        A = A + (p0[0]*p1[1] - p1[0]*p0[1]);
    }
    A = A/2;

    let C = [0,0];
    for (let i=0; i<polygon_.length; i++) {
        let p0 = polygon_[i];
        let p1 = (i === polygon_.length-1) 
            ? polygon_[0]
            : polygon_[i+1];
            
        C[0] = C[0] + (p0[0] + p1[0]) * (p0[0]*p1[1] - p1[0]*p0[1]); 
        C[1] = C[1] + (p0[1] + p1[1]) * (p0[0]*p1[1] - p1[0]*p0[1]);
    }

    return [C[0]/(6*A), C[1]/(6*A)];
}


/**
* Calculate the determinant of three 3d vectors, i.e. 3x3 matrix
* @ignore
* @param x - A 2d vector
* @param y - Another 2d vector
* @param z - Another 2d vector
*/
function det3(x: number[], y: number[], z: number[]): number {
    return (x[0]*(y[1]*z[2] - y[2]*z[1])) - 
            (x[1]*(y[0]*z[2] - y[2]*z[0])) + 
            (x[2]*(y[0]*z[1] - y[1]*z[0])); 
}


/**
* Returns the result of adding two 2-vectors. This function is curried.
* @param a - A 2d vector
* @param b - Another 2d vector
*/
function translate(a: number[]): ((b: number[]) => number[]);
function translate(a: number[], b: number[]): number[];
function translate(a: number[], b?: number[]) {

    function f(b: number[]): number[] {
        return [a[0]+b[0], a[1]+b[1]];
    }

    // Curry the function
    return b === undefined ? f : f(b); 
}


/**
* Return the given 2d points translated by the given 2d vector. This 
* function is curried.
* @param v 
* @param ps 
*/
let translatePs = mapCurry2(translate);


/**
* Return the given 2d points translated by the given 2d vector. This function
* is curried.
* @param sinθ
* @param cosθ
* @param ps 
*/
let rotatePs = specialMapCurry(rotate);


/**
* Returns a rotated version of the given 2d vector given the sine and cosine 
* of the angle.
* @param sinθ
* @param cosθ
* @param p
*/
function rotate(sinθ: number, cosθ: number): (p: number[]) => number[];
function rotate(sinθ: number, cosθ: number, p: number[]): number[];
function rotate(sinθ: number, cosθ: number, p?: number[]) {

    let a = translatePs([1,2]);

    function rotateByθ(p: number[]) {
        return [
            p[0]*cosθ - p[1]*sinθ, 
            p[0]*sinθ + p[1]*cosθ
        ];
    }

    // Curry the function
    return p === undefined ? rotateByθ : rotateByθ(p); 
}


/**
* Returns true if two 2-vectors are identical (by value), false otherwise.
* @param a - A 2d vector
* @param b - Another 2d vector
*/
function equal(a: number[], b: number[]): boolean {
    return (a[0] === b[0] && a[1] === b[1]);
}


/**
* Returns a anti-clockwise rotated version of the given 2-vector given the 
* sine and cosine of the angle.
* @param p - A 2d vector
* @param sinθ
* @param cosθ
*/
function reverseRotate(sinθ: number, cosθ: number, p: number[]): number[] {
    return [
        +p[0]*cosθ + p[1]*sinθ, 
        -p[0]*sinθ + p[1]*cosθ
    ];
}


/**
* Returns a 90 degrees rotated version of the given 2-vector.
* @param p - A 2d vector
*/
function rotate90Degrees(p: number[]): number[] {
    return [-p[1], p[0]];
}


/**
* Returns a negative 90 degrees rotated version of the given 2-vector.
* @param p - A 2d vector
*/
function rotateNeg90Degrees(p: number[]): number[] {
    return [p[1], -p[0]];
}


/**
 * Returns the closest point to the array of 2d points or if the array is empty
 * returns undefined.
 * @param p
 * @param ps
 */
function getClosestTo(p: number[], ps: number[][]): number[] | undefined {
    let closestPoint = undefined; 
    let closestDistance = Number.POSITIVE_INFINITY; 
    for (let i=0; i<ps.length; i++) {
        let q = ps[i];
        
        let d = squaredDistanceBetween(p, q); 
        if (d < closestDistance) {
            closestPoint = q;
            closestDistance = d; 
        } 
    }

    return closestPoint;
}


/**
 * Returns the closest point to the array of 2d points by providing a distance 
 * function. If the given array is empty, returns undefined.
 * @param p
 * @param ps
 * @param f a function that takes the object and returns a point in order to
 * apply the Euclidian distance.
 */
function getObjClosestTo<T>(p: number[], ps: T[], f: (o: T) => number[]): T | undefined {

    let closestObj = undefined; // Closest Point
    let closestDistance = Number.POSITIVE_INFINITY; 
    for (let i=0; i<ps.length; i++) {
        let o = ps[i];
        
        let d = squaredDistanceBetween(p, f(o)); 
        if (d < closestDistance) {
            closestObj = o;
            closestDistance = d; 
        } 
    }

    return closestObj;
}


/** 
* Returns an array of points by applying a translation and then rotation to 
* the given points.
* @param v - The translation vector
* @param sinθ 
* @param cosθ
* @param ps - The input points
**/
function translateThenRotatePs(
        v: number[], 
        sinθ: number, 
        cosθ: number, 
        ps: number[][]): number[][] {

    const f = translate(v);

    return ps.map(
        p => rotate(sinθ, cosθ, f(p))
    );
}


/** 
* Returns an array of points by applying a rotation and then translation to 
* the given points.
* @param sinθ 
* @param cosθ
* @param v - The translation vector
* @param ps - The input points
**/
function rotateThenTranslatePs(
        sinθ: number, 
        cosθ: number, 
        v: number[], 
        ps: number[][]): number[][] {

    return ps.map(
        p => translate(v, rotate(sinθ, cosθ, p))
    );
}


export {
    dot,
    cross,
    //ccw,
    segSegIntersection,
    doesSegSegIntersect,
    squaredDistanceBetween,
    scale,
    reverse,
    toUnitVector,
    toLength,
    fromTo,
    interpolate,
    mean,
    distanceBetween,
    len,
    lengthSquared,
    manhattanDistanceBetween,
    manhattanLength,
    distanceBetweenPointAndLine,
    squaredDistanceBetweenPointAndLineSegment,
    circumCenter,
    inCenter,
    centroid,
    det3,
    translate,
    translatePs,
    rotatePs,
    rotate,
    equal,
    reverseRotate,
    rotate90Degrees,
    rotateNeg90Degrees,
    getClosestTo,
    translateThenRotatePs,
    rotateThenTranslatePs,
    getObjClosestTo,
    ccw,
    lineLineIntersection
}
