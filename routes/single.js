'use strict';

var RSVP = require( 'rsvp' );
var _ = require( 'lodash' );
var wp = require( '../services/wp' );
var pageTitle = require( '../services/page-title' );

function getSinglePost( req, res, next ) {
  var post = wp.posts().filter({
    monthnum: req.params.month,
    year: req.params.year,
    name: req.params.slug
  }).then(function( posts ) {
    return _.first( posts );
  });

  RSVP.hash({
    title: post.then(function( post ) {
      return pageTitle( post && post.title );
    }),
    post: post
  }).then(function( context ) {
    if ( ! context.post ) {
      // No post found: 404
      return next();
    }

    res.render( 'single', context );
  }).catch( next );
}

module.exports = getSinglePost;
