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

/* eslint-disable max-depth */

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
* var shape = [ 1, 1, 1, 1, 1, 1, 2, 2, 2 ];
*
* // Define the array strides:
* var sx = [ 8, 8, 8, 8, 8, 8, 4, 2, 1 ];
*
* // Define the index offset:
* var ox = 0;
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
* var out = countIf9d( x, predicate );
* // returns 7
*/
function countIf9d( x, predicate, thisArg ) {
	var count;
	var xbuf;
	var idx;
	var get;
	var dx0;
	var dx1;
	var dx2;
	var dx3;
	var dx4;
	var dx5;
	var dx6;
	var dx7;
	var dx8;
	var sh;
	var S0;
	var S1;
	var S2;
	var S3;
	var S4;
	var S5;
	var S6;
	var S7;
	var S8;
	var sx;
	var ix;
	var i0;
	var i1;
	var i2;
	var i3;
	var i4;
	var i5;
	var i6;
	var i7;
	var i8;

	// Note on variable naming convention: S#, dx#, i# where # corresponds to the loop number, with `0` being the innermost loop...

	// Extract loop variables for purposes of loop interchange: dimensions and loop offset (pointer) increments...
	sh = x.shape;
	sx = x.strides;
	idx = zeroTo( sh.length );
	if ( strides2order( sx ) === 1 ) {
		// For row-major ndarrays, the last dimensions have the fastest changing indices...
		S0 = sh[ 8 ];
		S1 = sh[ 7 ];
		S2 = sh[ 6 ];
		S3 = sh[ 5 ];
		S4 = sh[ 4 ];
		S5 = sh[ 3 ];
		S6 = sh[ 2 ];
		S7 = sh[ 1 ];
		S8 = sh[ 0 ];
		dx0 = sx[ 8 ];                // offset increment for innermost loop
		dx1 = sx[ 7 ] - ( S0*sx[8] );
		dx2 = sx[ 6 ] - ( S1*sx[7] );
		dx3 = sx[ 5 ] - ( S2*sx[6] );
		dx4 = sx[ 4 ] - ( S3*sx[5] );
		dx5 = sx[ 3 ] - ( S4*sx[4] );
		dx6 = sx[ 2 ] - ( S5*sx[3] );
		dx7 = sx[ 1 ] - ( S6*sx[2] );
		dx8 = sx[ 0 ] - ( S7*sx[1] ); // offset increment for outermost loop
	} else { // order === 'column-major'
		// For column-major ndarrays, the first dimensions have the fastest changing indices...
		S0 = sh[ 0 ];
		S1 = sh[ 1 ];
		S2 = sh[ 2 ];
		S3 = sh[ 3 ];
		S4 = sh[ 4 ];
		S5 = sh[ 5 ];
		S6 = sh[ 6 ];
		S7 = sh[ 7 ];
		S8 = sh[ 8 ];
		dx0 = sx[ 0 ];                // offset increment for innermost loop
		dx1 = sx[ 1 ] - ( S0*sx[0] );
		dx2 = sx[ 2 ] - ( S1*sx[1] );
		dx3 = sx[ 3 ] - ( S2*sx[2] );
		dx4 = sx[ 4 ] - ( S3*sx[3] );
		dx5 = sx[ 5 ] - ( S4*sx[4] );
		dx6 = sx[ 6 ] - ( S5*sx[5] );
		dx7 = sx[ 7 ] - ( S6*sx[6] );
		dx8 = sx[ 8 ] - ( S7*sx[7] ); // offset increment for outermost loop
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
	for ( i8 = 0; i8 < S8; i8++ ) {
		for ( i7 = 0; i7 < S7; i7++ ) {
			for ( i6 = 0; i6 < S6; i6++ ) {
				for ( i5 = 0; i5 < S5; i5++ ) {
					for ( i4 = 0; i4 < S4; i4++ ) {
						for ( i3 = 0; i3 < S3; i3++ ) {
							for ( i2 = 0; i2 < S2; i2++ ) {
								for ( i1 = 0; i1 < S1; i1++ ) {
									for ( i0 = 0; i0 < S0; i0++ ) {
										if ( predicate.call( thisArg, get( xbuf, ix ), take( [ i8, i7, i6, i5, i4, i3, i2, i1, i0 ], idx ), x.ref ) ) { // eslint-disable-line max-len
											count += 1;
										}
										ix += dx0;
									}
									ix += dx1;
								}
								ix += dx2;
							}
							ix += dx3;
						}
						ix += dx4;
					}
					ix += dx5;
				}
				ix += dx6;
			}
			ix += dx7;
		}
		ix += dx8;
	}
	return count;
}


// EXPORTS //

module.exports = countIf9d;
