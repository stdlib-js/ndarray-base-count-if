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

/* eslint-disable max-depth, max-len */

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
* var shape = [ 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ];
*
* // Define the array strides:
* var sx = [ 8, 8, 8, 8, 8, 8, 8, 4, 2, 1 ];
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
* var out = blockedCountIf10d( x, predicate );
* // returns 7
*/
function blockedCountIf10d( x, predicate, thisArg ) { // eslint-disable-line max-statements, max-lines-per-function
	var count;
	var bsize;
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
	var dx9;
	var ox1;
	var ox2;
	var ox3;
	var ox4;
	var ox5;
	var ox6;
	var ox7;
	var ox8;
	var ox9;
	var sh;
	var s0;
	var s1;
	var s2;
	var s3;
	var s4;
	var s5;
	var s6;
	var s7;
	var s8;
	var s9;
	var sx;
	var ox;
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
	var i9;
	var j0;
	var j1;
	var j2;
	var j3;
	var j4;
	var j5;
	var j6;
	var j7;
	var j8;
	var j9;
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

	// Cache accessor:
	get = x.accessors[0];

	// Initialize a counter:
	count = 0;

	// Iterate over blocks...
	for ( j9 = sh[9]; j9 > 0; ) {
		if ( j9 < bsize ) {
			s9 = j9;
			j9 = 0;
		} else {
			s9 = bsize;
			j9 -= bsize;
		}
		ox9 = ox + ( j9*sx[9] );
		for ( j8 = sh[8]; j8 > 0; ) {
			if ( j8 < bsize ) {
				s8 = j8;
				j8 = 0;
			} else {
				s8 = bsize;
				j8 -= bsize;
			}
			dx9 = sx[9] - ( s8*sx[8] );
			ox8 = ox9 + ( j8*sx[8] );
			for ( j7 = sh[7]; j7 > 0; ) {
				if ( j7 < bsize ) {
					s7 = j7;
					j7 = 0;
				} else {
					s7 = bsize;
					j7 -= bsize;
				}
				dx8 = sx[8] - ( s7*sx[7] );
				ox7 = ox8 + ( j7*sx[7] );
				for ( j6 = sh[6]; j6 > 0; ) {
					if ( j6 < bsize ) {
						s6 = j6;
						j6 = 0;
					} else {
						s6 = bsize;
						j6 -= bsize;
					}
					dx7 = sx[7] - ( s6*sx[6] );
					ox6 = ox7 + ( j6*sx[6] );
					for ( j5 = sh[5]; j5 > 0; ) {
						if ( j5 < bsize ) {
							s5 = j5;
							j5 = 0;
						} else {
							s5 = bsize;
							j5 -= bsize;
						}
						dx6 = sx[6] - ( s5*sx[5] );
						ox5 = ox6 + ( j5*sx[5] );
						for ( j4 = sh[4]; j4 > 0; ) {
							if ( j4 < bsize ) {
								s4 = j4;
								j4 = 0;
							} else {
								s4 = bsize;
								j4 -= bsize;
							}
							dx5 = sx[5] - ( s4*sx[4] );
							ox4 = ox5 + ( j4*sx[4] );
							for ( j3 = sh[3]; j3 > 0; ) {
								if ( j3 < bsize ) {
									s3 = j3;
									j3 = 0;
								} else {
									s3 = bsize;
									j3 -= bsize;
								}
								dx4 = sx[4] - ( s3*sx[3] );
								ox3 = ox4 + ( j3*sx[3] );
								for ( j2 = sh[2]; j2 > 0; ) {
									if ( j2 < bsize ) {
										s2 = j2;
										j2 = 0;
									} else {
										s2 = bsize;
										j2 -= bsize;
									}
									dx3 = sx[3] - ( s2*sx[2] );
									ox2 = ox3 + ( j2*sx[2] );
									for ( j1 = sh[1]; j1 > 0; ) {
										if ( j1 < bsize ) {
											s1 = j1;
											j1 = 0;
										} else {
											s1 = bsize;
											j1 -= bsize;
										}
										dx2 = sx[2] - ( s1*sx[1] );
										ox1 = ox2 + ( j1*sx[1] );
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
											for ( i9 = 0; i9 < s9; i9++ ) {
												for ( i8 = 0; i8 < s8; i8++ ) {
													for ( i7 = 0; i7 < s7; i7++ ) {
														for ( i6 = 0; i6 < s6; i6++ ) {
															for ( i5 = 0; i5 < s5; i5++ ) {
																for ( i4 = 0; i4 < s4; i4++ ) {
																	for ( i3 = 0; i3 < s3; i3++ ) {
																		for ( i2 = 0; i2 < s2; i2++ ) {
																			for ( i1 = 0; i1 < s1; i1++ ) {
																				for ( i0 = 0; i0 < s0; i0++ ) {
																					if ( predicate.call( thisArg, get( xbuf, ix ), take( [ j9+i9, j8+i8, j7+i7, j6+i6, j5+i5, j4+i4, j3+i3, j2+i2, j1+i1, j0+i0 ], idx ), x.ref ) ) {
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
												ix += dx9;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return count;
}


// EXPORTS //

module.exports = blockedCountIf10d;
