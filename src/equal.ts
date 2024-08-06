
/**
* Returns true if two 2-vectors are identical (by value), false otherwise.
* @param a a 2d vector
* @param b another 2d vector
*/
function equal(a: number[], b: number[]): boolean {
    return (a[0] === b[0] && a[1] === b[1]);
}


export { equal }
