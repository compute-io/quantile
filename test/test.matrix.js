/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	quantile = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix quantile', function tests() {

	var data,
		mat,
		i;

	data = new Int32Array( 81 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}
	mat = matrix( data, [9,9], 'int8' );

	it( 'should export a function', function test() {
		expect( quantile ).to.be.a( 'function' );
	});

	it( 'should compute a quantile along matrix columns', function test() {
		var out, median, expected;

		out = matrix( [9,1], 'float64' );

		median = quantile( out, mat, 0.5 );
		expected = '4;13;22;31;40;49;58;67;76';

		assert.strictEqual( median.toString(), expected );

		median = quantile( out, mat, 0.5, false, 7 );
		expected = '4;13;22;31;40;49;58;67;76';

		assert.strictEqual( median.toString(), expected );
	});

    it( 'should compute a quantile along matrix columns for already sorted rows', function test() {
        var out, median, expected;

        out = matrix( [9,1], 'float64' );

		median = quantile( out, mat, 0.5, true );
        expected = '4;13;22;31;40;49;58;67;76';

        assert.strictEqual( median.toString(), expected );

		median = quantile( out, mat, 0.5, true, 7 );
        expected = '4;13;22;31;40;49;58;67;76';

        assert.strictEqual( median.toString(), expected );
    });

	it( 'should compute a quantile along matrix rows', function test() {
		var out, median, max, min, expected;

		out = matrix( [1,9], 'float64' );

		// Method 1
		median = quantile( out, mat, 0.5, false, 1 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 1 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 1 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );


		// using sorted option
		median = quantile( out, mat, 0.5, true, 1 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 1 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 1 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 2
		median = quantile( out, mat, 0.5, false, 2 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 2 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 2 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 2 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 2 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 2 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 3
		median = quantile( out, mat, 0.5, false, 3 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 3 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 3 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 3 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 3 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 3 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 4
		median = quantile( out, mat, 0.5, false, 4 );
		expected = '3.5,12.5,21.5,30.5,39.5,48.5,57.5,66.5,75.5';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 4 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 4 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 4 );
		expected = '3.5,12.5,21.5,30.5,39.5,48.5,57.5,66.5,75.5';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 4 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 4 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 5
		median = quantile( out, mat, 0.5, false, 5 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 5 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 5 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 5 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 5 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 5 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 6
		median = quantile( out, mat, 0.5, false, 6 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 6 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 6 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 6 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 6 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 6 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 7
		median = quantile( out, mat, 0.5, false, 7 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 7 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 7 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 7 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 7 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 7 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 8
		median = quantile( out, mat, 0.5, false, 8 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 8 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 8 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 8 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 8 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 8 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// Method 9
		median = quantile( out, mat, 0.5, false, 9 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, false, 9 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, false, 9 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

		// using sorted option
		median = quantile( out, mat, 0.5, true, 9 );
		expected = '4,13,22,31,40,49,58,67,76';
		assert.strictEqual( median.toString(), expected );

		max = quantile( out, mat, 1, true, 9 );
		expected = '8,17,26,35,44,53,62,71,80';
		assert.strictEqual( max.toString(), expected );

		min = quantile( out, mat, 0, true, 9 );
		expected = '0,9,18,27,36,45,54,63,72';
		assert.strictEqual( min.toString(), expected );

	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( quantile( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( quantile( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( quantile( out, mat ) );
	});

});
