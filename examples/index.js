'use strict';

var quantile = require( './../lib' );

// Simulate some data...
var data = new Array( 1000 );

for ( var i = 0, len = data.length; i < len; i++ ) {
	data[ i ] = Math.round( Math.random()*1000 );
}

// Compute the p-quantile for p = 0.5 (median):
console.log( quantile( data, 0.5 ) );
