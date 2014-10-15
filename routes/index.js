'use strict';

var wp = require( '../services/wp' );
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
    posts: wp.posts().page( pages.current )
  }).then(function( context ) {
    res.render( 'index', context );
  }).catch( next );
}

module.exports = getHomepage;
