'use strict';

var _ = require( 'lodash' );

function sortByFilter( collection, prop ) {
  return _.sortBy( collection, prop );
}

module.exports = sortByFilter;
