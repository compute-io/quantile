Quantile
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes a [quantile](http://en.wikipedia.org/wiki/Quantile).

This module determines the nearest rank and returns the `array` value corresponding to that rank.

## Installation

``` bash
$ npm install compute-quantile
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var quantile = require( 'compute-quantile' );
```

#### quantile( x, p[, opts] )

Given a probability `0 <= p <= 1`, computes the quantile for input `x`. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var unsorted, q;

unsorted = [ 4, 3, 5, 1, 2 ];
q = quantile( unsorted, 0.25 );
// returns 2

unsorted = new Int8Array( unsorted );
q = quantile( unsorted, 0.25 );
// returns 2
```

The `quantile` function supports nine methods to calculate the sample quantiles:

| Method        |   Description |
| ------------- |:-------------:|
| 1      | Inverse of empirical distribution function. |
| 2      | Inverse of empirical distribution function. |
| 3      | The observation numbered closest to `N * p`.|
| 4      | Linear interpolation of the empirical distribution function.|
| 5      | Piecewise linear function where the knots are the values midway through the steps of the empirical distribution function.|
| 6      | Linear interpolation of the expectations for the order statistics for the uniform distribution on [0,1].|
| 7      | Linear interpolation of the modes for the order statistics for the uniform distribution on [0,1]. |
| 8      | Linear interpolation of the approximate medians for order statistics.|
| 9      | The resulting quantile estimates are approximately unbiased for the expected order statistics if x is normally distributed.|

The default method is type `7`. To specify a different method, you can set the `method` option to the respective number.

``` javascript
var unsorted, q;

unsorted = [ 4, 3, 5, 1, 2 ];
q = quantile( unsorted, 0.25, {
	'method': 4
});
// returns 1.25

q = quantile( unsorted, 0.25, {
	'method': 7
});
// returns 2
```

If the input `array` is already sorted in __ascending__ order, you can set the `sorted` option to `true`.

``` javascript
var sorted = [ 1, 2, 3, 4, 5 ];

var q = quantile( sorted, 0.25, { 'sorted': true } );
// returns 2
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':4},
	{'x':3},
	{'x':5},
	{'x':1},
	{'x':2},
];

function getValue( d, i ) {
	return d.x;
}

var q = quantile( data, 0.25, {
	'accessor': getValue
});
// returns 2
```

Notes:
The probability `p` is equal to `k / q`, where `q` is the total number of quantiles and `k` is the _k_ th quantile.

If the input `array` is not sorted in __ascending__ order, the function is `O( N log(N) )`, where `N` is the input `array` length. If the `array` is sorted, the function is `O(1)`.

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [quantile](http://en.wikipedia.org/wiki/Quantile). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [quantile](http://en.wikipedia.org/wiki/Quantile) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	median,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

median = quantile( mat, 0.5 );
/*
	[  2
	   7
	  12
	  17
	  22 ]
*/
```

To compute a [quantile](http://en.wikipedia.org/wiki/Quantile) along the rows, set the `dim` option to `1`.

``` javascript
median = quantile( mat, 0.5, {
	'dim': 1
});
/*
	[ 10, 11, 12, 13, 14 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
median = quantile( mat, 0.5, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 10, 11, 12, 13, 14 ]
*/

var dtype = median.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
median = quantile( mat, 0.5 );
// returns 3.5

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
median = quantile( mat, 0.5 );
// returns 3.5
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
median = quantile( [], 0.5 );
// returns null

median = quantile( new Int8Array( [] ), 0.5 );
// returns null

median = quantile( matrix( [0,0] ), 0.5 );
// returns null

median = quantile( matrix( [0,10] ), 0.5 );
// returns null

median = quantile( matrix( [10,0] ), 0.5 );
// returns null
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	quantile = require( 'compute-quantile' );

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

// ----
// non-default method
median = quantile( data, 0.5, {
	'method': 4
});

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

// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
median = quantile( data, 0.5 );

// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
median = quantile( mat, 0.5, {
	'dim': 1
});

// ----
// Matrices (along columns)...
median = quantile( mat, 0.5, {
	'dim': 2
});

// ----
// Matrices (custom output data type)...
median = quantile( mat, 0.5, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-quantile.svg
[npm-url]: https://npmjs.org/package/compute-quantile

[travis-image]: http://img.shields.io/travis/compute-io/quantile/master.svg
[travis-url]: https://travis-ci.org/compute-io/quantile

[coveralls-image]: https://img.shields.io/coveralls/compute-io/quantile/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/quantile?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/quantile.svg
[dependencies-url]: https://david-dm.org/compute-io/quantile

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/quantile.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/quantile

[github-issues-image]: http://img.shields.io/github/issues/compute-io/quantile.svg
[github-issues-url]: https://github.com/compute-io/quantile/issues
