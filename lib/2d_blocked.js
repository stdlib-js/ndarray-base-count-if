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

var loopOrder = require( '@stdlib/ndarray-base-nullary-loop-interchange-order' );
var blockSize = require( '@stdlib/ndarray-base-nullary-tiling-block-size' );
var take = require( '@stdlib/array-base-take-indexed' );
var reverse = require( '@stdlib/array-base-reverse' );


// MAIN //

/**
* Counts the number of elements in an ndarray which pass a test implemented by a predicate function via loop blocking.
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
* @param {Function} predicate - predicate function
* @param {*} thisArg - predicate function execution context
* @returns {integer} result
*
* @example
* var Float64Array = require( '@stdlib/array-float64' );
*
* function predicate( value ) {
*    return value > 0.0;
* }
*
* // Create a data buffer:
* var xbuf = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0, 0.0, 7.0, 8.0 ] );
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
*     'dtype': 'float64',
*     'data': xbuf,
*     'shape': shape,
*     'strides': sx,
*     'offset': ox,
*     'order': 'row-major'
* };
*
* // Perform operation:
* var out = blockedCountIf2d( x, predicate );
* // returns 3
*/
function blockedCountIf2d( x, predicate, thisArg ) {
	var count;
	var bsize;
	var xbuf;
	var idx;
	var dx0;
	var dx1;
	var ox1;
	var sh;
	var s0;
	var s1;
	var sx;
	var ox;
	var ix;
	var i0;
	var i1;
	var j0;
	var j1;
	var o;

	// Note on variable naming convention: s#, dx#, i#, j# where # corresponds to the loop number, with `0` being the innermost loop...

	// Resolve the loop interchange order:
	o = loopOrder( x.shape, x.strides );
	sh = o.sh;
	sx = o.sx;
	idx = reverse( o.idx );

	// Determine the block size:
	bsize = blockSize( x.dtype );

	// Set a pointer to the first indexed element:
	ox = x.offset;

	// Cache a reference to the input ndarray buffer:
	xbuf = x.data;

	// Cache the offset increment for the innermost loop:
	dx0 = sx[0];

	// Initialize a counter:
	count = 0;

	// Iterate over blocks...
	for ( j1 = sh[1]; j1 > 0; ) {
		if ( j1 < bsize ) {
			s1 = j1;
			j1 = 0;
		} else {
			s1 = bsize;
			j1 -= bsize;
		}
		ox1 = ox + ( j1*sx[1] );
		for ( j0 = sh[0]; j0 > 0; ) {
			if ( j0 < bsize ) {
				s0 = j0;
				j0 = 0;
			} else {
				s0 = bsize;
				j0 -= bsize;
			}
			// Compute the index offset for the first input ndarray element in the current block:
			ix = ox1 + ( j0*sx[0] );

			// Compute the loop offset increment:
			dx1 = sx[1] - ( s0*sx[0] );

			// Iterate over the ndarray dimensions...
			for ( i1 = 0; i1 < s1; i1++ ) {
				for ( i0 = 0; i0 < s0; i0++ ) {
					if ( predicate.call( thisArg, xbuf[ ix ], take( [ j1+i1, j0+i0 ], idx ), x.ref ) ) { // eslint-disable-line max-len
						count += 1;
					}
					ix += dx0;
				}
				ix += dx1;
			}
		}
	}
	return count;
}


// EXPORTS //

module.exports = blockedCountIf2d;
