"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DELTA = 1e-10;
/**
 * Curry the given arity two function.
 * @param f - A function
 */
function curry2(f) {
    function g(t, u) {
        return u === undefined
            ? (u) => f(t, u)
            : f(t, u);
    }
    return g;
}
/**
* Creates a transformation function that operates on multiple points from the
* given arity two function.
* @private
*/
function mapCurry2(f) {
    function g(t, us) {
        let h = f(t);
        let hUs = (us) => us.map(h);
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
function specialMapCurry(f) {
    function g(s, t, us) {
        let h = f(s, t);
        let hUs = (us) => us.map(h);
        // Curry the function
        return us === undefined ? hUs : hUs(us);
    }
    return g;
}
/**
 * Returns the dot (inner) product between two 2-vectors.
 * @param a - The first vector
 * @param b - The second vector
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}
exports.dot = dot;
/**
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param a - The first vector
 * @param b - The second vector
 */
function cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}
exports.cross = cross;
/**
 * Three 2d points are a counter-clockwise turn if ccw > 0, clockwise if
 * ccw < 0, and colinear if ccw = 0 because ccw is a determinant that gives
 * twice the signed area of the triangle formed by p1, p2 and p3.
 * @param p1 - The first point
 * @param p2 - The second point
 * @param p3 - The third point
 * @param delta - The tolerance at which the three points are considered
 * collinear - defaults to 1e-10.
 */
function ccw(p1, p2, p3, delta = DELTA) {
    let res = (p2[0] - p1[0]) * (p3[1] - p1[1]) -
        (p2[1] - p1[1]) * (p3[0] - p1[0]);
    return Math.abs(res) <= delta ? 0 : res;
}
exports.ccw = ccw;
/**
* <p>
* Returns the point where two line segments intersect or undefined if they
* don't intersect or a line if they intersect at infinitely many points.
* </p>
* <p>
* See <a href="http://algs4.cs.princeton.edu/91primitives">Geometric primitves</a>
* </p>
* @param ab - The first line
* @param cd - The second line
* @param delta - The tolerance at which the lines are considered parallel -
* defaults to 1e-10.
*/
function segSegIntersection(ab, cd, delta = DELTA) {
    let [a, b] = ab;
    let [c, d] = cd;
    let denom = (b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]);
    let rNumer = (a[1] - c[1]) * (d[0] - c[0]) - (a[0] - c[0]) * (d[1] - c[1]);
    let sNumer = (a[1] - c[1]) * (b[0] - a[0]) - (a[0] - c[0]) * (b[1] - a[1]);
    if (Math.abs(denom) <= delta) {
        // parallel
        if (Math.abs(rNumer) <= delta) {
            // colinear
            // TODO Check if x-projections and y-projections intersect
            // and return the line of intersection if they do.
            return undefined;
        }
        return undefined;
    }
    let r = rNumer / denom;
    let s = sNumer / denom;
    if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
        return [a[0] + r * (b[0] - a[0]), a[1] + r * (b[1] - a[1])];
    }
    return undefined;
}
exports.segSegIntersection = segSegIntersection;
/**
* Returns true if the two given 2d line segments intersect, false otherwise.
* @param a - A line segment
* @param b - Another line segment
*/
function doesSegSegIntersect(a, b) {
    if ((ccw(a[0], a[1], b[0]) * ccw(a[0], a[1], b[1])) > 0) {
        return false;
    }
    else if ((ccw(b[0], b[1], a[0]) * ccw(b[0], b[1], a[1])) > 0) {
        return false;
    }
    return true;
}
exports.doesSegSegIntersect = doesSegSegIntersect;
/**
* Returns the squared distance between two 2d points.
* @param p1 - A point
* @param p2 - Another point
*/
function squaredDistanceBetween(p1, p2) {
    let x = p2[0] - p1[0];
    let y = p2[1] - p1[1];
    return x * x + y * y;
}
exports.squaredDistanceBetween = squaredDistanceBetween;
/**
* Returns a scaled version of the given 2-vector.
* @param p - A vector
* @param factor - A scale factor
*/
function scale(p, factor) {
    return [p[0] * factor, p[1] * factor];
}
exports.scale = scale;
/**
* Returns the given 2-vector reversed.
* @param p - A vector
*/
function reverse(p) {
    return [-p[0], -p[1]];
}
exports.reverse = reverse;
/**
* Returns the given 2-vector scaled to a length of one.
* @param p - A vector
*/
function toUnitVector(p) {
    let scaleFactor = 1 / len(p);
    return [p[0] * scaleFactor, p[1] * scaleFactor];
}
exports.toUnitVector = toUnitVector;
/**
* Returns the given 2-vector scaled to the given length.
* @param p - A vector
* @param length - The length to scale to
*/
function toLength(p, length) {
    let scaleFactor = length / len(p);
    return [p[0] * scaleFactor, p[1] * scaleFactor];
}
exports.toLength = toLength;
/**
* Returns the second 2-vector minus the first.
* @param p1 - The first vector
* @param p2 - The second vector
*/
function fromTo(p1, p2) {
    return [p2[0] - p1[0], p2[1] - p1[1]];
}
exports.fromTo = fromTo;
/**
* Performs linear interpolation between two 2d points and returns the resultant point.
* @param p1 - The first point.
* @param p2 - The second point.
* @param t - The interpolation fraction (often in [0,1]).
*/
function interpolate(p1, p2, t) {
    return [
        p1[0] + (p2[0] - p1[0]) * t,
        p1[1] + (p2[1] - p1[1]) * t
    ];
}
exports.interpolate = interpolate;
/**
* Returns the mean of two 2d points.
* @param ps - The two points
*/
function mean(ps) {
    let p1 = ps[0];
    let p2 = ps[1];
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}
exports.mean = mean;
/**
* Returns the distance between two 2d points.
* @param p1 - A point.
* @param p2 - Another point.
*/
function distanceBetween(p1, p2) {
    return Math.sqrt(squaredDistanceBetween(p1, p2));
}
exports.distanceBetween = distanceBetween;
/**
* Returns the length of the given 2-vector.
* @param p - A vector
*/
function len(p) {
    return Math.sqrt((p[0] * p[0]) + (p[1] * p[1]));
}
exports.len = len;
/**
* Returns the squared length of the given 2-vector.
* @param p - A vector
*/
function lengthSquared(v) {
    return v[0] * v[0] + v[1] * v[1];
}
exports.lengthSquared = lengthSquared;
/**
* Returns the Manhattan distance between two 2d points.
* @param p1 - A point.
* @param p2 - Another point.
*/
function manhattanDistanceBetween(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}
exports.manhattanDistanceBetween = manhattanDistanceBetween;
/**
* Returns the Manhattan length of the given 2-vector.
* @param p - A vector
*/
function manhattanLength(p) {
    return Math.abs(p[0]) + Math.abs(p[1]);
}
exports.manhattanLength = manhattanLength;
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
function distanceBetweenPointAndLine(p, l) {
    let [x0, y0] = p;
    let [[x1, y1], [x2, y2]] = l;
    let y = y2 - y1;
    let x = x2 - x1;
    let a = (y * x0 - x * y0 + x2 * y1 - y2 * x1);
    let b = Math.sqrt(x * x + y * y);
    return Math.abs(a / b);
}
exports.distanceBetweenPointAndLine = distanceBetweenPointAndLine;
/**
* Returns the squared distance between the given point and line segment.
* @param p - A point
* @param l - A line
*/
function squaredDistanceBetweenPointAndLineSegment(p, l) {
    const sqDst = squaredDistanceBetween;
    let v = l[0];
    let w = l[1];
    let l2 = sqDst(v, w);
    if (l2 == 0) {
        return sqDst(p, v);
    }
    let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    let d2 = sqDst(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
    return d2;
}
exports.squaredDistanceBetweenPointAndLineSegment = squaredDistanceBetweenPointAndLineSegment;
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
    let b = det3([p1[0], p1[1], sqLen(p1)], [p2[0], p2[1], sqLen(p2)], [p3[0], p3[1], sqLen(p3)]);
    return [Sx / a, Sy / a];
}
exports.circumCenter = circumCenter;
/**
* <p>
* Returns the incenter of the given triangle.
* </p>
* <p>
* See Wikipedia - https://en.wikipedia.org/wiki/Incenter
* </p>
* @param triangle
*/
function inCenter(triangle) {
    const dst = distanceBetween;
    let p1 = triangle[0];
    let p2 = triangle[1];
    let p3 = triangle[2];
    let l1 = dst(p2, p3);
    let l2 = dst(p1, p3);
    let l3 = dst(p1, p2);
    let lengthSum = l1 + l2 + l3;
    return [
        (l1 * p1[0] + l2 * p2[0] + l3 * p3[0]) / lengthSum,
        (l1 * p1[1] + l2 * p2[1] + l3 * p3[1]) / lengthSum
    ];
}
exports.inCenter = inCenter;
/**
* Returns the centroid of the given polygon, e.g. triangle. The polygon
* must be simple, i.e. not self-intersecting.
* @param polygon
*/
function centroid(polygon) {
    if (polygon.length === 3) {
        let p1 = polygon[0];
        let p2 = polygon[1];
        let p3 = polygon[2];
        let x = p1[0] + p2[0] + p3[0];
        let y = p1[1] + p2[1] + p3[1];
        return [x / 3, y / 3];
    }
    // polygon.length assumed > 3 and assumed to be non-self-intersecting
    // See wikipedia
    // First calculate the area, A, of the polygon
    let A = 0;
    for (let i = 0; i < polygon.length; i++) {
        let p0 = polygon[i];
        let p1 = (i === polygon.length - 1)
            ? polygon[0]
            : polygon[i + 1];
        A = A + (p0[0] * p1[1] - p1[0] * p0[1]);
    }
    A = A / 2;
    let C = [0, 0];
    for (let i = 0; i < polygon.length; i++) {
        let p0 = polygon[i];
        let p1 = (i === polygon.length - 1)
            ? polygon[0]
            : polygon[i + 1];
        C[0] = C[0] + (p0[0] + p1[0]) * (p0[0] * p1[1] - p1[0] * p0[1]);
        C[1] = C[1] + (p0[1] + p1[1]) * (p0[0] * p1[1] - p1[0] * p0[1]);
    }
    return [C[0] / (6 * A), C[1] / (6 * A)];
}
exports.centroid = centroid;
/**
* Calculate the determinant of three 3d vectors, i.e. 3x3 matrix
* @ignore
* @param x - A 2d vector
* @param y - Another 2d vector
* @param z - Another 2d vector
*/
function det3(x, y, z) {
    return (x[0] * (y[1] * z[2] - y[2] * z[1])) -
        (x[1] * (y[0] * z[2] - y[2] * z[0])) +
        (x[2] * (y[0] * z[1] - y[1] * z[0]));
}
exports.det3 = det3;
function translate(a, b) {
    function f(b) {
        return [a[0] + b[0], a[1] + b[1]];
    }
    // Curry the function
    return b === undefined ? f : f(b);
}
exports.translate = translate;
/**
* Return the given 2d points translated by the given 2d vector. This
* function is curried.
* @param v
* @param ps
*/
let translatePs = mapCurry2(translate);
exports.translatePs = translatePs;
/**
* Return the given 2d points translated by the given 2d vector. This function
* is curried.
* @param sinθ
* @param cosθ
* @param ps
*/
let rotatePs = specialMapCurry(rotate);
exports.rotatePs = rotatePs;
function rotate(sinθ, cosθ, p) {
    let a = translatePs([1, 2]);
    function rotateByθ(p) {
        return [
            p[0] * cosθ - p[1] * sinθ,
            p[0] * sinθ + p[1] * cosθ
        ];
    }
    // Curry the function
    return p === undefined ? rotateByθ : rotateByθ(p);
}
exports.rotate = rotate;
/**
* Returns true if two 2-vectors are identical (by value), false otherwise.
* @param a - A 2d vector
* @param b - Another 2d vector
*/
function equal(a, b) {
    return (a[0] === b[0] && a[1] === b[1]);
}
exports.equal = equal;
/**
* Returns a anti-clockwise rotated version of the given 2-vector given the
* sine and cosine of the angle.
* @param p - A 2d vector
* @param sinθ
* @param cosθ
*/
function reverseRotate(sinθ, cosθ, p) {
    return [
        +p[0] * cosθ + p[1] * sinθ,
        -p[0] * sinθ + p[1] * cosθ
    ];
}
exports.reverseRotate = reverseRotate;
/**
* Returns a 90 degrees rotated version of the given 2-vector.
* @param p - A 2d vector
*/
function rotate90Degrees(p) {
    return [-p[1], p[0]];
}
exports.rotate90Degrees = rotate90Degrees;
/**
* Returns a negative 90 degrees rotated version of the given 2-vector.
* @param p - A 2d vector
*/
function rotateNeg90Degrees(p) {
    return [p[1], -p[0]];
}
exports.rotateNeg90Degrees = rotateNeg90Degrees;
/**
* Transforms the given 2-vector by applying the given function to each
* coordinate.
* @param p - A 2d vector
* @param f - A transformation function
*/
function transform(p, f) {
    return [f(p[0]), f(p[1])];
}
exports.transform = transform;
/**
* Returns the closest point to the array of 2d points, optionally providing
* a distance function.
* @param p
* @param ps
* @param f - Optional distance function - defaults to
* squaredDistanceBetween.
*/
function getClosestTo(p, ps) {
    let closestPoint = undefined;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < ps.length; i++) {
        let q = ps[i];
        let d = squaredDistanceBetween(p, q);
        if (d < closestDistance) {
            closestPoint = q;
            closestDistance = d;
        }
    }
    return closestPoint;
}
exports.getClosestTo = getClosestTo;
/**
* Returns the closest point to the array of 2d points, optionally providing
* a distance function.
* @param p
* @param ps
* @param f - Optional distance function - defaults to
* squaredDistanceBetween.
*/
function getObjClosestTo(p, ps, f) {
    let closestObj = undefined; // Closest Point
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < ps.length; i++) {
        let o = ps[i];
        let d = squaredDistanceBetween(p, f(o));
        if (d < closestDistance) {
            closestObj = o;
            closestDistance = d;
        }
    }
    return closestObj;
}
exports.getObjClosestTo = getObjClosestTo;
/**
* Returns an array of points by applying a translation and then rotation to
* the given points.
* @param v - The translation vector
* @param sinθ
* @param cosθ
* @param ps - The input points
**/
function translateThenRotatePs(v, sinθ, cosθ, ps) {
    const f = translate(v);
    return ps.map(p => rotate(sinθ, cosθ, f(p)));
}
exports.translateThenRotatePs = translateThenRotatePs;
/**
* Returns an array of points by applying a rotation and then translation to
* the given points.
* @param sinθ
* @param cosθ
* @param v - The translation vector
* @param ps - The input points
**/
function rotateThenTranslatePs(sinθ, cosθ, v, ps) {
    return ps.map(p => translate(v, rotate(sinθ, cosθ, p)));
}
exports.rotateThenTranslatePs = rotateThenTranslatePs;
;
//export  Vector2d;