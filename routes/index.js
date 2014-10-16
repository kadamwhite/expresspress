'use strict';

var wp = require( '../services/wp' );
var contentService = require( '../services/content-service' );
var pageNumbers = require( '../services/page-numbers' );
var pageTitle = require( '../services/page-title' );
var RSVP = require( 'rsvp' );

function getHomepage( req, res, next ) {
  var pages = pageNumbers( req.params.page );

  RSVP.hash({
    archiveBase: '',
    pages: pages,
    title: pageTitle(),
    // Primary page content
    posts: wp.posts().page( pages.current ),
    sidebar: contentService.getSidebarContent()
  }).then(function( context ) {
    if ( req.params.page && ! context.posts.length ) {
      // Invalid pagination: 404
      return next();
    }

    res.render( 'index', context );
  }).catch( next );
}

module.exports = getHomepage;
