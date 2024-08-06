
/** 
 * Returns the second 2-vector minus the first.
 * @param p the first vector
 * @param q the second vector
  */
function fromTo(p: number[], q: number[]): number[] {
    return [q[0] - p[0], q[1] - p[1]];
}


export { fromTo }
