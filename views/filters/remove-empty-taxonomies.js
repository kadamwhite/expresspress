'use strict';

var _ = require( 'lodash' );

function removeEmptyTags( collection ) {
  return _.filter( collection, function( term ) {
    return term.count > 0;
  });
}

module.exports = removeEmptyTags;
