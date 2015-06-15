'use strict';

var matrix = require( 'dstructs-matrix' ),
	quantile = require( './../lib' );

var data,
	mat,
	median,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
// Compute the p-quantile for p = 0.5 (median):
median = quantile( data, 0.5 );
console.log( 'Arrays (Method 7): %d\n', median );

// ----
// non-default method
median = quantile( data, 0.5, {
	'method': 4
});
console.log( 'Arrays (Method 4): %d\n', median );

// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
median = quantile( data, 0.5, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', median );


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
median = quantile( data, 0.5 );
console.log( 'Typed arrays: %d\n', median );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
median = quantile( mat, 0.5, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', median.toString() );


// ----
// Matrices (along columns)...
median = quantile( mat, 0.5, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', median.toString() );


// ----
// Matrices (custom output data type)...
median = quantile( mat, 0.5, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', median.dtype, median.toString() );
