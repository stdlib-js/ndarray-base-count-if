/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var strides2order = require( '@stdlib/ndarray-base-strides2order' );
var zeroTo = require( '@stdlib/array-base-zero-to' );
var reverse = require( '@stdlib/array-base-reverse' );
var take = require( '@stdlib/array-base-take-indexed' );


// MAIN //

/**
* Counts the number of elements in an ndarray which pass a test implemented by a predicate function.
*
* @private
* @param {Object} x - object containing ndarray meta data
* @param {ndarrayLike} x.ref - reference to the original ndarray-like object
* @param {string} x.dtype - data type
* @param {Collection} x.data - data buffer
* @param {NonNegativeIntegerArray} x.shape - dimensions
* @param {IntegerArray} x.strides - stride lengths
* @param {NonNegativeInteger} x.offset - index offset
* @param {string} x.order - specifies whether `x` is row-major (C-style) or column-major (Fortran-style)
* @param {Array<Function>} x.accessors - data buffer accessors
* @param {Function} predicate - predicate function
* @param {*} thisArg - predicate function execution context
* @returns {integer} result
*
* @example
* var toAccessorArray = require( '@stdlib/array-base-to-accessor-array' );
* var accessors = require( '@stdlib/array-base-accessors' );
*
* function predicate( value ) {
*    return value > 0.0;
* }
*
* // Create a data buffer:
* var xbuf = toAccessorArray( [ 1.0, 2.0, 3.0, 4.0, 5.0, 0.0, 7.0, 8.0 ] );
*
* // Define the shape of the input array:
* var shape = [ 2, 2 ];
*
* // Define the array strides:
* var sx = [ 4, 1 ];
*
* // Define the index offset:
* var ox = 1;
*
* // Create the input ndarray-like object:
* var x = {
*     'ref': null,
*     'dtype': 'generic',
*     'data': xbuf,
*     'shape': shape,
*     'strides': sx,
*     'offset': ox,
*     'order': 'row-major',
*     'accessors': accessors( xbuf ).accessors
* };
*
* // Perform operation:
* var out = countIf2d( x, predicate );
* // returns 3
*/
function countIf2d( x, predicate, thisArg ) {
	var count;
	var xbuf;
	var idx;
	var get;
	var dx0;
	var dx1;
	var sh;
	var S0;
	var S1;
	var sx;
	var ix;
	var i0;
	var i1;

	// Note on variable naming convention: S#, dx#, i# where # corresponds to the loop number, with `0` being the innermost loop...

	// Extract loop variables for purposes of loop interchange: dimensions and loop offset (pointer) increments...
	sh = x.shape;
	sx = x.strides;
	idx = zeroTo( sh.length );
	if ( strides2order( sx ) === 1 ) {
		// For row-major ndarrays, the last dimensions have the fastest changing indices...
		S0 = sh[ 1 ];
		S1 = sh[ 0 ];
		dx0 = sx[ 1 ];                // offset increment for innermost loop
		dx1 = sx[ 0 ] - ( S0*sx[1] ); // offset increment for outermost loop
	} else { // order === 'column-major'
		// For column-major ndarrays, the first dimensions have the fastest changing indices...
		S0 = sh[ 0 ];
		S1 = sh[ 1 ];
		dx0 = sx[ 0 ];                // offset increment for innermost loop
		dx1 = sx[ 1 ] - ( S0*sx[0] ); // offset increment for outermost loop
		idx = reverse( idx );
	}
	// Set a pointer to the first indexed element:
	ix = x.offset;

	// Cache a reference to the input ndarray buffer:
	xbuf = x.data;

	// Cache accessor:
	get = x.accessors[ 0 ];

	// Initialize a counter:
	count = 0;

	// Iterate over the ndarray dimensions...
	for ( i1 = 0; i1 < S1; i1++ ) {
		for ( i0 = 0; i0 < S0; i0++ ) {
			if ( predicate.call( thisArg, get( xbuf, ix ), take( [ i1, i0 ], idx ), x.ref ) ) { // eslint-disable-line max-len
				count += 1;
			}
			ix += dx0;
		}
		ix += dx1;
	}
	return count;
}


// EXPORTS //

module.exports = countIf2d;
