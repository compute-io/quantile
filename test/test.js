/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	quantile = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-quantile', function tests() {

	it( 'should export a function', function test() {
		expect( quantile ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				quantile( value, 0.5 );
			};
		}
	});

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				quantile( matrix( [2,2] ), 0.5, {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				quantile( matrix( [2,2] ), 0.5, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if the second argument is not a numeric value on the interval [0,1]', function test() {
		var values = [
			'5',
			5,
			-0.1,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				quantile( [], value, true );
			};
		}
	});

	it( 'should compute a quantile', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 2.5;

		assert.strictEqual( quantile( data, 0.3 ), expected );
	});

	it( 'should compute a quantile of a typed array', function test() {
		var data, expected;

		data = new Int8Array( [ 2, 4, 5, 3, 8, 2 ] );
		expected = 2.5;

		assert.strictEqual( quantile( data, 0.3 ), expected );
	});

	it( 'should compute a quantile using an accessor function', function test() {
		var data, expected, actual;
		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		expected = 2.5;
		actual = quantile( data, 0.3, {
			'accessor': getValue
		});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute a quantile along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			mu,
			i;

		data = new Int8Array( 36 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [6,6], 'int8' );

		// Default:
		mu = quantile( mat, 0.3 );
		expected = '1.5;7.5;13.5;19.5;25.5;31.5';

		assert.strictEqual( mu.toString(), expected, 'default' );

		// Along columns:
		mu = quantile( mat, 0.3, {
			'dim': 2
		});
		expected = '1.5;7.5;13.5;19.5;25.5;31.5';

		assert.strictEqual( mu.toString(), expected, 'dim: 2' );

		// Along rows:
		mu = quantile( mat, 0.3, {
			'dim': 1
		});
		expected = '9,10,11,12,13,14';

		assert.strictEqual( mu.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the quantile of 1d matrices (vectors)', function test() {
		var data, mat;

		data = [ 2, 4, 5, 3, 8, 2 ];

		// Row vector:
		mat = matrix( data, [1,6], 'int8' );
		assert.strictEqual( quantile( mat, 0.3 ), 2.5 );

		// Column vector:
		mat = matrix( data, [6,1], 'int8' );
		assert.strictEqual( quantile( mat, 0.3 ), 2.5 );
	});

});
