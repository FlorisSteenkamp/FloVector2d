/**
 * Returns the closest point to the array of 2d points by providing a distance
 * function. If the given array is empty, returns undefined.
 * @param p
 * @param ps
 * @param f a function that takes the object and returns a point in order to
 * apply the Euclidian distance.
 */
declare function getObjClosestTo<T>(p: number[], ps: T[], f: (o: T) => number[]): T | undefined;
export { getObjClosestTo };
