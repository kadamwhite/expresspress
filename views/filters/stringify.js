'use strict';

var format = require( 'cliff' ).inspect;
var stripColorCodes = require( 'stripcolorcodes' );

function stringifyFilter( values ) {
  return stripColorCodes( format( values ) );
}

module.exports = stringifyFilter;
