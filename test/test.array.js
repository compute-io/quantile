/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	quantile = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array quantile', function tests() {

	var data;
	// Even number of elements...
	// 1st decile: 2, 9th decile: 7.5
	data = [ 6, 4, 3, 3, 5, 7, 4, 7, 8, 1 ];

	it( 'should export a function', function test() {
		expect( quantile ).to.be.a( 'function' );
	});

	it( 'should compute the quantile using the default method (no 7)', function test() {

		// default
		assert.strictEqual( quantile( data, 0.1 ), 2.8 );
		assert.strictEqual( quantile( data, 0.9 ), 7.1 );
		assert.strictEqual( quantile( data, 0 ), 1 );
		assert.strictEqual( quantile( data, 1 ), 8 );
		assert.strictEqual( quantile( data, 0.5 ), 4.5 );

		// setting it explicitly
		assert.strictEqual( quantile( data, 0.1, null, 7 ), 2.8 );
		assert.strictEqual( quantile( data, 0.9, null, 7 ), 7.1 );
		assert.strictEqual( quantile( data, 0, null, 7 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 7 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 7 ), 4.5 );

	});

	it( 'should compute the quantile using method 1', function test() {

		assert.strictEqual( quantile( data, 0.1, null, 1 ), 1 );
		assert.strictEqual( quantile( data, 0.9, null, 1 ), 7 );
		assert.strictEqual( quantile( data, 0, null, 1 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 1 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 1 ), 4 );

	});

	it( 'should compute the quantile using method 2', function test() {

		assert.strictEqual( quantile( data, 0.1, null, 2 ), 2 );
		assert.strictEqual( quantile( data, 0.9, null, 2 ), 7.5 );
		assert.strictEqual( quantile( data, 0, null, 2 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 2 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 2 ), 4.5 );

	});

	it( 'should compute the quantile using method 3', function test() {

		assert.strictEqual( quantile( data, 0.1, null, 3 ), 1 );
		assert.strictEqual( quantile( data, 0.9, null, 3 ), 7 );
		assert.strictEqual( quantile( data, 0, null, 3 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 3 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 3 ), 4 );

	});

	it( 'should compute the quantile using method 4', function test() {

		assert.strictEqual( quantile( data, 0.1, null, 4 ), 1 );
		assert.strictEqual( quantile( data, 0.9, null, 4 ), 7 );
		assert.strictEqual( quantile( data, 0, null, 4 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 4 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 4 ), 4 );

	});

	it( 'should compute the quantile using method 5', function test() {

		assert.strictEqual( quantile( data, 0.1, null, 5 ), 2 );
		assert.strictEqual( quantile( data, 0.9, null, 5 ), 7.5 );
		assert.strictEqual( quantile( data, 0, null, 5 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 5 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 5 ), 4.5 );

	});

	it( 'should compute the quantile using method 6', function test() {

		assert.closeTo( quantile( data, 0.1, null, 6 ), 1.2, 1e-4	 );
		assert.strictEqual( quantile( data, 0.9, null, 6 ), 7.9 );
		assert.strictEqual( quantile( data, 0, null, 6 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 6 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 6 ), 4.5 );

	});

	it( 'should compute the quantile using method 8', function test() {

		assert.closeTo( quantile( data, 0.1, null, 8 ), 1.733333, 1e-4 );
		assert.closeTo( quantile( data, 0.9, null, 8 ), 7.633333, 1e-4 );
		assert.strictEqual( quantile( data, 0, null, 8 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 8 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 8 ), 4.5 );

	});

	it( 'should compute the quantile using method 9', function test() {

		assert.closeTo( quantile( data, 0.1, null, 9 ), 1.8, 1e-4 );
		assert.strictEqual( quantile( data, 0.9, null, 9 ), 7.6 );
		assert.strictEqual( quantile( data, 0, null, 9 ), 1 );
		assert.strictEqual( quantile( data, 1, null, 9 ), 8 );
		assert.strictEqual( quantile( data, 0.5, null, 9 ), 4.5 );

	});


	it( 'should compute the quantile using default method for a sor', function test() {

		assert.strictEqual( quantile( data, 0.1 ), 2.8 );

		assert.strictEqual( quantile( data, 0.9 ), 7.1 );

		assert.strictEqual( quantile( data, 0 ), 1 );

		assert.strictEqual( quantile( data, 1 ), 8 );

		data.sort( function sort( a, b ) {
			return a - b;
		});

		assert.strictEqual( quantile( data, 0.5, {'sorted': true} ), 4.5 );

		// Odd number of elements...
		data = [ 6, 4, 3, 3, 5, 7, 7, 8, 1 ];

		assert.strictEqual( quantile( data, 0.5 ), 5 );
	});


	it( 'should return null if provided an empty array', function test() {
		assert.isNull( quantile( [] ) );
	});

});
