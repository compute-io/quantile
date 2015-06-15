/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	quantile = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor quantile', function tests() {

	var data;

	data = [
		{'x':6},
		{'x':4},
		{'x':3},
		{'x':3},
		{'x':5},
		{'x':7},
		{'x':4},
		{'x':7},
		{'x':8},
		{'x':1}
	];

	function getValue( d ) {
		return d.x;
	}

	it( 'should export a function', function test() {
		expect( quantile ).to.be.a( 'function' );
	});

	it( 'should compute the quantile using the default method (no 7)', function test() {

		// default
		assert.strictEqual( quantile( data, 0.1, getValue ), 2.8 );
		assert.strictEqual( quantile( data, 0.9, getValue ), 7.1 );
		assert.strictEqual( quantile( data, 0, getValue ), 1 );
		assert.strictEqual( quantile( data, 1, getValue ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue ), 4.5 );

		// set method explicitly
		assert.strictEqual( quantile( data, 0.1, getValue, false, 7 ), 2.8 );
		assert.strictEqual( quantile( data, 0.9, getValue, false, 7 ), 7.1 );
		assert.strictEqual( quantile( data, 0, getValue, false, 7 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, false, 7 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, false, 7 ), 4.5 );

	});

	it( 'should compute the quantile using the default method (no 7) on an already sorted array', function test() {

		var sorted;

		sorted = data.sort( function ascending( a, b ) {
			return a.x - b.x;
		});

		assert.strictEqual( quantile( sorted, 0.1, getValue, true ), 2.8 );
		assert.strictEqual( quantile( sorted, 0.9, getValue, true ), 7.1 );
		assert.strictEqual( quantile( sorted, 0, getValue, true ), 1 );
		assert.strictEqual( quantile( sorted, 1, getValue, true ), 8 );
		assert.strictEqual( quantile( sorted, 0.5, getValue, true ), 4.5 );

	});


	it( 'should compute the quantile using method 1', function test() {

		assert.strictEqual( quantile( data, 0.1, getValue, null, 1 ), 1 );
		assert.strictEqual( quantile( data, 0.9, getValue, null, 1 ), 7 );
		assert.strictEqual( quantile( data, 0, getValue, null, 1 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 1 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 1 ), 4 );

	});

	it( 'should compute the quantile using method 2', function test() {

		assert.strictEqual( quantile( data, 0.1, getValue, null, 2 ), 2 );
		assert.strictEqual( quantile( data, 0.9, getValue, null, 2 ), 7.5 );
		assert.strictEqual( quantile( data, 0, getValue, null, 2 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 2 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 2 ), 4.5 );

	});

	it( 'should compute the quantile using method 3', function test() {

		assert.strictEqual( quantile( data, 0.1, getValue, null, 3 ), 1 );
		assert.strictEqual( quantile( data, 0.9, getValue, null, 3 ), 7 );
		assert.strictEqual( quantile( data, 0, getValue, null, 3 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 3 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 3 ), 4 );

	});

	it( 'should compute the quantile using method 4', function test() {

		assert.strictEqual( quantile( data, 0.1, getValue, null, 4 ), 1 );
		assert.strictEqual( quantile( data, 0.9, getValue, null, 4 ), 7 );
		assert.strictEqual( quantile( data, 0, getValue, null, 4 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 4 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 4 ), 4 );

	});

	it( 'should compute the quantile using method 5', function test() {

		assert.strictEqual( quantile( data, 0.1, getValue, null, 5 ), 2 );
		assert.strictEqual( quantile( data, 0.9, getValue, null, 5 ), 7.5 );
		assert.strictEqual( quantile( data, 0, getValue, null, 5 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 5 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 5 ), 4.5 );

	});

	it( 'should compute the quantile using method 6', function test() {

		assert.closeTo( quantile( data, 0.1, getValue, null, 6 ), 1.2, 1e-4	 );
		assert.strictEqual( quantile( data, 0.9, getValue, null, 6 ), 7.9 );
		assert.strictEqual( quantile( data, 0, getValue, null, 6 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 6 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 6 ), 4.5 );

	});

	it( 'should compute the quantile using method 8', function test() {

		assert.closeTo( quantile( data, 0.1, getValue, null, 8 ), 1.733333, 1e-4 );
		assert.closeTo( quantile( data, 0.9, getValue, null, 8 ), 7.633333, 1e-4 );
		assert.strictEqual( quantile( data, 0, getValue, null, 8 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 8 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 8 ), 4.5 );

	});

	it( 'should compute the quantile using method 9', function test() {

		assert.closeTo( quantile( data, 0.1, getValue, null, 9 ), 1.8, 1e-4 );
		assert.strictEqual( quantile( data, 0.9, getValue, null, 9 ), 7.6 );
		assert.strictEqual( quantile( data, 0, getValue, null, 9 ), 1 );
		assert.strictEqual( quantile( data, 1, getValue, null, 9 ), 8 );
		assert.strictEqual( quantile( data, 0.5, getValue, null, 9 ), 4.5 );

	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( quantile( [], getValue ) );
	});

});
