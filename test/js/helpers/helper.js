'use strict'

var Vector2d;

if (typeof require !== 'undefined') {
	Vector2d = require('../../../js/flo-vector2d.js');
}

var { } = Vector2d;

var helper = {

}


/**
 * Helper function. Tests if an array of numbers are all within the 
 * range [a,b] 
 */
function numsWithin(ns, a, b) {
	for (let n of ns) {
		if (n < a || n > b) {
			return false;
		}
	}
	return true;
}


if (typeof require !== 'undefined') {
	module.exports = helper;	
}

