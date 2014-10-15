'use strict';

var config = require( './config' );

// Caching for common requests
var LRU = require( 'lru-cache' );

var cache = LRU({
  max: 50,
  maxAge: config.wordpress.cacheLimit
});

module.exports = cache;
