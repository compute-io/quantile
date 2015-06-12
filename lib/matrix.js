'use strict';

// FUNCTIONS //

var ascending = require( './ascending.js' );

// QUANTILE //

/**
* FUNCTION: quantile( out, mat, p[, sorted[, method[, dim] ] ] )
*	Computes the upper midmean along a matrix dimension.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} prob - quantile prob [0,1]
* @param {Boolean} [sorted=false] - boolean flag indicating if the rows / columns are already sorted in ascending order
* @param {Number} [method=7] - number indicating the method used to interpolate a quantile value
* @param {Number} [dim=2] - matrix dimension along which to compute the upper midmean. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} quantile or null
*/
function quantile( out, mat, p, sorted, method, dim ) {
	var values,
		h, id, id2, ret,
		M, N, o,
		s0, s1,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}

	// matrix offset
	o = mat.offset;

	switch ( method ) {
		case 1:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if ( p === 0.0 ) {
						ret = mat.data[ k ];
					} else {
						h = N*p + 0.5;
						id = Math.ceil( h - 0.5 ) - 1;
						ret = mat.data[ k + id*s1 ];
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p === 0.0 ) {
						ret = values[ 0 ];
					} else {
						h = N*p + 0.5;
						id = Math.ceil( h - 0.5 ) - 1;
						ret = values[ id ];
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 2:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if ( p === 0.0 ) {
						ret = mat.data[ k ];
					} else if ( p === 1.0 ) {
						ret = mat.data[ k + (N - 1)*s1 ];
					} else {
						h = N*p + 1/2;
						id = Math.ceil( h - 1/2 ) - 1;
						id2 = Math.floor( h + 1/2 ) - 1;
						ret = ( mat.data[ k + id*s1 ] + mat.data[ k + id2*s1 ] ) / 2;
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p === 0.0 ) {
						ret = values[ 0 ];
					} else if ( p === 1.0 ) {
						ret = values[ N - 1 ];
					} else {
						h = N*p + 1/2;
						id = Math.ceil( h - 1/2 ) - 1;
						id2 = Math.floor( h + 1/2 ) - 1;
						ret = ( values[ id ] + values[ id2 ] ) / 2;
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 3:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if (p <= 0.5 / N ) {
						ret = mat.data[ k ];
					} else {
						h = N*p;
						id = Math.round( h ) - 1;
						ret = mat.data[ k + id*s1 ];
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if (p <= 0.5 / N ) {
						ret = values[ 0 ];
					} else {
						h = N*p;
						id = Math.round( h ) - 1;
						ret = values[ id ];
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 4:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if ( p  < 1/N ) {
						ret = mat.data[ k ];
					} else if ( p === 1.0 ) {
						ret = mat.data[ k + (N - 1)*s1 ];
					} else {
						h = N*p;
						id = Math.floor( h ) - 1;
						ret = mat.data[ k + id*s1 ] + ( h - Math.floor( h ) ) * ( mat.data[ k + (id + 1)*s1 ] - mat.data[ k + id*s1 ] );
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p  < 1/N ) {
						ret = values[ 0 ];
					} else if ( p === 1.0 ) {
						ret = values[ N - 1 ];
					} else {
						h = N*p;
						id = Math.floor( h ) - 1;
						ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 5:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if ( p  < 0.5 / N ) {
						ret = mat.data[ k ];
					} else if ( p >= ( N - 0.5 ) / N ) {
						ret = mat.data[ k + (N - 1)*s1 ];
					} else {
						h = N*p + 0.5;
						id = Math.floor( h ) - 1;
						ret = mat.data[ k + id*s1 ] + ( h - Math.floor( h ) ) * ( mat.data[ k + (id + 1)*s1 ] - mat.data[ k + id*s1 ] );
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p  < 0.5 / N ) {
						ret = values[ 0 ];
					} else if ( p >= ( N - 0.5 ) / N ) {
						ret = values[ N - 1 ];
					} else {
						h = N*p + 0.5;
						id = Math.floor( h ) - 1;
						ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 6:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if ( p < 1 / ( N + 1 ) ) {
						ret = mat.data[ k ];
					} else if ( p > N / ( N + 1 ) ) {
						ret = mat.data[ k + (N - 1)*s1 ];
					} else {
						h = ( N + 1 ) * p;
						id = Math.floor( h ) - 1;
						ret = mat.data[ k + id*s1 ] + ( h - Math.floor( h ) ) * ( mat.data[ k + (id + 1)*s1 ] - mat.data[ k + id*s1 ] );
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p < 1 / ( N + 1 ) ) {
						ret = values[ 0 ];
					} else if ( p > N / ( N + 1 ) ) {
						ret = values[ N - 1 ];
					} else {
						h = ( N + 1 ) * p;
						id = Math.floor( h ) - 1;
						ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 7:
			/* falls through */
		default:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if (  p === 1.0 ) {
						ret = mat.data[ k + (N - 1)*s1 ];
					} else {
						h =  ( N - 1 ) * p + 1;
						id = Math.floor( h ) - 1;
						ret = mat.data[ k + id*s1 ] + ( h - Math.floor( h ) ) * ( mat.data[ k + (id + 1)*s1 ] - mat.data[ k + id*s1 ] );
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p === 1.0 ) {
						ret = values[ N - 1 ];
					} else {
						h =  ( N - 1 ) * p + 1;
						id = Math.floor( h ) - 1;
						ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 8:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if ( p < (2/3) / ( N + (1/3) ) ) {
						ret = mat.data[ k ];
					} else if ( p >= ( N - (1/3) ) / ( N + (1/3) ) ) {
						ret = mat.data[ k + (N - 1)*s1 ];
					} else {
						h = ( N + 1 ) * p;
						id = Math.floor( h ) - 1;
						ret = mat.data[ k + id*s1 ] + ( h - Math.floor( h ) ) * ( mat.data[ k + (id + 1)*s1 ] - mat.data[ k + id*s1 ] );
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p < (2/3) / ( N + (1/3) ) ) {
						ret = values[ 0 ];
					} else if ( p >= ( N - (1/3) ) / ( N + (1/3) ) ) {
						ret = values[ N - 1 ];
					} else {
						h = ( N + 1 ) * p;
						id = Math.floor( h ) - 1;
						ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
					}
					out.data[ i ] = ret;
				}
			}
			break;
		case 9:
			if ( sorted ) {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					if ( p < (5/8) / ( N + (1/4) ) ) {
						ret = mat.data[ k ];
					} else if ( p >= ( N - (3/8) ) / ( N + (1/4) ) ) {
						ret = mat.data[ k + (N - 1)*s1 ];
					} else {
						h = ( N + 1 ) * p;
						id = Math.floor( h ) - 1;
						ret = mat.data[ k + id*s1 ] + ( h - Math.floor( h ) ) * ( mat.data[ k + (id + 1)*s1 ] - mat.data[ k + id*s1 ] );
					}
					out.data[ i ] = ret;
				}
			} else {
				for ( i = 0; i < M; i++ ) {
					k = o + i*s0;
					values = [];
					for ( j = 0; j < N; j++ ) {
						values.push( mat.data[ k + j*s1 ] );
					}
					values.sort( ascending );
					if ( p < (5/8) / ( N + (1/4) ) ) {
						ret = values[ 0 ];
					} else if ( p >= ( N - (3/8) ) / ( N + (1/4) ) ) {
						ret = values[ N - 1 ];
					} else {
						h = ( N + 1/4 ) * p + 3/8;
						id = Math.floor( h ) - 1;
						ret = values[ id ] + ( h - Math.floor( h ) ) * ( values[ id + 1 ] - values[ id ] );
					}
					out.data[ i ] = ret;
				}
			}
			break;
	}

	return out;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
