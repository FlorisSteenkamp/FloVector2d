import { squaredDistanceBetween } from "./distance-and-length/squared-distance-between.js";


/**
 * Returns the closest point to the array of 2d points by providing a distance 
 * function. If the given array is empty, returns undefined.
 * @param p
 * @param ps
 * @param f a function that takes the object and returns a point in order to
 * apply the Euclidian distance.
 */
function getObjClosestTo<T>(p: number[], ps: T[], f: (o: T) => number[]): T | undefined {
    let closestObj: T = undefined!; // Closest Point
    let closestDistance = Number.POSITIVE_INFINITY; 
    for (let i=0; i<ps.length; i++) {
        const o = ps[i];
        
        const d = squaredDistanceBetween(p, f(o)); 
        if (d < closestDistance) {
            closestObj = o;
            closestDistance = d; 
        } 
    }

    return closestObj;
}


export { getObjClosestTo }
