'use strict';

var wp = require( '../services/wp' );
var contentService = require( '../services/content-service' );
var pageNumbers = require( '../services/page-numbers' );
var pageTitle = require( '../services/page-title' );
var RSVP = require( 'rsvp' );

function getcategoryArchive( req, res, next ) {
  var categorySlug = req.params.category;
  var pages = pageNumbers( req.params.page );
  var category = contentService.categoryCached( categorySlug );

  RSVP.hash({
    archiveBase: '/categorys/' + categorySlug,
    pages: pages,
    category: category,
    title: category.then(function( category ) {
      if ( ! category ) { return ''; }
      return pageTitle( 'Posts in "' + category.name + '"' );
    }),
    // Primary page content
    posts: wp.posts().category( categorySlug ).page( pages.current ),
    sidebar: contentService.getSidebarContent()
  }).then(function( context ) {
    if ( req.params.page && ! context.posts.length ) {
      // Invalid archive page (no posts): 404
      return next();
    }

    if ( ! context.category ) {
      // category not found: 404
      return next();
    }

    return res.render( 'archive-category', context );
  }).catch( next );
}

module.exports = getcategoryArchive;
