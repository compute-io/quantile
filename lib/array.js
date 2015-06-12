'use strict';

// FUNCTIONS //

var ascending = require( './ascending.js' );

//  QUANTILE //

/**
* FUNCTION: quantile( arr, p, [, sorted[, method]] )
* 	Computes a quantile of the values in a numeric array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number} prob - quantile prob [0,1]
* @param {Boolean} [sorted=false] - boolean flag indicating if the input array is sorted in ascending order
* @param {Number} [method=7] - number indicating the method used to interpolate a quantile value
* @returns {Number|Null} quantile or null
*/
function quantile( arr, p, sorted, method ) {
	var len = arr.length,
		id, id2, h, ret;

	if ( !len ) {
		return null;
	}

	if ( !sorted ) {
		// Borrow prototype method as typed arrays do not have sort & slice
		arr = Array.prototype.slice.call( arr );
		Array.prototype.sort.call( arr, ascending );
	}

	switch ( method ) {
		case 1:
			if ( p === 0.0 ) {
				ret = arr[ 0 ];
			} else {
				h = len*p + 0.5;
				id = Math.ceil( h - 0.5 ) - 1;
				ret = arr[ id ];
			}
			break;
		case 2:
			if ( p === 0.0 ) {
				ret = arr[ 0 ];
			} else if ( p === 1.0 ) {
				ret = arr[ len - 1 ];
			} else {
				h = len*p + 1/2;
				id = Math.ceil( h - 1/2 ) - 1;
				id2 = Math.floor( h + 1/2 ) - 1;
				ret = ( arr[ id ] + arr[ id2 ] ) / 2;
			}
			break;
		case 3:
			if ( p <= 0.5 / len ) {
				ret = arr[ 0 ];
			} else {
				h = len*p;
				id = Math.round( h ) - 1;
				ret = arr[ id ];
			}
			break;
		case 4:
			if ( p  < 1/len ) {
				ret = arr[ 0 ];
			} else if ( p === 1.0 ) {
				ret = arr[ len - 1 ];
			} else {
				h = len*p;
				id = Math.floor( h ) - 1;
				ret = arr[ id ] + ( h - Math.floor( h ) ) * ( arr[ id + 1 ] - arr[ id ] );
			}
			break;
		case 5:
			if ( p < 0.5 / len ) {
				ret = arr[ 0 ];
			} else if ( p >= ( len - 0.5 ) / len ) {
				ret = arr[ len - 1 ];
			} else {
				h = len*p + 0.5;
				id = Math.floor( h ) - 1;
				ret = arr[ id ] + ( h - Math.floor( h ) ) * ( arr[ id + 1 ] - arr[ id ] );
			}
			break;
		case 6:
			if ( p < 1 / ( len + 1 ) ) {
				ret = arr[ 0 ];
			} else if ( p > len / ( len + 1 ) ) {
				ret = arr[ len - 1 ];
			} else {
				h = ( len + 1 ) * p;
				id = Math.floor( h ) - 1;
				ret = arr[ id ] + ( h - Math.floor( h ) ) * ( arr[ id + 1 ] - arr[ id ] );
			}
			break;
		case 7:
			/* falls through */
		default:
			if ( p === 1.0 ) {
				ret = arr[ len - 1 ];
			} else {
				h = ( len - 1 ) * p + 1;
				id = Math.floor( h ) - 1;
				ret = arr[ id ] + ( h - Math.floor( h ) ) * ( arr[ id + 1 ] - arr[ id ] );
			}
			break;
		case 8:
			if ( p < (2/3) / ( len + (1/3) ) ) {
				ret = arr[ 0 ];
			} else if ( p >= ( len - (1/3) ) / ( len + (1/3) ) ) {
				ret = arr[ len - 1 ];
			} else {
				h = ( len + 1/3 ) * p + 1/3;
				id = Math.floor( h ) - 1;
				ret = arr[ id ] + ( h - Math.floor( h ) ) * ( arr[ id + 1 ] - arr[ id ] );
			}
			break;
		case 9:
			if ( p < (5/8) / ( len + (1/4) ) ) {
				ret = arr[ 0 ];
			} else if ( p >= ( len - (3/8) ) / ( len + (1/4) ) ) {
				ret = arr[ len - 1 ];
			} else {
				h = ( len + 1/4 ) * p + 3/8;
				id = Math.floor( h ) - 1;
				ret = arr[ id ] + ( h - Math.floor( h ) ) * ( arr[ id + 1 ] - arr[ id ] );
			}
			break;
	}
	return ret;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
