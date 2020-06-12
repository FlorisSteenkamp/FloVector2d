//==================================
// 2d vector pure functions library
//==================================

import { orient2d } from 'flo-numerical';
import { dot } from './dot';
import { cross } from './cross';
import { segSegIntersection } from './lines-and-segments/seg-seg-intersection';
import { doesSegSegIntersect } from './lines-and-segments/does-seg-seg-intersect';
import { lineLineIntersection } from './lines-and-segments/line-line-intersection';
import { translate } from './affine-transformations/translate/translate';
import { rotate } from './affine-transformations/linear/rotate';
import { scale } from './affine-transformations/linear/scale';
import { reverse } from './affine-transformations/linear/reverse';
import { reverseRotate } from './affine-transformations/linear/reverse-rotate';
import { rotate90Degrees } from './affine-transformations/linear/rotate-90-degrees';
import { rotateNeg90Degrees } from './affine-transformations/linear/rotate-neg-90-degrees';
import { transformLinear } from './affine-transformations/linear/transform-linear';
import { transformAffine } from './affine-transformations/transform-affine';
import { toUnitVector } from './distance-and-length/to-unit-vector';
import { toLength } from './distance-and-length/to-length';
import { distanceBetween } from './distance-and-length/distance-between';
import { len } from './distance-and-length/len';
import { lengthSquared } from './distance-and-length/length-squared';
import { manhattanDistanceBetween } from './distance-and-length/manhattan-distance-between';
import { manhattanLength } from './distance-and-length/manhattan-length';
import { distanceBetweenPointAndLine } from './distance-and-length/distance-between-point-and-line';
import { squaredDistanceBetweenPointAndLineSegment } from './distance-and-length/squared-distance-between-point-and-line-segment';
import { squaredDistanceBetween } from './distance-and-length/squared-distance-between';
import { circumCenter } from './triangle-centers/circum-center';
import { inCenter } from './triangle-centers/in-center';
import { centroid } from './triangle-centers/centroid';
import { det3 } from './matrix/det';


/**
 * Three 2d points are a counter-clockwise turn if ccw > 0, clockwise if 
 * ccw < 0, and colinear if ccw === 0 because ccw is a determinant that gives 
 * twice the signed area of the triangle formed by the points a, b and c.
 * * **certified**
 * @param A The first point
 * @param B The second point
 * @param C The third point
 */
const ccw = orient2d;


/** 
 * Returns the second 2-vector minus the first.
 * @param p the first vector
 * @param q the second vector
  */
function fromTo(p: number[], q: number[]): number[] {
    return [q[0] - p[0], q[1] - p[1]];
}


/**
 * Performs linear interpolation between two 2d points and returns the 
 * resulting point.
 * @param p the first point.
 * @param q the second point.
 * @param t the interpolation fraction (often in [0,1]).  
 */
function interpolate(p: number[], q: number[], t: number): number[] {
    return [
        p[0] + (q[0] - p[0])*t, 
        p[1] + (q[1] - p[1])*t
    ];
}


/**
 * Returns the mean of two 2d points. 
 * @param ps the two points
 */
function mean(ps: [number[], number[]]): number[] {
    let p = ps[0];
    let q = ps[1];

    return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
}


/**
* Returns true if two 2-vectors are identical (by value), false otherwise.
* @param a a 2d vector
* @param b another 2d vector
*/
function equal(a: number[], b: number[]): boolean {
    return (a[0] === b[0] && a[1] === b[1]);
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


export {
    dot,
    cross,
    squaredDistanceBetween,
    fromTo,
    interpolate,
    mean,
    translate,
    rotate,
    equal,
    getClosestTo,    
    getObjClosestTo,
    ccw,
    lineLineIntersection,
    segSegIntersection,
    doesSegSegIntersect,
    scale,
    reverse,
    toUnitVector,
    toLength,
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
    reverseRotate,
    rotate90Degrees,
    rotateNeg90Degrees,
    transformLinear,
    transformAffine
}

