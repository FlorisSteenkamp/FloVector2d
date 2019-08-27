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
 * Returns the dot (inner) product between two 2-vectors.
 * @param a the first vector
 * @param b the second vector
 */
declare function dot(a: number[], b: number[]): number;
/**
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param a - The first vector
 * @param b - The second vector
 */
declare function cross(a: number[], b: number[]): number;
/**
 * Three 2d points are a counter-clockwise turn if ccw > 0, clockwise if
 * ccw < 0, and colinear if ccw === 0 because ccw is a determinant that gives
 * twice the signed area of the triangle formed by the points a, b and c.
 * @param a The first point
 * @param b The second point
 * @param c The third point
 */
declare function ccw(a: number[], b: number[], c: number[]): number;
/**
* Returns the point where two line segments intersect or undefined if they
* don't intersect or if they intersect at infinitely many points.
* See Geometric primitves http://algs4.cs.princeton.edu/91primitives
* @param ab The first line
* @param cd The second line
*/
declare function segSegIntersection(ab: number[][], cd: number[][]): number[] | undefined;
/**
 * Returns true if the two given 2d line segments intersect, false otherwise.
 *
 * Robust: uses exact adaptive floating point arithmetic.
 *
 * @param a A line segment
 * @param b Another line segment
 */
declare function doesSegSegIntersect(a: number[][], b: number[][]): boolean;
/**
* Returns the squared distance between two 2d points.
* @param p1 A point
* @param p2 Another point
*/
declare function squaredDistanceBetween(p1: number[], p2: number[]): number;
/**
* Returns a scaled version of the given 2-vector.
* @param p - A vector
* @param factor - A scale factor
*/
declare function scale(p: number[], factor: number): number[];
/**
* Returns the given 2-vector reversed.
* @param p - A vector
*/
declare function reverse(p: number[]): number[];
/**
* Returns the given 2-vector scaled to a length of one.
* @param p - A vector
*/
declare function toUnitVector(p: number[]): number[];
/**
* Returns the given 2-vector scaled to the given length.
* @param p - A vector
* @param length - The length to scale to
*/
declare function toLength(p: number[], length: number): number[];
/**
* Returns the second 2-vector minus the first.
* @param p1 - The first vector
* @param p2 - The second vector
*/
declare function fromTo(p1: number[], p2: number[]): number[];
/**
* Performs linear interpolation between two 2d points and returns the resultant point.
* @param p1 - The first point.
* @param p2 - The second point.
* @param t - The interpolation fraction (often in [0,1]).
*/
declare function interpolate(p1: number[], p2: number[], t: number): number[];
/**
* Returns the mean of two 2d points.
* @param ps - The two points
*/
declare function mean(ps: [number[], number[]]): number[];
/**
* Returns the distance between two 2d points.
* @param p1 - A point.
* @param p2 - Another point.
*/
declare function distanceBetween(p1: number[], p2: number[]): number;
/**
* Returns the length of the given 2-vector.
* @param p - A vector
*/
declare function len(p: number[]): number;
/**
* Returns the squared length of the given 2-vector.
* @param p - A vector
*/
declare function lengthSquared(v: number[]): number;
/**
* Returns the Manhattan distance between two 2d points.
* @param p1 - A point.
* @param p2 - Another point.
*/
declare function manhattanDistanceBetween(p1: number[], p2: number[]): number;
/**
* Returns the Manhattan length of the given 2-vector.
* @param p - A vector
*/
declare function manhattanLength(p: number[]): number;
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
declare function distanceBetweenPointAndLine(p: number[], l: number[][]): number;
/**
* Returns the squared distance between the given point and line segment.
* @param p - A point
* @param l - A line
*/
declare function squaredDistanceBetweenPointAndLineSegment(p: number[], l: number[][]): number;
/**
* Returns the circumcenter of the given 2d triangle.
* @param triangle
*/
declare function circumCenter(triangle: number[][]): number[];
/**
* <p>
* Returns the incenter of the given triangle.
* </p>
* <p>
* See Wikipedia - https://en.wikipedia.org/wiki/Incenter
* </p>
* @param triangle
*/
declare function inCenter(triangle: number[][]): number[];
/**
* Returns the centroid of the given polygon, e.g. triangle. The polygon
* must be simple, i.e. not self-intersecting.
* @param polygon
*/
declare function centroid(polygon: number[][]): number[];
/**
* Calculate the determinant of three 3d vectors, i.e. 3x3 matrix
* @ignore
* @param x - A 2d vector
* @param y - Another 2d vector
* @param z - Another 2d vector
*/
declare function det3(x: number[], y: number[], z: number[]): number;
/**
* Returns the result of adding two 2-vectors. This function is curried.
* @param a - A 2d vector
* @param b - Another 2d vector
*/
declare function translate(a: number[]): ((b: number[]) => number[]);
declare function translate(a: number[], b: number[]): number[];
/**
* Return the given 2d points translated by the given 2d vector. This
* function is curried.
* @param v
* @param ps
*/
declare let translatePs: ICurriedMapFunction2<number[], number[], number[]>;
/**
* Return the given 2d points translated by the given 2d vector. This function
* is curried.
* @param sinθ
* @param cosθ
* @param ps
*/
declare let rotatePs: ICurriedMapFunctionSpecial<number, number, number[], number[]>;
/**
* Returns a rotated version of the given 2d vector given the sine and cosine
* of the angle.
* @param sinθ
* @param cosθ
* @param p
*/
declare function rotate(sinθ: number, cosθ: number): (p: number[]) => number[];
declare function rotate(sinθ: number, cosθ: number, p: number[]): number[];
/**
* Returns true if two 2-vectors are identical (by value), false otherwise.
* @param a - A 2d vector
* @param b - Another 2d vector
*/
declare function equal(a: number[], b: number[]): boolean;
/**
* Returns a anti-clockwise rotated version of the given 2-vector given the
* sine and cosine of the angle.
* @param p - A 2d vector
* @param sinθ
* @param cosθ
*/
declare function reverseRotate(sinθ: number, cosθ: number, p: number[]): number[];
/**
* Returns a 90 degrees rotated version of the given 2-vector.
* @param p - A 2d vector
*/
declare function rotate90Degrees(p: number[]): number[];
/**
* Returns a negative 90 degrees rotated version of the given 2-vector.
* @param p - A 2d vector
*/
declare function rotateNeg90Degrees(p: number[]): number[];
/**
 * Returns the closest point to the array of 2d points or if the array is empty
 * returns undefined.
 * @param p
 * @param ps
 */
declare function getClosestTo(p: number[], ps: number[][]): number[] | undefined;
/**
 * Returns the closest point to the array of 2d points by providing a distance
 * function. If the given array is empty, returns undefined.
 * @param p
 * @param ps
 * @param f a function that takes the object and returns a point in order to
 * apply the Euclidian distance.
 */
declare function getObjClosestTo<T>(p: number[], ps: T[], f: (o: T) => number[]): T | undefined;
/**
* Returns an array of points by applying a translation and then rotation to
* the given points.
* @param v - The translation vector
* @param sinθ
* @param cosθ
* @param ps - The input points
**/
declare function translateThenRotatePs(v: number[], sinθ: number, cosθ: number, ps: number[][]): number[][];
/**
* Returns an array of points by applying a rotation and then translation to
* the given points.
* @param sinθ
* @param cosθ
* @param v - The translation vector
* @param ps - The input points
**/
declare function rotateThenTranslatePs(sinθ: number, cosθ: number, v: number[], ps: number[][]): number[][];
export { dot, cross, segSegIntersection, doesSegSegIntersect, squaredDistanceBetween, scale, reverse, toUnitVector, toLength, fromTo, interpolate, mean, distanceBetween, len, lengthSquared, manhattanDistanceBetween, manhattanLength, distanceBetweenPointAndLine, squaredDistanceBetweenPointAndLineSegment, circumCenter, inCenter, centroid, det3, translate, translatePs, rotatePs, rotate, equal, reverseRotate, rotate90Degrees, rotateNeg90Degrees, getClosestTo, translateThenRotatePs, rotateThenTranslatePs, getObjClosestTo, ccw };
