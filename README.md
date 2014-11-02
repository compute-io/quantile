Quantile
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes a [quantile](http://en.wikipedia.org/wiki/Quantile) for a numeric array.

This module determines the nearest rank and returns the `array` value corresponding to that rank.

This module does __not__ currently support multiple interpolation methods, and instead uses a standard [elementary method](http://en.wikipedia.org/wiki/Quantile#Estimating_the_quantiles_of_a_population) for estimating the quantile.


## Installation

``` bash
$ npm install compute-quantile
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var quantile = require( 'compute-quantile' );
```

#### quantile( arr, p[, opts] )

Given a probability `0 <= p <= 1`, computes the quantile for an input `array`.

``` javascript
var unsorted = [ 4, 3, 5, 1, 2 ];

var q = quantile( unsorted, 0.25 );
// returns 2
```

If the input `array` is already sorted in __ascending__ order, you can set the `sorted` option to `true`.

``` javascript
var sorted = [ 1, 2, 3, 4, 5 ];

var q = quantile( sorted, 0.25, { 'sorted': true } );
// returns 2
```


## Examples

``` javascript
var quantile = require( 'compute-quantile' );

// Simulate some data...
var data = new Array( 1000 );

for ( var i = 0, len = data.length; i < len; i++ ) {
	data[ i ] = Math.round( Math.random()*1000 );
}

// Compute the p-quantile for p = 0.5 (median):
console.log( quantile( data, 0.5 ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The probability `p` is equal to `k / q`, where `q` is the total number of quantiles and `k` is the _k_ th quantile.

If the input `array` is not sorted in __ascending__ order, the function is `O( N log(N) )`, where `N` is the input `array` length. If the `array` is sorted, the function is `O(1)`.


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


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
