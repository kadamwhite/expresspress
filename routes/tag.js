'use strict';

var wp = require( '../services/wp' );
var contentService = require( '../services/content-service' );
var pageNumbers = require( '../services/page-numbers' );
var pageTitle = require( '../services/page-title' );
var RSVP = require( 'rsvp' );

function getTagArchive( req, res, next ) {
  var tagSlug = req.params.tag;
  var pages = pageNumbers( req.params.page );
  var tag = contentService.tagCached( tagSlug );

  RSVP.hash({
    archiveBase: '/tags/' + tagSlug,
    pages: pages,
    tag: tag,
    title: tag.then(function( tag ) {
      if ( ! tag ) { return ''; }
      return pageTitle( 'Posts tagged "' + tag.name + '"' );
    }),
    // Primary page content
    posts: wp.posts().tag( tagSlug ).page( pages.current ),
    sidebar: contentService.getSidebarContent()
  }).then(function( context ) {
    if ( req.params.page && ! context.posts.length ) {
      // Invalid archive page (no posts): 404
      return next();
    }

    if ( ! context.tag ) {
      // Tag not found: 404
      return next();
    }

    return res.render( 'archive-tag', context );
  }).catch( next );
}

module.exports = getTagArchive;
