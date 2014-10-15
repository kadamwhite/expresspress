'use strict';

var wp = require( './wp' );
var cache = require( './content-cache' );
var _ = require( 'lodash' );
var RSVP = require( 'rsvp' );

/**
 * Recursively fetch all pages of a paged collection
 *
 * @param {Promise} request A promise to a WP API request's response
 * @returns {Array} A promise to an array of all matching records
 */
function all( request ) {
  return request.then(function( response ) {
    if ( ! response._paging || ! response._paging.next ) {
      return response;
    }
    // Request the next page and return both responses as one collection
    return RSVP.all([
      response,
      all( response._paging.next )
    ]).then(function( responses ) {
      return _.flatten( responses );
    });
  });
}

function siteInfo( prop ) {
  var siteInfoPromise = cache.get( 'site-info' );

  if ( ! siteInfoPromise ) {
    // Instantiate, request and cache the promise
    siteInfoPromise = wp.root( '/' ).then(function( info ) {
      return info;
    });
    cache.set( 'site-info', siteInfoPromise );
  }

  // Return the requested property
  return siteInfoPromise.then(function( info ) {
    return prop ? info[ prop ] : info;
  });
}

module.exports = {
  // Recursively page through a collection to retrieve all matching items
  all: all,
  // Get (and cache) the top-level information about a site, returning the
  // value corresponding to the provided key
  siteInfo: siteInfo
};
