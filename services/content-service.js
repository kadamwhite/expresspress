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

/**
 * Get an alphabetized list of categories
 *
 * All archive routes display a sorted list of categories in their sidebar.
 * We generate that list here to ensure the sorting logic isn't duplicated
 * across routes.
 *
 * @method sortedCategories
 * @return {Array} An array of category objects
 */
function sortedCategories() {
  return all( wp.categories() ).then(function( categories ) {
    return _.chain( categories )
      .sortBy( 'slug' )
      .value();
  });
}

function sortedCategoriesCached() {
  var categoriesPromise = cache.get( 'sorted-categories' );

  if ( ! categoriesPromise ) {
    categoriesPromise = sortedCategories();
    cache.set( 'sorted-categories', categoriesPromise );
  }

  return categoriesPromise;
}

/**
 * Get an alphabetized list of tags
 *
 * @method sortedTags
 * @return {Array} An array of tag objects
 */
function sortedTags() {
  return all( wp.tags() ).then(function( tags ) {
    return _.chain( tags )
      .sortBy( 'slug' )
      .value();
  });
}

function sortedTagsCached() {
  var tagsPromise = cache.get( 'sorted-tags' );

  if ( ! tagsPromise ) {
    tagsPromise = sortedTags();
    cache.set( 'sorted-tags', tagsPromise );
  }

  return tagsPromise;
}

function getSidebarContent() {
  return RSVP.hash({
    categories: sortedCategoriesCached(),
    tags: sortedTagsCached()
  });
}

module.exports = {
  // Recursively page through a collection to retrieve all matching items
  all: all,
  // Get (and cache) the top-level information about a site, returning the
  // value corresponding to the provided key
  siteInfo: siteInfo,
  sortedCategories: sortedCategories,
  sortedCategoriesCached: sortedCategoriesCached,
  sortedTags: sortedTags,
  sortedTagsCached: sortedTagsCached,
  getSidebarContent: getSidebarContent
};
