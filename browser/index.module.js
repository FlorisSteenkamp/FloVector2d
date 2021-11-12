/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "oH": () => (/* binding */ ccw),
  "Sc": () => (/* reexport */ centroid),
  "pb": () => (/* reexport */ circumCenter),
  "kC": () => (/* reexport */ cross),
  "Ph": () => (/* reexport */ det3),
  "qw": () => (/* reexport */ distanceBetween),
  "PI": () => (/* reexport */ distanceBetweenPointAndLine),
  "tl": () => (/* reexport */ doesSegSegIntersect),
  "AK": () => (/* reexport */ dot),
  "Dg": () => (/* binding */ equal),
  "JQ": () => (/* binding */ fromTo),
  "Gk": () => (/* binding */ getClosestTo),
  "AY": () => (/* binding */ getObjClosestTo),
  "un": () => (/* reexport */ inCenter),
  "sX": () => (/* binding */ interpolate),
  "Zh": () => (/* reexport */ len),
  "YH": () => (/* reexport */ lengthSquared),
  "QG": () => (/* reexport */ lineLineIntersection),
  "_r": () => (/* reexport */ manhattanDistanceBetween),
  "Tp": () => (/* reexport */ manhattanLength),
  "J6": () => (/* binding */ mean),
  "GY": () => (/* reexport */ reverse),
  "ay": () => (/* reexport */ reverseRotate),
  "U1": () => (/* reexport */ rotate),
  "$z": () => (/* reexport */ rotate90Degrees),
  "UF": () => (/* reexport */ rotateNeg90Degrees),
  "bA": () => (/* reexport */ scale),
  "NW": () => (/* reexport */ segSegIntersection),
  "Pz": () => (/* reexport */ squaredDistanceBetween),
  "$6": () => (/* reexport */ squaredDistanceBetweenPointAndLineSegment),
  "Hg": () => (/* reexport */ toLength),
  "wP": () => (/* reexport */ toUnitVector),
  "cm": () => (/* reexport */ transformAffine),
  "Zb": () => (/* reexport */ transformLinear),
  "Iu": () => (/* reexport */ translate)
});

;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-sign.js
/**
 * Returns the sign of the given expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * From Shewchuk: "A nonoverlapping expansion is desirable because it is easy to
 * determine its sign (take the sign of the largest component) ... "
 *
 * @param e A floating point expansion with zeroes eliminated.
 */
function e_sign_eSign(e) {
    return e[e.length - 1];
}

//# sourceMappingURL=e-sign.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/double-to-octets.js
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)
/**
 * Returns the ieee-574 8 bytes composing the given double, starting from the
 * sign bit and ending in the lsb of the significand.
 * e.g. 123.456 -> [64, 94, 221, 47, 26, 159, 190, 119]
 */
function doubleToOctets(number) {
    var buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return Array.from(new Uint8Array(buffer));
}

//# sourceMappingURL=double-to-octets.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/double-to-binary-string.js
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)

function doubleToBinaryString(number) {
    return octetsToBinaryString(doubleToOctets(number));
}
/**
 * @param octets The 8 bytes composing a double (msb first)
 */
function octetsToBinaryString(octets) {
    return octets
        .map(int8ToBinaryString)
        .join('');
}
/**
 * intToBinaryString(8) -> "00001000"
 */
function int8ToBinaryString(i) {
    let iStr = i.toString(2);
    for (; iStr.length < 8; iStr = "0" + iStr)
        ;
    return iStr;
}

//# sourceMappingURL=double-to-binary-string.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/parse-double.js
// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)


/**
 * Returns the relevant parts of the given IEEE-754 double. The returned
 * exponent has been normalized (i.e. 1023 ha been subtracted) and the
 * significand has the hidden bit added if appropriate.
 * See https://github.com/bartaz/ieee754-visualization
 */
function parseDouble(x) {
    let parts = doubleToOctets(x);
    let p0 = parts[0];
    let p1 = parts[1];
    let sign = p0 >> 7;
    let exponent_ = ((p0 & 127) << 4) + ((p1 & 0b11110000) >> 4);
    //---- Check for negative / positive zero / denormalized numbers.
    let hiddenMsb = exponent_ === 0 ? 0 : 16;
    // Note: exponent === 0 => 0 or denormalized number (a.k.a. subnormal number).
    let exponent = exponent_ === 0
        ? exponent_ - 1022 // Subnormals use a biased exponent of 1 (not 0!)
        : exponent_ - 1023;
    //---- Break up the significand into bytes
    let significand = parts.slice(1);
    significand[0] = (p1 & 15) + hiddenMsb;
    return {
        sign,
        exponent,
        significand
    };
}
/**
 * Returns the relevant parts of the given IEEE-754 double.
 * See https://github.com/bartaz/ieee754-visualization.
 * This is a slower version of parseDouble that gives binary string
 * representations of the components.
 */
function parseDoubleDetailed(x) {
    let str = doubleToBinaryString(x);
    // sign{1} exponent{11} fraction{52} === 64 bits (+1 hidden!)
    let [, sign, exponent, significand] = str.match(/^(.)(.{11})(.{52})$/);
    let exponent_ = parseInt(exponent, 2);
    let hidden = exponent_ === 0 ? "0" : "1";
    return {
        full: sign + exponent + hidden + significand,
        sign,
        exponent,
        hidden,
        significand
    };
}

//# sourceMappingURL=parse-double.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/significand.js

/**
 * Return the significand of the given double with the hidden bit added (in case
 * a is not subnormal or 0, etc.)
 * @param a A double
 */
function significand(a) {
    return parseDouble(a).significand;
}

//# sourceMappingURL=significand.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/get-max-set-bit.js

/**
 * Returns the lowest set bit of the given value in [1, (2**31)-1],
 * i.e. from 1 up to 2147483647 else if no bit is set (input === 0) returns
 * NaN, otherwise if the number is out of range returns a non-finite
 * number.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit_(a) {
    return Math.log2(a & -a);
}
/**
 * Returns the lowest set bit of the given number's significand (where the lsb
 * is bit 0 and the msb is bit 52). If no bit is set (input === 0 or +-inf or
 * NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getLowestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // Note: the significand includes the hidden bit!
    let s = significand(a);
    let len = s.length;
    for (let i = len - 1; i >= 0; i--) {
        if (s[i] === 0) {
            continue;
        }
        let l = getLowestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}
/**
 * Returns the highest set bit of the given value in [1, 255], i.e. from 1 up
 * to 255. If the input number === 0 returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit_(a) {
    return a >= 128 ? 7
        : a >= 64 ? 6
            : a >= 32 ? 5
                : a >= 16 ? 4
                    : a >= 8 ? 3
                        : a >= 4 ? 2
                            : a >= 2 ? 1
                                : a >= 1 ? 0
                                    : NaN;
}
/**
 * Returns the highest set bit of the given double. If no bit is set (input
 * === 0 or +/-inf or NaN) returns NaN.
 * See https://stackoverflow.com/a/35190288/2010061
 */
function getHighestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
        // There is no lowest set bit
        return NaN;
    }
    // At this point there must be a highest set bit (always === 52 if the 
    // number is not a subnormal.
    let s = significand(a);
    let len = s.length;
    for (let i = 0; i < len; i++) {
        let l = getHighestSetBit_(s[i]);
        if (Number.isFinite(l)) {
            return (8 * (len - i - 1)) + l;
        }
    }
    return NaN;
}

//# sourceMappingURL=get-max-set-bit.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/exponent.js

/**
 * Returns the normalized exponent of the given number.
 * @param a A double
 */
function exponent(a) {
    return parseDouble(a).exponent;
}

//# sourceMappingURL=exponent.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/msb-exponent.js


/**
 * Returns the true exponent of the msb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    let e = exponent(a);
    // Will return e for all but subnormal numbers
    return getHighestSetBit(a) - 52 + e;
}

//# sourceMappingURL=msb-exponent.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-compress.js
/**
 * Returns the result of compressing the given floating point expansion.
 *
 * * primarily for internal library use
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 23 (Shewchuck): Let e = sum_(i=1)^m(e_i) be a nonoverlapping
 * expansion of m p-bit components, where m >= 3. Suppose that the components of
 * e are sorted in order of increasing magnitude, except that any of the e_i may
 * be zero. Then the following algorithm will produce a nonoverlapping expansion
 * (nonadjacent if round-to even tiebreaking is used) such that
 * h = sum_(i=1)^n(h_i) = e, where the components h_i are in order of increasing
 * magnitude. If h != 0, none of the h_i will be zero. Furthermore, the largest
 * component h_n approximates h with an error smaller than ulp(h_n).
 */
function e_compress_eCompress(e) {
    //return e;
    const e_ = e.slice();
    const m = e_.length;
    if (m === 1) {
        return e_;
    }
    let Q = e_[m - 1];
    let bottom = m;
    for (let i = m - 2; i >= 0; --i) {
        const a = Q;
        const b = e_[i];
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[--bottom] = Q;
            Q = q;
        }
    }
    let top = 0;
    for (let i = bottom; i < m; ++i) {
        const a = e_[i];
        const b = Q;
        Q = a + b;
        const bv = Q - a;
        const q = b - bv;
        if (q) {
            e_[top++] = q;
        }
    }
    e_[top++] = Q;
    e_.length = top;
    return e_;
}

//# sourceMappingURL=e-compress.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/reduce-significand.js
/**
 * Truncates a floating point value's significand and returns the result.
 * Similar to split, but with the ability to specify the number of bits to keep.
 *
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the
 * following algorithm will produce a (p-s)-bit value a_hi and a
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param a a double
 * @param bits the number of significand bits to leave intact
 */
function reduceSignificand(a, bits) {
    const s = 53 - bits;
    const f = 2 ** s + 1;
    const c = f * a;
    const r = c - (c - a);
    return r;
}

//# sourceMappingURL=reduce-significand.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-to-bitlength.js




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const sign = e_sign_eSign;
const compress = e_compress_eCompress;
/**
 * Returns a floating point expansion accurate to the given number of bits.
 * Extraneous bits are discarded.
 * @param a a floating point expansion
 * @param l the number of accurate bits to keep
 */
// TODO - make faster
function eToBitlength(a, l) {
    a = compress(a);
    if (sign(a) === 0) {
        return [0];
    }
    let maxMsb = msbExponent(a[a.length - 1]);
    let msb = maxMsb;
    let i = a.length - 1; // start at most significant byte
    while (i > 0) {
        let msb_ = msbExponent(a[i - 1]);
        if (maxMsb - msb_ > l) {
            break;
        }
        msb = msb_;
        i--;
    }
    let keepBits = Math.min(l - (maxMsb - msb), 53);
    let b = a[i];
    b = reduceSignificand(b, keepBits);
    let result = a.slice(i);
    result[0] = b;
    return result;
}

//# sourceMappingURL=e-to-bitlength.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-estimate.js
/**
 * Returns the result of the given floating point expansion rounded to a double
 * floating point number.
 *
 * The result is within 1 ulps of the actual value, e.g. imagine the worst case
 * situation where we add (in 4dot4) 1111.1000 + 0.000011111111... The result
 * will be 1111.1000 whereas as the correct result should be 1111.1001 and we
 * thus lost 1 ulp of accuracy. It does not matter that the expansion contain
 * several floats since none is overlapping.
 *
 * See Shewchuk https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * @param e a floating point expansion
 */
function eEstimate(e) {
    let Q = e[0];
    for (let i = 1; i < e.length; i++) {
        Q += e[i];
    }
    return Q;
}

//# sourceMappingURL=e-estimate.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/fast-expansion-sum.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const fast_expansion_sum_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Returns the result of adding two expansions.
 *
 * Theorem 13: Let e = sum_(i=1)^m(e_i) and f = sum_(i=1)^n(f_i) be strongly
 * nonoverlapping expansions of m and n p-bit components, respectively, where
 * p >= 4. Suppose that the components of both e and f are sorted in order of
 * increasing magnitude, except that any of the e_i or f_i may be zero. On a
 * machine whose arithmetic uses the round-to-even rule, the following algorithm
 * will produce a strongly nonoverlapping expansion h such that
 * sum_(i=1)^(m+n)(e_i + f_i) = e + f, where the components of h are also in
 * order of increasing magnitude, except that any of the h_i may be zero.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastExpansionSum(e, f) {
    //const g = merge(e,f);
    // inlined (above line)
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const g = [];
    while (i < lenE && j < lenF) {
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            g.push(e[i]);
            i++;
        }
        else {
            g.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        g.push(e[i]);
        i++;
    }
    while (j < lenF) {
        g.push(f[j]);
        j++;
    }
    if (g.length === 0) {
        return [0];
    }
    // end inlined
    const len = g.length;
    if (len === 1) {
        return g;
    }
    //const h: number[] = new Array(len);
    const h = [];
    //const q: number;
    //[h[0], q] = fastTwoSum(g[1], g[0]);
    // inlined (above line)
    const a = g[1];
    const b = g[0];
    let q = a + b;
    //h[0] = b - (q - a);
    const hh = b - (q - a);
    if (hh !== 0) {
        h.push(hh);
    }
    ;
    //let j = 0;
    j = 0;
    for (let i = 2; i < len; i++) {
        //[h[i-1], q] = twoSum(q, g[i]);
        // inlined (above line)
        const b = g[i];
        const R = q + b;
        const _ = R - q;
        //h[i-1] = (q - (R - _)) + (b - _);
        const hh = (q - (R - _)) + (b - _);
        if (hh !== 0) {
            h.push(hh);
        }
        q = R;
    }
    //h[len-1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}
/**
 * Returns the result of merging an expansion e and f into a single expansion,
 * in order of nondecreasing magnitude (possibly with interspersed zeros).
 * (This function is zero-eliminating)
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function merge(e, f) {
    const lenE = e.length;
    const lenF = f.length;
    let i = 0;
    let j = 0;
    const merged = [];
    while (i < lenE && j < lenF) {
        if (e[i] === 0) {
            i++;
            continue;
        }
        if (f[j] === 0) {
            j++;
            continue;
        }
        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            merged.push(e[i]);
            i++;
        }
        else {
            merged.push(f[j]);
            j++;
        }
    }
    while (i < lenE) {
        merged.push(e[i]);
        i++;
    }
    while (j < lenF) {
        merged.push(f[j]);
        j++;
    }
    if (merged.length === 0) {
        return [0];
    }
    return merged;
}

//# sourceMappingURL=fast-expansion-sum.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/scale-expansion.js




const f = 134217729; // 2**27 + 1;
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const tp = (/* unused pure expression or super */ null && (twoProduct));
const ts = (/* unused pure expression or super */ null && (twoSum));
const fts = (/* unused pure expression or super */ null && (fastTwoSum));
const scale_expansion_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion(e, b) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    ;
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}
/**
 * Returns the result of multiplying an expansion by a double.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Theorem 19 (Shwechuk): Let e = sum_(i=1)^m(e_i) be a nonoverlapping expansion
 * of m p-bit components, and const b be a p-bit value where p >= 4. Suppose that
 * the components of e are sorted in order of increasing magnitude, except that
 * any of the e_i may be zero. Then the following algorithm will produce a
 * nonoverlapping expansion h such that h = sum_(i=1)^(2m)(h_i) = be, where the
 * components of h are also in order of increasing magnitude, except that any of
 * the h_i may be zero. Furthermore, if e is nonadjacent and round-to-even
 * tiebreaking is used, then h is non-adjacent.
 *
 * @param e a double floating point expansion
 * @param b a double
 */
function scaleExpansion2(b, e) {
    const m = e.length;
    //const h: number[] = new Array(2*m);
    let q_;
    //[h[0], q] = tp(e[0], b);
    // inlined (above line)
    const a = e[0];
    let q = a * b;
    const c = f * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d = f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const h = [];
    //h[0] = (al*bl) - ((q - (ah*bh)) - (al*bh) - (ah*bl));
    const hh = (al * bl) - ((q - (ah * bh)) - (al * bh) - (ah * bl));
    if (hh !== 0) {
        h.push(hh);
    }
    ;
    for (let i = 1; i < m; i++) {
        //const [t, T] = tp(e[i], b);
        // inlined (above line)
        const a = e[i];
        const T = a * b;
        const c = f * a;
        const ah = c - (c - a);
        const al = a - ah;
        const d = f * b;
        const bh = d - (d - b);
        const bl = b - bh;
        const t = (al * bl) - ((T - (ah * bh)) - (al * bh) - (ah * bl));
        //[h[2*i-1], q_] = ts(q, t);
        // inlined (above line)
        const x = q + t;
        const bv = x - q;
        //h[2*i-1] = (q - (x - bv)) + (t - bv);
        //h.push((q - (x - bv)) + (t - bv));
        const hh = (q - (x - bv)) + (t - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q_ = x;
        //[h[2*i], q] = fts(T, q_);
        // inlined (above line)
        const xx = T + q_;
        //h[2*i] = q_ - (xx - T);
        //h.push(q_ - (xx - T));
        const hhh = q_ - (xx - T);
        if (hhh !== 0) {
            h.push(hhh);
        }
        q = xx;
    }
    //h[2*m - 1] = q;
    //h.push(q);
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return eCompress(h);
    return h;
}

//# sourceMappingURL=scale-expansion.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/expansion-product.js



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const multByDouble = scaleExpansion;
const add = fastExpansionSum;
const expansion_product_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Returns the product of two double floating point expansions.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * As per Shewchuk in the above paper: "To find the product of two expansions
 * e and f, use SCALE-EXPANSION (with zero elimination) to form the expansions
 * ef_1, ef_2, ..., then sum these using a distillation tree."
 *
 * A distillation tree used with fastExpansionSum will give O(k*log k) vs O(k^2)
 * operations.
 *
 * Implemented naively and not as described by Shewchuk (i.e. the algorithm
 * takes O(k^2) operations).
 * @param e a double floating point expansion
 * @param f another double floating point expansion
 */
function expansionProduct(e, f) {
    let sum = [0];
    for (let i = 0; i < e.length; i++) {
        sum = add(sum, multByDouble(f, e[i]));
    }
    //return compress(sum);
    return sum;
}

//# sourceMappingURL=expansion-product.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-negative-of.js
/**
 * Returns the negative of the given floating point expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eNegativeOf(e) {
    const m = e.length;
    const h = new Array(m);
    for (let i = 0; i < m; i++) {
        h[i] = -e[i];
    }
    return h;
}

//# sourceMappingURL=e-negative-of.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-diff.js


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const negativeOf = eNegativeOf;
const e_diff_add = fastExpansionSum;
/**
 * Returns the difference between two floating point expansions, i.e. e - f.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function eDiff(e, f) {
    const g = negativeOf(f);
    return e_diff_add(e, g);
}

//# sourceMappingURL=e-diff.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/bit-length.js




/**
 * Returns the bit-length of the significand of the given number in such a way
 * that trailing zeros are not counted.
 * @param a A double precision floating point number
 */
function bitLength(a) {
    if (a === 0) {
        return 0;
    }
    return getHighestSetBit(a) - getLowestSetBit(a) + 1;
}
/**
 * Returns the bit-length of the significand of the given floating point
 * expansion in such a way that trailing zeros are not counted.
 * * precondition: subnormals not currently supported
 * @param a A double precision floating point expansion
 */
function expBitLength(a) {
    let a_ = e_compress_eCompress(a);
    if (e_sign_eSign(a_) === 0) {
        return 0;
    }
    let msbyte = a_[a_.length - 1];
    let lsbyte = a_[0];
    return exponent(msbyte) - exponent(lsbyte) + (53 - getLowestSetBit(lsbyte));
}

//# sourceMappingURL=bit-length.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-div.js





// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const mult = expansionProduct;
const toBitlength = eToBitlength;
const e_div_bitLength = expBitLength;
const diff = eDiff;
const estimate = eEstimate;
/**
 * Returns the result of a/b using Goldschmidt division.
 *
 * The result will only be exact if b|a, i.e. if b divides a exactly, else the
 * result will be rounded to the longest bitlength between a and b.
 *
 * @param a the numerator
 * @param b the denominator
 *
 * @param expansionLength the bitlength/53 of the final result, e.g. 1 means
 * standard double precision, 2 means double-double, etc up to a max of about 20 at
 * which point underflow cease precision improvement. If the division is known
 * to be exact beforehand (such as in the pseudo remainder sequence algorithm)
 * then set expansionLength === 0 and an exact division will be done.
 */
// TODO - test this function properly or replace with a better one
function eDiv(N, D, expansionLength) {
    let D_ = D;
    let N_ = N;
    let exact = false;
    let resultBitlengthUpperBound = 0;
    if (!expansionLength) {
        let bitlengthN = e_div_bitLength(N_);
        let bitlengthD = e_div_bitLength(D_);
        // resultBitlengthUpperBound is only valid if the division is known
        // to be exact
        resultBitlengthUpperBound = bitlengthN - bitlengthD + 1;
        expansionLength = (resultBitlengthUpperBound / 53) + 1;
        exact = true;
    }
    let F = [1 / estimate(D_)]; // Initial guess - out by 1/2 upls
    let i = 1;
    while (true) {
        N_ = mult(N_, F);
        // The precision bitlength doubles on each iteration
        if (i > expansionLength) {
            // we now have roughly double the needed precision - we actually 
            // only require about the precision and then round properly - this
            // could be implemented in the future.
            if (exact) {
                // We must throw away bits known to be zero. 
                // Any bits > expansionLength * 53 must be thrown away as they
                // are wrong - all other bits are exact.
                N_ = toBitlength(N_, resultBitlengthUpperBound);
                // TODO - below is just for testing - remove later
                //if (compare(mult(D, N_), N) !== 0) {
                //    console.log(mult(D, N_))
                //    throw new Error(`division in-exact - probably due to underflow, N: ${N}, D: ${D}, Result: ${N_}, product: ${mult(D, N_)}`); 
                //} 
                return N_;
            }
            // Returning only significant bits helps with sign determination later on.
            return N_.slice(N_.length - expansionLength, N_.length);
        }
        D_ = mult(D_, F);
        F = diff([2], D_);
        i *= 2;
    }
}

//# sourceMappingURL=e-div.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/grow-expansion.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const grow_expansion_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Returns the result of adding a double to an expansion.
 *
 * Let e be a nonoverlapping expansion of m p-bit components, and let b be a
 * p-bit value where p >= 3. Suppose that the components e_1, ..., e_m are
 * sorted in order of *increasing* magnitude, except that any of the ei may be
 * zero.
 * Then the following algorithm will produce a nonoverlapping expansion such
 * that h = sum_i(h_i) = e + b, where the components h_1, ..., h_(m+1) are also
 * in order of increasing magnitude, except that any of the h_i may be zero.
 * Furthermore, if e is nonadjacent and round-to-even tiebreaking is used, then
 * h is nonadjacent.
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * @param e A floating point expansion
 * @param b Another floating point expansion
 */
function growExpansion(e, b) {
    const m = e.length;
    let q = b;
    //const h: number[] = new Array(m+1);
    const h = [];
    //let j = 0;
    for (let i = 0; i < m; i++) {
        // Note the use of twoSum and not fastTwoSum.
        //[h[i], q] = ts(q, e[i]);
        const ee = e[i];
        const x = q + ee;
        const bv = x - q;
        let hh = (q - (x - bv)) + (ee - bv);
        if (hh !== 0) {
            h.push(hh);
        }
        q = x;
    }
    //h[j] = q;
    if (q !== 0 || h.length === 0) {
        h.push(q);
    }
    //return compress(h);
    return h;
}

//# sourceMappingURL=grow-expansion.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/two-sum.js
/**
 * Returns the exact result of adding two doubles.
 *
 * * the resulting array is the reverse of the standard twoSum in the literature.
 *
 * Theorem 7 (Knuth): Let a and b be p-bit floating-point numbers. Then the
 * following algorithm will produce a nonoverlapping expansion x + y such that
 * a + b = x + y, where x is an approximation to a + b and y is the roundoff
 * error in the calculation of x.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function two_sum_twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [(a - (x - bv)) + (b - bv), x];
}
// inlined
//const R = a + b; const _ = R - a; const r = (a - (R - _)) + (b - _); return [r,R]

//# sourceMappingURL=two-sum.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-sum.js



// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_sum_ts = two_sum_twoSum;
const addDouble = growExpansion;
const e_sum_add = fastExpansionSum;
/**
 * Returns the result of summing an array of floating point expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of numbers to be summed; A term is represented by a
 * floating point expansion.
 */
// The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eSum(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        // add
        if (term.length === 1) {
            if (total.length === 1) {
                total = e_sum_ts(total[0], term[0]);
            }
            else {
                total = addDouble(total, term[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = addDouble(term, total[0]);
            }
            else {
                total = e_sum_add(total, term);
            }
        }
    }
    return total;
}

//# sourceMappingURL=e-sum.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-long-divide.js







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_long_divide_eNegativeOf = eNegativeOf;
const e_long_divide_fastExpansionSum = fastExpansionSum;
const e_long_divide_eCompress = e_compress_eCompress;
const e_long_divide_growExpansion = growExpansion;
const e_long_divide_eSum = eSum;
const e_long_divide_scaleExpansion = scaleExpansion;
const e_long_divide_eDiff = eDiff;
const e_long_divide_sign = Math.sign;
function eLongDivide(N, D) {
    N = e_long_divide_eCompress(N);
    D = e_long_divide_eCompress(D);
    // get the most significant double
    // out by at most 1 ulp, exact if d < MAX_SAFE_INT
    let d = D[D.length - 1];
    // trivial cases
    if (D.length === 1) {
        if (d === 0) {
            throw new Error('division by zero');
        }
        if (d === 1) {
            return { div: N, rem: [0] };
        }
        if (d === -1) {
            return { div: e_long_divide_eNegativeOf(N), rem: [0] };
        }
    }
    const signN = e_long_divide_sign(N[N.length - 1]);
    if (signN === 0) {
        return { div: [0], rem: [0] };
    }
    let signD = e_long_divide_sign(d);
    let divs = [];
    let oldLen = 0;
    while (true) {
        let rems = [];
        // loop from big `n[i]` to small `n[i]`
        for (let i = N.length - 1; i >= 0; i--) {
            const n = N[i];
            // `n % d` is the exact rem (for rem < MAX_SAFE_INTEGER) but is preliminary 
            // as it is subject to round-off for rem > MAX_SAFE_INTEGER; thus out by at 
            // most 1/2 ulp
            // Due to roundoff (and the fact we'e using `d` and not `D`!), `_div` does 
            // not necessarily represent the exact quotient.
            let div = Math.round((n - (n % d)) / d);
            // get the remainder by calculating `rem = n - d*div`
            rems.push(e_long_divide_scaleExpansion(D, div)); // exact
            if (div === 0) {
                break;
            }
            divs.push(div);
        }
        N = e_long_divide_eCompress(e_long_divide_eDiff(N, e_long_divide_eSum(rems)));
        if (oldLen === divs.length) {
            break;
        }
        oldLen = divs.length;
    }
    let rem = N;
    let div = [0];
    for (let i = 0; i < divs.length; i++) {
        div = e_long_divide_growExpansion(div, divs[i]);
    }
    div = e_long_divide_eCompress(div);
    //----------------------
    // fix signs (possibly)
    //----------------------
    //const signDiv = sign(div[div.length-1]);
    const signRem = e_long_divide_sign(rem[rem.length - 1]);
    //const signND = signN * signD;
    // We must have:
    // sign(div) === sign(n) * sign(d)
    // sign(rem) === sign(n)
    // At this point: `signN !== 0` and `signD !== 0`
    if (signRem !== 0 && signRem !== signN) {
        if (signN > 0) {
            if (signD > 0) {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = e_long_divide_growExpansion(div, -1);
                rem = e_long_divide_fastExpansionSum(rem, D);
            }
            else {
                // div = div + 1  (div is positive)
                // rem = rem - D
                div = e_long_divide_growExpansion(div, +1);
                rem = e_long_divide_fastExpansionSum(rem, e_long_divide_eNegativeOf(D));
            }
        }
        else if (signN < 0) {
            if (signD > 0) {
                // div = div + 1 (div is negative)
                // rem = rem - D
                div = e_long_divide_growExpansion(div, +1);
                rem = e_long_divide_fastExpansionSum(rem, e_long_divide_eNegativeOf(D));
            }
            else {
                // div = div - 1  (div is positive)
                // rem = rem + D
                div = e_long_divide_growExpansion(div, -1);
                rem = e_long_divide_fastExpansionSum(rem, D);
            }
        }
    }
    return { div, rem };
}

//# sourceMappingURL=e-long-divide.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-int-div.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_int_div_eLongDivide = eLongDivide;
/**
 * Returns the result of the integer division a/b.
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eIntDiv(a, b) {
    return e_int_div_eLongDivide(a, b).div;
}

//# sourceMappingURL=e-int-div.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-rem.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_rem_eLongDivide = eLongDivide;
/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(a, b) {
    return e_rem_eLongDivide(a, b).rem;
}

//# sourceMappingURL=e-rem.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-compare.js


/**
 * Returns 0 if a === b, a +tive value if a > b or a negative value if a < b.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * "The easiest way to compare two expansions is to subtract one from the other,
 * and test the sign of the result. An expansion’s sign can be easily tested
 * because of the nonoverlapping property; simply check the sign of the
 * expansion's most significant nonzero component..."
 *
 * @param a a floating point expansion
 * @param b another floating point expansion
 */
function eCompare(a, b) {
    return e_sign_eSign(eDiff(a, b));
}

//# sourceMappingURL=e-compare.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-abs.js


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_abs_sign = (/* unused pure expression or super */ null && (eSign));
const e_abs_negativeOf = eNegativeOf;
/**
 * Returns the absolute value of the given floating point expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eAbs(e) {
    if (e[e.length - 1] < 0) {
        return e_abs_negativeOf(e);
    }
    return e;
}

//# sourceMappingURL=e-abs.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/fast-two-diff.js
/**
 * Returns the difference and exact error of subtracting two floating point
 * numbers.
 * Uses an EFT (error-free transformation), i.e. a-b === x+y exactly.
 * The returned result is a non-overlapping expansion (smallest value first!).
 *
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is
 * (a > b) === (a > -b)
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fastTwoDiff(a, b) {
    const x = a - b;
    const y = (a - x) - b;
    return [y, x];
}

//# sourceMappingURL=fast-two-diff.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/fast-two-sum.js
/**
 * Returns the sum and exact error of adding two floating point numbers.
 * Uses an EFT (error-free transformation), i.e. a+b === x+y exactly.
 * The returned sum is a non-overlapping expansion (smallest value first!).
 *
 * Precondition: abs(a) >= abs(b) - A fast test that can be used is
 * (a > b) === (a > -b)
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 */
function fast_two_sum_fastTwoSum(a, b) {
    const x = a + b;
    return [b - (x - a), x];
}
// inlined
//const R = a + b; const r = b - (R - a); return [r, R];

//# sourceMappingURL=fast-two-sum.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-mult-by-2.js
/**
 * Returns the result of multiplying a floating point expansion by 2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(2 * e[i]);
    }
    return e_;
}

//# sourceMappingURL=e-mult-by-2.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-mult-by-neg-2.js
/**
 * Multiply a floating point expansion by -2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultByNeg2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(-2 * e[i]);
    }
    return e_;
}

//# sourceMappingURL=e-mult-by-neg-2.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-div-by-2.js
/**
 * Returns the result of dividing a floating point expansion by 2.
 * * **error free**
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eDivBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(0.5 * e[i]);
    }
    return e_;
}

//# sourceMappingURL=e-div-by-2.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/split.js
/**
 * === Math.ceil(p/2) where p is the # of significand bits in a double === 53.
 */
const split_f = 134217729; // 2**27 + 1;
/**
 * Returns the result of splitting a double into 2 26-bit doubles.
 *
 * Theorem 17 (Veltkamp-Dekker): Let a be a p-bit floating-point number, where
 * p >= 3. Choose a splitting point s such that p/2 <= s <= p-1. Then the
 * following algorithm will produce a (p-s)-bit value a_hi and a
 * nonoverlapping (s-1)-bit value a_lo such that abs(a_hi) >= abs(a_lo) and
 * a = a_hi + a_lo.
 *
 * see e.g. [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * @param a A double floating point number
 */
function split(a) {
    const c = split_f * a;
    const a_h = c - (c - a);
    const a_l = a - a_h;
    return [a_h, a_l];
}
// inlined - input a, output a_h, a_l
// const c = f * a; const a_h = c - (c - a); const a_l = a - a_h; return [a_h, a_l];

//# sourceMappingURL=split.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/two-diff.js
/**
 * Returns the exact result of subtracting b from a (as a floating point
 * expansion).
 * @param a
 * @param b
 */
function twoDiff(a, b) {
    const x = a - b;
    const bvirt = a - x;
    const y = (a - (x + bvirt)) + (bvirt - b);
    return [y, x];
}

//# sourceMappingURL=two-diff.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/basic/two-product.js
const two_product_f = 134217729; // 2**27 + 1;
/**
 * Returns the exact result of multiplying two doubles.
 *
 * * the resulting array is the reverse of the standard twoSum in the literature.
 *
 * Theorem 18 (Shewchuk): Let a and b be p-bit floating-point numbers, where
 * p >= 6. Then the following algorithm will produce a nonoverlapping expansion
 * x + y such that ab = x + y, where x is an approximation to ab and y
 * represents the roundoff error in the calculation of x. Furthermore, if
 * round-to-even tiebreaking is used, x and y are non-adjacent.
 *
 * See https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 * @param a A double
 * @param b Another double
 */
function two_product_twoProduct(a, b) {
    const x = a * b;
    //const [ah, al] = split(a);
    const c = two_product_f * a;
    const ah = c - (c - a);
    const al = a - ah;
    //const [bh, bl] = split(b);
    const d = two_product_f * b;
    const bh = d - (d - b);
    const bl = b - bh;
    const y = (al * bl) - ((x - (ah * bh)) - (al * bh) - (ah * bl));
    //const err1 = x - (ah * bh);
    //const err2 = err1 - (al * bh);
    //const err3 = err2 - (ah * bl);
    //const y = (al * bl) - err3;
    return [y, x];
}

//# sourceMappingURL=two-product.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/is-bit-aligned.js


/**
 * Returns true if the given number is bit-aligned in the sense that its a
 * multiple of a given power of 2, say e, and such that the number, say a,
 * conforms to: a/2^e < 2^(l-e), where l is the max allowed bit length.
 * This essentially means the numbers act somewhat like fixed-point numbers
 * which can drastically speed up some geometric algorithms and also reduce
 * their complexity.
 *
 * Visually:
 * These numbers (a,b and c) are bit aligned with e === 3 and max
 * bitlength === 6:
 *    a -> 00|101100|000
 *    b -> 00|000100|000
 *    c -> 00|110111|000
 * These are not
 *    a -> 01|101100|000
 *    b -> 00|000100|000
 * These are not
 *    a -> 00|101100|000
 *    b -> 00|000100|100
 * These are not
 *    a -> 00|101100|100
 *    b -> 00|000100|100
 * @param as An array of numbers to check
 * @param maxBitLength The max allowed bitlength
 * @param gridSpacingExponent The grid spacing === 1^gridSpacingExponent
 */
function isBitAligned(a, maxBitLength, gridSpacingExponent) {
    if (a === 0) {
        return true;
    }
    let e = exponent(a);
    let maxSetBit = getHighestSetBit(a) - 52 + e;
    let minSetBit = getLowestSetBit(a) - 52 + e;
    let minBitBigEnough = minSetBit >= gridSpacingExponent;
    let maxBitSmallEnough = maxSetBit <= maxBitLength - 1 + gridSpacingExponent;
    return minBitBigEnough && maxBitSmallEnough;
}

//# sourceMappingURL=is-bit-aligned.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-representation/lsb-exponent.js


/**
 * Returns the true exponent of the lsb that is set of the given number or
 * NaN if a === 0 or +-inf or NaN.
 * @param a An array of numbers to check
 */
function lsbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
        return NaN;
    }
    let e = exponent(a);
    return getLowestSetBit(a) - 52 + e;
}

//# sourceMappingURL=lsb-exponent.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-calculate.js







// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_calculate_mult = expansionProduct;
const e_calculate_tp = two_product_twoProduct;
const e_calculate_multByDouble = scaleExpansion;
const e_calculate_ts = two_sum_twoSum;
const e_calculate_addDouble = growExpansion;
const e_calculate_add = fastExpansionSum;
const e_calculate_compress = (/* unused pure expression or super */ null && (eCompress));
/**
 * Return the result of summing an array of terms, each term being an array of
 * floating point expansions to be multiplied together.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms An array of terms to be summed; A term consists of an
 * array of floating point expansions to be multiplied together.
 */
// The terms parameter were chosen to always be expansions in order to keep the 
// function monomorhic, but whether it's really worth it I am not sure.
function eCalculate(terms) {
    let total = [0];
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        let product = term[0];
        for (let j = 1; j < term.length; j++) {
            const multiplicant = term[j];
            if (multiplicant.length == 1) {
                if (product.length === 1) {
                    product = e_calculate_tp(product[0], multiplicant[0]);
                }
                else {
                    product = e_calculate_multByDouble(product, multiplicant[0]);
                }
            }
            else if (product.length === 1) {
                product = e_calculate_multByDouble(multiplicant, product[0]);
            }
            else {
                product = e_calculate_mult(multiplicant, product);
            }
        }
        // add
        if (product.length === 1) {
            if (total.length === 1) {
                total = e_calculate_ts(total[0], product[0]);
            }
            else {
                total = e_calculate_addDouble(total, product[0]);
            }
        }
        else {
            if (total.length === 1) {
                total = e_calculate_addDouble(product, total[0]);
            }
            else {
                total = e_calculate_add(total, product);
            }
        }
    }
    //return compress(total);
    return total;
}

//# sourceMappingURL=e-calculate.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-product.js




// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_product_mult = expansionProduct;
const e_product_tp = two_product_twoProduct;
const e_product_multByDouble = scaleExpansion;
const e_product_compress = e_compress_eCompress;
/**
 * Return the result of multiplying together an array of floating point
 * expansions.
 *
 * * The result is exact in the form of a non-overlapping floating point
 * expansion.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param terms an array of multiplicands
 */
function eProduct(term) {
    let product = term[0];
    for (let j = 1; j < term.length; j++) {
        const multiplicant = term[j];
        if (multiplicant.length == 1) {
            if (product.length === 1) {
                product = e_product_tp(product[0], multiplicant[0]);
            }
            else {
                product = e_product_multByDouble(product, multiplicant[0]);
            }
        }
        else if (product.length === 1) {
            product = e_product_multByDouble(multiplicant, product[0]);
        }
        else {
            product = e_product_mult(multiplicant, product);
        }
    }
    return e_product_compress(product);
    //return product;
}

//# sourceMappingURL=e-product.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-int-pow.js


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_int_pow_mult = expansionProduct;
const prod = eProduct;
/**
 * Returns a**i, where i is a non-negative integer.
 * @param a a floating point expansion
 */
// TODO - this algorithm's speed can easily be improved significantly using 'repeated squaring'
function eIntPow(a, p) {
    // a^0 === 1
    if (p === 0) {
        return [1];
    }
    // a^1 === a
    if (p === 1) {
        return a;
    }
    if (p === 2) {
        return e_int_pow_mult(a, a);
    }
    const as = [];
    for (let i = 0; i < p; i++) {
        as.push(a);
    }
    return prod(as);
}

//# sourceMappingURL=e-int-pow.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-to-double-double.js

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const e_to_double_double_compress = e_compress_eCompress;
/**
 * Returns the result of converting a floating point expansion to a
 * double-double precision floating point number.
 */
function eToDd(e) {
    e = e_to_double_double_compress(e);
    const len = e.length;
    if (len === 2) {
        return e; // already a double-double
    }
    else if (len === 1) {
        return [0, e[0]]; // double-doubles have a fixed length of 2
    }
    return [e[len - 2], e[len - 1]]; // return only most significant parts
}

//# sourceMappingURL=e-to-double-double.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/geometric-primitives/orient2d.js






let ccwerrboundA = 3.330669073875472e-16;
let ccwerrboundB = 2.220446049250315e-16;
let ccwerrboundC = 1.109335647967049e-31;
let resulterrbound = 3.330669073875471e-16;
/**
 * * Ported from [Shewchuk](http://docs.ros.org/kinetic/api/asr_approx_mvbb/html/Predicates_8cpp_source.html)
 * * see also https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf
 *
 * * Adaptive exact 2d orientation test.
 *
 * * Robust.
 *
 * Return a positive value if the points pa, pb, and pc occur in
 * counterclockwise order; a negative value if they occur in clockwise order;
 * and zero if they are collinear.  The result is also a rough approximation of
 * twice the signed area of the triangle defined by the three points.
 *
 * The result returned is the determinant of a matrix. This determinant is
 * computed adaptively, in the sense that exact arithmetic is used only to the
 * degree it is needed to ensure that the returned value has the correct sign.
 * Hence, orient2d() is usually quite fast, but will run more slowly when the
 * input points are collinear or nearly so.
 */
function orient2d(A, B, C) {
    let detleft = (A[0] - C[0]) * (B[1] - C[1]);
    let detright = (A[1] - C[1]) * (B[0] - C[0]);
    let det = detleft - detright;
    let detsum;
    if (detleft > 0) {
        if (detright <= 0) {
            // Anti-clockwise
            return det;
        }
        else {
            detsum = detleft + detright;
        }
    }
    else if (detleft < 0) {
        if (detright >= 0) {
            // Clockwise
            return det;
        }
        else {
            detsum = -detleft - detright;
        }
    }
    else {
        // Anti-clockwise, clockwise or straight
        return det;
    }
    if (Math.abs(det) >= ccwerrboundA * detsum) {
        // Anti-clockwise or clockwise
        return det;
    }
    return orient2dAdapt(A, B, C, detsum);
}
function orient2dAdapt(A, B, C, detsum) {
    let acx = A[0] - C[0];
    let bcx = B[0] - C[0];
    let acy = A[1] - C[1];
    let bcy = B[1] - C[1];
    let b = eDiff(two_product_twoProduct(acx, bcy), two_product_twoProduct(acy, bcx));
    let det = eEstimate(b);
    if (Math.abs(det) >= ccwerrboundB * detsum) {
        // Anti-clockwise or clockwise
        return det;
    }
    let acxtail = twoDiff(A[0], C[0])[0];
    let bcxtail = twoDiff(B[0], C[0])[0];
    let acytail = twoDiff(A[1], C[1])[0];
    let bcytail = twoDiff(B[1], C[1])[0];
    if (acxtail === 0 && acytail === 0 &&
        bcxtail === 0 && bcytail === 0) {
        // Straight
        return det;
    }
    let errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
    det += (acx * bcytail + bcy * acxtail) - (acy * bcxtail + bcx * acytail);
    if (Math.abs(det) >= errbound) {
        return det;
    }
    let a = eDiff(two_product_twoProduct(acxtail, bcy), two_product_twoProduct(acytail, bcx));
    let c = fastExpansionSum(b, a);
    let d = eDiff(two_product_twoProduct(acx, bcytail), two_product_twoProduct(acy, bcxtail));
    let e = fastExpansionSum(c, d);
    let f = eDiff(two_product_twoProduct(acxtail, bcytail), two_product_twoProduct(acytail, bcxtail));
    let D = fastExpansionSum(e, f);
    D = e_compress_eCompress(D);
    return D[D.length - 1];
}

//# sourceMappingURL=orient2d.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/is-overlapping.js


/**
 * Returns true if a and b overlaps, false otherwise.
 *
 * Two floating-point values x and y are nonoverlapping if the least significant
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Implemented for testing purposes.
 * @param a a double
 * @param b another double
 */
function isOverlapping(a, b) {
    return !isNonOverlapping(a, b);
}
/**
 * Returns true if a and b does not overlap, false otherwise.
 *
 * Two floating-point values x and y are nonoverlapping if the least significant
 * nonzero bit of x is more significant than the most significant nonzero bit of
 * y.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * Implemented for testing purposes.
 *
 * @param a A double
 * @param b Another double
 */
function isNonOverlapping(a, b) {
    if (a === 0 || b === 0) {
        return true;
    }
    if (Math.abs(b) > Math.abs(a)) {
        [a, b] = [b, a];
    }
    // At this point abs(a) > abs(b)
    let l = getLowestSetBit(a);
    let h = getHighestSetBit(b);
    let shift = exponent(a) - exponent(b);
    return (l + shift) > h;
}
/**
 * Returns true if all components of the given floating point expansion is
 * non-overlapping, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a double floating point expansion
 */
function isNonOverlappingAll(e) {
    for (let i = 1; i < e.length; i++) {
        if (isOverlapping(e[i - 1], e[i])) {
            return false;
        }
    }
    return true;
}

//# sourceMappingURL=is-overlapping.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/is-adjacent.js

/**
 * Returns true if x and y are adjacent, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * for details
 *
 * @param x a double floating point number
 * @param y another double floating point number
 */
function isAdjacent(x, y) {
    return isOverlapping(x, y) ||
        isOverlapping(x, 2 * y) ||
        isOverlapping(2 * x, y);
}

//# sourceMappingURL=is-adjacent.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/double-expansion/e-is-integer.js

function eIsInteger(a) {
    a = e_compress_eCompress(a);
    for (let i = 0; i < a.length; i++) {
        if (a[i] % 1 !== 0) {
            return false;
        }
    }
    return true;
}

//# sourceMappingURL=e-is-integer.js.map
;// CONCATENATED MODULE: ./node_modules/big-float-ts/node/index.js














































// Aliases for some functions which names were not changed due to them being
// used extensively in the literature with a particular recognizable name
const eAdd = fastExpansionSum;
const eAddDouble = growExpansion;
const eMult = expansionProduct;
const eMultDouble1 = scaleExpansion;
const eMultDouble2 = scaleExpansion2;
const operators = {
    //---- basic ----//
    fastTwoDiff: fastTwoDiff,
    fastTwoSum: fast_two_sum_fastTwoSum,
    split: split,
    twoDiff: twoDiff,
    twoProduct: two_product_twoProduct,
    twoSum: two_sum_twoSum,
    reduceSignificand: reduceSignificand,
    //---- double floating point expansions ----//
    fastExpansionSum: fastExpansionSum, eAdd,
    growExpansion: growExpansion, eAddDouble,
    expansionProduct: expansionProduct, eMult,
    scaleExpansion: scaleExpansion, eMultDouble1,
    scaleExpansion2: scaleExpansion2, eMultDouble2,
    eDiv: eDiv,
    eLongDivide: eLongDivide,
    eIntDiv: eIntDiv,
    eRem: eRem,
    eCompress: e_compress_eCompress,
    eEstimate: eEstimate,
    eDiff: eDiff,
    eNegativeOf: eNegativeOf,
    eMultBy2: eMultBy2,
    eMultByNeg2: eMultByNeg2,
    eDivBy2: eDivBy2,
    eSign: e_sign_eSign,
    eCompare: eCompare,
    eAbs: eAbs,
    eToBitlength: eToBitlength,
    eIntPow: eIntPow,
    eCalculate: eCalculate,
    eSum: eSum,
    eProduct: eProduct,
    eToDd: eToDd,
    //---- double floating point representation ----//
    parseDouble: parseDouble,
    parseDoubleDetailed: parseDoubleDetailed,
    isBitAligned: isBitAligned,
    msbExponent: msbExponent,
    lsbExponent: lsbExponent,
    bitLength: bitLength,
    expBitLength: expBitLength,
    doubleToBinaryString: doubleToBinaryString,
    doubleToOctets: doubleToOctets,
    getHighestSetBit: getHighestSetBit,
    getLowestSetBit: getLowestSetBit,
    exponent: exponent,
    significand: significand,
    //---- geometric primitives
    orient2d: orient2d,
    //---- others
    isAdjacent: isAdjacent,
    isNonOverlappingAll: isNonOverlappingAll,
    eIsInteger: eIsInteger
};


//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./src/dot.ts
/**
 * Returns the dot (inner) product between two 2-vectors.
 * @param a the first vector
 * @param b the second vector
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}


;// CONCATENATED MODULE: ./src/cross.ts
/**
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param a the first vector
 * @param b the second vector
 */
function cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}


;// CONCATENATED MODULE: ./src/lines-and-segments/seg-seg-intersection.ts

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
    if (e_sign_eSign(rNumer) * e_sign_eSign(denom) >= 0 && eCompare(eAbs(denom), eAbs(rNumer)) >= 0 &&
        e_sign_eSign(sNumer) * e_sign_eSign(denom) >= 0 && eCompare(eAbs(denom), eAbs(sNumer)) >= 0) {
        let r = eEstimate(rNumer) / eEstimate(denom);
        //return [a0 + r*(b0 - a0), a1 + r*(b1 - a1)];
        return [
            eEstimate(two_sum_twoSum(eEstimate(expansionProduct(twoDiff(b0, a0), rNumer)) / eEstimate(denom), a0)),
            eEstimate(two_sum_twoSum(eEstimate(expansionProduct(twoDiff(b1, a1), rNumer)) / eEstimate(denom), a1))
        ];
    }
    return undefined;
}


;// CONCATENATED MODULE: ./src/lines-and-segments/does-seg-seg-intersect.ts

/**
 * Returns true if the two given 2d line segments intersect, false otherwise.
 * * **robust** uses exact adaptive floating point arithmetic.
 * @param a a line segment
 * @param b another line segment
 */
function doesSegSegIntersect(a, b) {
    if ((orient2d(a[0], a[1], b[0]) * orient2d(a[0], a[1], b[1])) > 0) {
        return false;
    }
    if ((orient2d(b[0], b[1], a[0]) * orient2d(b[0], b[1], a[1])) > 0) {
        return false;
    }
    return true;
}


;// CONCATENATED MODULE: ./src/lines-and-segments/line-line-intersection.ts
/**
 * Find point where two lines intersect. Returns he point where the two lines
 * intersect or undefined if they don't intersect or are the same line.
 * see Wikipedia https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
 * @param l1 A line
 * @param l2 Another line
 */
function lineLineIntersection(l1, l2) {
    let [[x1, y1], [x2, y2]] = l1;
    let [[x3, y3], [x4, y4]] = l2;
    let x1_ = x2 - x1;
    let y1_ = y2 - y1;
    let x2_ = x4 - x3;
    let y2_ = y4 - y3;
    let denom = x2_ * y1_ - y2_ * x1_;
    if (denom === 0) {
        // parallel
        return undefined;
    }
    let b = ((y3 - y1) * x1_ - (x3 - x1) * y1_) / denom;
    return [
        x3 + b * x2_,
        y3 + b * y2_
    ];
}


;// CONCATENATED MODULE: ./src/affine-transformations/translate/translate.ts
// From: https://en.wikipedia.org/wiki/Affine_transformation
// "If X is the point set of an affine space, then every affine transformation 
// on X can be represented as the composition of a linear transformation on X 
// and a translation of X"
function translate(a, b) {
    function f(b) {
        return [a[0] + b[0], a[1] + b[1]];
    }
    // Curry the function
    return b === undefined ? f : f(b);
}


;// CONCATENATED MODULE: ./src/affine-transformations/linear/rotate.ts
function rotate(sinθ, cosθ, p) {
    function rotateByθ(p) {
        return [
            p[0] * cosθ - p[1] * sinθ,
            p[0] * sinθ + p[1] * cosθ
        ];
    }
    // Curry the function
    return p === undefined ? rotateByθ : rotateByθ(p);
}


;// CONCATENATED MODULE: ./src/affine-transformations/linear/scale.ts
/**
 * Returns a scaled version of the given 2-vector.
 * @param p a vector
 * @param c a scale factor
 */
function scale(p, c) {
    return [c * p[0], c * p[1]];
}


;// CONCATENATED MODULE: ./src/affine-transformations/linear/reverse.ts
/**
 * Returns the given 2-vector reversed (i.e. scaled by -1).
 * @param p a vector
 */
function reverse(p) {
    return [-p[0], -p[1]];
}


;// CONCATENATED MODULE: ./src/affine-transformations/linear/reverse-rotate.ts
/**
 * Returns a rotated (clockwise) version of the given 2-vector given the
 * sine and cosine of the angle.
 * @param p a 2d vector
 * @param sinθ
 * @param cosθ
 */
function reverseRotate(sinθ, cosθ, p) {
    return [
        +p[0] * cosθ + p[1] * sinθ,
        -p[0] * sinθ + p[1] * cosθ
    ];
}


;// CONCATENATED MODULE: ./src/affine-transformations/linear/rotate-90-degrees.ts
/**
 * Returns a 90 degrees rotated version of the given 2-vector.
 * @param p a 2d vector
 */
function rotate90Degrees(p) {
    return [-p[1], p[0]];
}


;// CONCATENATED MODULE: ./src/affine-transformations/linear/rotate-neg-90-degrees.ts
/**
* Returns a negative 90 degrees rotated version of the given 2-vector.
* @param p a 2d vector
*/
function rotateNeg90Degrees(p) {
    return [p[1], -p[0]];
}


;// CONCATENATED MODULE: ./src/affine-transformations/linear/transform-linear.ts
function transformLinear([[a, b], [c, d]], p) {
    function transform([x, y]) {
        return [
            a * x + b * y,
            c * x + d * y
        ];
    }
    // Curry the function
    return p === undefined ? transform : transform(p);
}


;// CONCATENATED MODULE: ./src/affine-transformations/transform-affine.ts
function transformAffine([[a, b], [c, d]], [r, s], p) {
    function transform([x, y]) {
        return [
            a * x + b * y + r,
            c * x + d * y + s
        ];
    }
    // Curry the function
    return p === undefined ? transform : transform(p);
}


;// CONCATENATED MODULE: ./src/distance-and-length/to-unit-vector.ts
/**
 * Returns the given 2-vector scaled to a length of one.
 * @param p a vector
 */
function toUnitVector(p) {
    let scaleFactor = 1 / (Math.sqrt(p[0] * p[0] + p[1] * p[1]));
    return [p[0] * scaleFactor, p[1] * scaleFactor];
}


;// CONCATENATED MODULE: ./src/distance-and-length/to-length.ts
/**
 * Returns the given 2-vector scaled to the given length.
 * @param p a vector
 * @param length the length to scale to
 */
function toLength(p, length) {
    let c = length / Math.sqrt(p[0] * p[0] + p[1] * p[1]);
    return [c * p[0], c * p[1]];
}


;// CONCATENATED MODULE: ./src/distance-and-length/distance-between.ts
/**
 * Returns the distance between two 2d points.
 * @param p a point
 * @param q another point
 */
function distanceBetween(p, q) {
    let x = q[0] - p[0];
    let y = q[1] - p[1];
    return Math.sqrt(x * x + y * y);
}


;// CONCATENATED MODULE: ./src/distance-and-length/len.ts
/**
 * Returns the length of the given 2-vector.
 * @param p a 2d vector
 */
function len(p) {
    return Math.sqrt(p[0] * p[0] + p[1] * p[1]);
}


;// CONCATENATED MODULE: ./src/distance-and-length/length-squared.ts
/**
 * Returns the squared length of the given 2-vector.
 * @param p a vector
 */
function lengthSquared(v) {
    return v[0] * v[0] + v[1] * v[1];
}


;// CONCATENATED MODULE: ./src/distance-and-length/manhattan-distance-between.ts
/**
 * Returns the Manhattan distance between two 2d points.
 * @param p a point.
 * @param q another point.
 */
function manhattanDistanceBetween(p, q) {
    return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);
}


;// CONCATENATED MODULE: ./src/distance-and-length/manhattan-length.ts
/**
 * Returns the Manhattan length of the given 2-vector.
 * @param p a vector
 */
function manhattanLength(p) {
    return Math.abs(p[0]) + Math.abs(p[1]);
}


;// CONCATENATED MODULE: ./src/distance-and-length/distance-between-point-and-line.ts
/**
 * Returns the distance between the given point and line.
 * * see https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
 * @param p a point
 * @param l a line
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


;// CONCATENATED MODULE: ./src/distance-and-length/squared-distance-between.ts
/**
 * Returns the squared distance between two 2d points.
 * @param p a point
 * @param q another point
 */
function squaredDistanceBetween(p, q) {
    let x = q[0] - p[0];
    let y = q[1] - p[1];
    return x * x + y * y;
}


;// CONCATENATED MODULE: ./src/distance-and-length/squared-distance-between-point-and-line-segment.ts

/**
 * Returns the squared distance between the given point and line segment.
 * @param p a point
 * @param l a line
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


;// CONCATENATED MODULE: ./src/matrix/det.ts
/**
 * Calculate the determinant of three 3d vectors, i.e. 3x3 matrix
 * @param x a 2d vector
 * @param y another 2d vector
 * @param z another 2d vector
 */
function det3(x, y, z) {
    return (x[0] * (y[1] * z[2] - y[2] * z[1])) -
        (x[1] * (y[0] * z[2] - y[2] * z[0])) +
        (x[2] * (y[0] * z[1] - y[1] * z[0]));
}


;// CONCATENATED MODULE: ./src/triangle-centers/circum-center.ts


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
    return [Sx / a, Sy / a];
}


;// CONCATENATED MODULE: ./src/triangle-centers/in-center.ts

/**
 * Returns the incenter of the given triangle.
 * * see Wikipedia - https://en.wikipedia.org/wiki/Incenter
 * @param triangle
 */
function inCenter(triangle) {
    const dst = distanceBetween;
    let p = triangle[0];
    let q = triangle[1];
    let r = triangle[2];
    let a = dst(q, r);
    let b = dst(p, r);
    let c = dst(p, q);
    let lengthSum = a + b + c;
    return [
        (a * p[0] + b * q[0] + c * r[0]) / lengthSum,
        (a * p[1] + b * q[1] + c * r[1]) / lengthSum
    ];
}


;// CONCATENATED MODULE: ./src/triangle-centers/centroid.ts
/**
* Returns the centroid of the given polygon, e.g. triangle. The polygon
* must be simple, i.e. not self-intersecting.
* @param polygon_
*/
function centroid(polygon) {
    let polygon_ = [];
    if (polygon.length === 1) {
        return polygon[0];
    }
    // remove duplicate points
    let prevP = polygon[polygon.length - 1];
    for (let i = 0; i < polygon.length; i++) {
        let [_x, _y] = prevP;
        let [x, y] = polygon[i];
        prevP = [x, y];
        if (x !== _x || y !== _y) {
            polygon_.push([x, y]);
        }
    }
    if (polygon_.length === 2) {
        let p1 = polygon_[0];
        let p2 = polygon_[1];
        let x = p1[0] + p2[0];
        let y = p1[1] + p2[1];
        return [x / 2, y / 2];
    }
    if (polygon_.length === 3) {
        let p1 = polygon_[0];
        let p2 = polygon_[1];
        let p3 = polygon_[2];
        let x = p1[0] + p2[0] + p3[0];
        let y = p1[1] + p2[1] + p3[1];
        return [x / 3, y / 3];
    }
    // polygon.length assumed > 3 and assumed to be non-self-intersecting
    // See wikipedia
    // First calculate the area, A, of the polygon
    let A = 0;
    for (let i = 0; i < polygon_.length; i++) {
        let p0 = polygon_[i];
        let p1 = (i === polygon_.length - 1)
            ? polygon_[0]
            : polygon_[i + 1];
        A = A + (p0[0] * p1[1] - p1[0] * p0[1]);
    }
    A = A / 2;
    let C = [0, 0];
    for (let i = 0; i < polygon_.length; i++) {
        let p0 = polygon_[i];
        let p1 = (i === polygon_.length - 1)
            ? polygon_[0]
            : polygon_[i + 1];
        C[0] = C[0] + (p0[0] + p1[0]) * (p0[0] * p1[1] - p1[0] * p0[1]);
        C[1] = C[1] + (p0[1] + p1[1]) * (p0[0] * p1[1] - p1[0] * p0[1]);
    }
    return [C[0] / (6 * A), C[1] / (6 * A)];
}


;// CONCATENATED MODULE: ./src/index.ts
//==================================
// 2d vector pure functions library
//==================================





























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
function fromTo(p, q) {
    return [q[0] - p[0], q[1] - p[1]];
}
/**
 * Performs linear interpolation between two 2d points and returns the
 * resulting point.
 * @param p the first point.
 * @param q the second point.
 * @param t the interpolation fraction (often in [0,1]).
 */
function interpolate(p, q, t) {
    return [
        p[0] + (q[0] - p[0]) * t,
        p[1] + (q[1] - p[1]) * t
    ];
}
/**
 * Returns the mean of two 2d points.
 * @param ps the two points
 */
function mean(ps) {
    let p = ps[0];
    let q = ps[1];
    return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
}
/**
* Returns true if two 2-vectors are identical (by value), false otherwise.
* @param a a 2d vector
* @param b another 2d vector
*/
function equal(a, b) {
    return (a[0] === b[0] && a[1] === b[1]);
}
/**
 * Returns the closest point to the array of 2d points or if the array is empty
 * returns undefined.
 * @param p
 * @param ps
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
/**
 * Returns the closest point to the array of 2d points by providing a distance
 * function. If the given array is empty, returns undefined.
 * @param p
 * @param ps
 * @param f a function that takes the object and returns a point in order to
 * apply the Euclidian distance.
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


var __webpack_exports__ccw = __webpack_exports__.oH;
var __webpack_exports__centroid = __webpack_exports__.Sc;
var __webpack_exports__circumCenter = __webpack_exports__.pb;
var __webpack_exports__cross = __webpack_exports__.kC;
var __webpack_exports__det3 = __webpack_exports__.Ph;
var __webpack_exports__distanceBetween = __webpack_exports__.qw;
var __webpack_exports__distanceBetweenPointAndLine = __webpack_exports__.PI;
var __webpack_exports__doesSegSegIntersect = __webpack_exports__.tl;
var __webpack_exports__dot = __webpack_exports__.AK;
var __webpack_exports__equal = __webpack_exports__.Dg;
var __webpack_exports__fromTo = __webpack_exports__.JQ;
var __webpack_exports__getClosestTo = __webpack_exports__.Gk;
var __webpack_exports__getObjClosestTo = __webpack_exports__.AY;
var __webpack_exports__inCenter = __webpack_exports__.un;
var __webpack_exports__interpolate = __webpack_exports__.sX;
var __webpack_exports__len = __webpack_exports__.Zh;
var __webpack_exports__lengthSquared = __webpack_exports__.YH;
var __webpack_exports__lineLineIntersection = __webpack_exports__.QG;
var __webpack_exports__manhattanDistanceBetween = __webpack_exports__._r;
var __webpack_exports__manhattanLength = __webpack_exports__.Tp;
var __webpack_exports__mean = __webpack_exports__.J6;
var __webpack_exports__reverse = __webpack_exports__.GY;
var __webpack_exports__reverseRotate = __webpack_exports__.ay;
var __webpack_exports__rotate = __webpack_exports__.U1;
var __webpack_exports__rotate90Degrees = __webpack_exports__.$z;
var __webpack_exports__rotateNeg90Degrees = __webpack_exports__.UF;
var __webpack_exports__scale = __webpack_exports__.bA;
var __webpack_exports__segSegIntersection = __webpack_exports__.NW;
var __webpack_exports__squaredDistanceBetween = __webpack_exports__.Pz;
var __webpack_exports__squaredDistanceBetweenPointAndLineSegment = __webpack_exports__.$6;
var __webpack_exports__toLength = __webpack_exports__.Hg;
var __webpack_exports__toUnitVector = __webpack_exports__.wP;
var __webpack_exports__transformAffine = __webpack_exports__.cm;
var __webpack_exports__transformLinear = __webpack_exports__.Zb;
var __webpack_exports__translate = __webpack_exports__.Iu;
export { __webpack_exports__ccw as ccw, __webpack_exports__centroid as centroid, __webpack_exports__circumCenter as circumCenter, __webpack_exports__cross as cross, __webpack_exports__det3 as det3, __webpack_exports__distanceBetween as distanceBetween, __webpack_exports__distanceBetweenPointAndLine as distanceBetweenPointAndLine, __webpack_exports__doesSegSegIntersect as doesSegSegIntersect, __webpack_exports__dot as dot, __webpack_exports__equal as equal, __webpack_exports__fromTo as fromTo, __webpack_exports__getClosestTo as getClosestTo, __webpack_exports__getObjClosestTo as getObjClosestTo, __webpack_exports__inCenter as inCenter, __webpack_exports__interpolate as interpolate, __webpack_exports__len as len, __webpack_exports__lengthSquared as lengthSquared, __webpack_exports__lineLineIntersection as lineLineIntersection, __webpack_exports__manhattanDistanceBetween as manhattanDistanceBetween, __webpack_exports__manhattanLength as manhattanLength, __webpack_exports__mean as mean, __webpack_exports__reverse as reverse, __webpack_exports__reverseRotate as reverseRotate, __webpack_exports__rotate as rotate, __webpack_exports__rotate90Degrees as rotate90Degrees, __webpack_exports__rotateNeg90Degrees as rotateNeg90Degrees, __webpack_exports__scale as scale, __webpack_exports__segSegIntersection as segSegIntersection, __webpack_exports__squaredDistanceBetween as squaredDistanceBetween, __webpack_exports__squaredDistanceBetweenPointAndLineSegment as squaredDistanceBetweenPointAndLineSegment, __webpack_exports__toLength as toLength, __webpack_exports__toUnitVector as toUnitVector, __webpack_exports__transformAffine as transformAffine, __webpack_exports__transformLinear as transformLinear, __webpack_exports__translate as translate };
