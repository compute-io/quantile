'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isNumber = require( 'validate.io-number' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );


// FUNCTIONS //

var quantile1 = require( './array.js' ),
	quantile2 = require( './accessor.js' ),
	quantile3 = require( './matrix.js' );


// QUANTILE //

/**
* FUNCTION: quantile( x, prob[, opts] )
*	Computes a quantile.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Number} prob - quantile prob [0,1]
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Boolean} [opts.sorted] - boolean flag indicating if the input array is already sorted in ascending order
* @param {Number} [opts.method=7] - number indicating the method used to interpolate a quantile value
* @param {Number} [opts.dim=2] - dimension along which to compute the quantile.
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Matrix|Null} quantile value(s) or null
*/
function quantile( x, p, options ) {
	/* jshint newcap:false */
	var opts = {},
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m,
		sorted;

	if ( !isNumber( p ) ) {
		throw new TypeError( 'quantile()::invalid input argument. Quantile probability must be numeric.' );
	}
	if ( p < 0 || p > 1 ) {
		throw new TypeError( 'quantile()::invalid input argument. Quantile probability must be on the interval [0,1].' );
	}

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	sorted = opts.sorted || false;
	if ( isMatrixLike( x ) ) {
		dt = opts.dtype || 'float64';
		dim = opts.dim;

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return quantile1( x.data, p, sorted );
		}
		if ( dim > 2 ) {
			throw new RangeError( 'quantile()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'quantile()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the quantiles:
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return quantile3( m, x, p, sorted, opts.method, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return quantile2( x, p, opts.accessor, sorted );
		}
		return quantile1( x, p, sorted );
	}
	throw new TypeError( 'quantile()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;
