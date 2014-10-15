'use strict';

var wp = require( '../services/wp' );
var contentService = require( '../services/content-service' );
var RSVP = require( 'rsvp' );
var _ = require( 'lodash' );
var express = require( 'express' );
var router = express.Router();

/* GET home page. */
router.get( '/', function( req, res, next ) {
  var posts = contentService.all( wp.posts() ).then(function( allPosts ) {
    return _.map( allPosts, function( post) {
      // Limit author info returned
      post.author = _.pick( post.author, [
        'id',
        'name',
        'slug'
      ]);

      // Format the date for easier readability
      post.date = new Date( post.date_gmt ).toString();

      return _.pick( post, [
        'author',
        'date',
        // 'excerpt',
        'slug',
        'title'
      ]);
    });
  });

  return RSVP.hash({
    title: 'Home',
    items: posts
  }).then(function(context) {
    res.render( 'index', context );
  }).catch( next );
});

module.exports = router;
