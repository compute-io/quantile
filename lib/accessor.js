'use strict';

// FUNCTIONS //

var ascending = require( './ascending.js' );

//  QUANTILE //

/**
* FUNCTION: quantile( arr, p, clbk[, sorted[, method]] )
*	Computes a quantile of the values in an array using an accessor.
*
* @param {Array} arr - input array
* @param {Number} prob - quantile prob [0,1]
* @param {Function} clbk - accessor function for accessing array values
* @param {Boolean} [sorted=false] - boolean flag indicating if the input array is sorted in ascending order
* @param {Number} [method=7] - number indicating the method used to interpolate a quantile value
* @returns {Number|Null} quantile or null
*/
function quantile( arr, p, clbk, sorted, method ) {
	var len = arr.length,
		h, id, id2, ret,
		values,
		i;

	if ( !len ) {
		return null;
	}

	values = [];
	for ( i = 0; i < len; i++ ) {
		values.push( clbk( arr[ i ], i ) );
	}

	if ( !sorted ) {
		values.sort( ascending );
	}

	switch ( method ) {
		case 1:
			if ( p === 0.0 ) {
				ret = values[ 0 ];
			} else {
				h = len*p + 0.5;
				id = Math.ceil( h - 0.5 ) - 1;
				ret = values[ id ];
			}
			break;
		case 2:
			if ( p === 0.0 ) {
				ret = values[ 0 ];
			} else if ( p === 1.0 ) {
				ret = values[ len - 1 ];
			} else {
				h = len*p + 1/2;
				id = Math.ceil( h - 1/2 ) - 1;
				id2 = Math.floor( h + 1/2 ) - 1;
				ret = ( values[ id ] + values[ id2 ] ) / 2;
			}
			break;
		case 3:
			if ( p <= 0.5 / len ) {
				ret = values[ 0 ];
			} else {
				h = len*p;
				id = Math.round( h ) - 1;
				ret = values[ id ];
			}
			break;
		case 4:
			if ( p  < 1/len ) {
				ret = values[ 0 ];
			} else if ( p === 1.0 ) {
				ret = values[ len - 1 ];
			} else {
				h = len*p;
				id = Math.floor( h ) - 1;
				ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
			}
			break;
		case 5:
			if ( p < 0.5 / len ) {
				ret = values[ 0 ];
			} else if ( p >= ( len - 0.5 ) / len ) {
				ret = values[ len - 1 ];
			} else {
				h = len*p + 0.5;
				id = Math.floor( h ) - 1;
				ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
			}
			break;
		case 6:
			if ( p < 1 / ( len + 1 ) ) {
				ret = values[ 0 ];
			} else if ( p > len / ( len + 1 ) ) {
				ret = values[ len - 1 ];
			} else {
				h = ( len + 1 ) * p;
				id = Math.floor( h ) - 1;
				ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
			}
			break;
		case 7:
			/* falls through */
		default:
			if ( p === 1.0 ) {
				ret = values[ len - 1 ];
			} else {
				h = ( len - 1 ) * p + 1;
				id = Math.floor( h ) - 1;
				ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
			}
			break;
		case 8:
			if ( p < (2/3) / ( len + (1/3) ) ) {
				ret = values[ 0 ];
			} else if ( p >= ( len - (1/3) ) / ( len + (1/3) ) ) {
				ret = values[ len - 1 ];
			} else {
				h = ( len + 1/3 ) * p + 1/3;
				id = Math.floor( h ) - 1;
				ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
			}
			break;
		case 9:
			if ( p < (5/8) / ( len + (1/4) ) ) {
				ret = values[ 0 ];
			} else if ( p >= ( len - (3/8) ) / ( len + (1/4) ) ) {
				ret = values[ len - 1 ];
			} else {
				h = ( len + 1/4 ) * p + 3/8;
				id = Math.floor( h ) - 1;
				ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
			}
			break;
	}
	return ret;

} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
