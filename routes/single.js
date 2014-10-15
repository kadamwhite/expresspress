'use strict';

var RSVP = require( 'rsvp' );
var _ = require( 'lodash' );
var express = require( 'express' );
var router = express.Router();
var wp = require( '../services/wp' );

function getSinglePost( req, res, next ) {
  console.log(req.params);

  var request = wp.posts().filter({
    monthnum: req.params.month,
    year: req.params.year,
    name: req.params.slug
  });

  console.log(request._renderURI());

  var post = request.then(function( posts ) {
    return _.first( posts );
  });

  return RSVP.hash({
    title: 'Post',
    post: post
  }).then(function( context ) {
    if ( ! context.post ) {
      // No post found: 404
      return next();
    }

    context.title = context.post.title;

    res.render( 'index', context );
  }).catch( next );
}

module.exports = getSinglePost;
