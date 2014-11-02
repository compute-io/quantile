'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

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

	it( 'should throw an error if the first argument is not an array', function test() {
		var values = [
			'5',
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
				quantile( value, 0.25, true );
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

	it( 'should throw an error if provided a non-object for the third argument', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			true
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				quantile( [], 0.25, value );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean sorted flag', function test() {
		var values = [
			'5',
			5,
			[],
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
				quantile( [], 0.25, {'sorted': value } );
			};
		}
	});

	it( 'should throw an error if provided a non-string interpolation method', function test() {
		var values = [
			true,
			5,
			[],
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
				quantile( [], 0.25, {'method': value } );
			};
		}
	});

	it( 'should compute a quantile', function test() {
		var data;

		// Even number of elements...

		// 1st decile: 2, 9th decile: 7.5
		data = [ 6, 4, 3, 3, 5, 7, 4, 7, 8, 1 ];

		assert.strictEqual( quantile( data, 0.1 ), 2 );

		assert.strictEqual( quantile( data, 0.9 ), 7.5 );

		data.sort( function sort( a, b ) {
			return a - b;
		});

		assert.strictEqual( quantile( data, 0.5, {'sorted': true} ), 4.5 );

		// Odd number of elements...
		data = [ 6, 4, 3, 3, 5, 7, 7, 8, 1 ];

		assert.strictEqual( quantile( data, 0.5 ), 5 );
	});

});
