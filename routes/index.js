'use strict';

var express = require( 'express' );
var router = express.Router();

var fixtureObjects = require( 'lodash' ).chain()
  .range( 40 )
  .map(function() {
    return Math.floor( Math.random() * 26 );
  })
  .unique()
  .map(function( rand ) {
    return {
      name: 'abcdefghijklmnopqrstuvwxyz'[rand],
      val: rand
    };
  })
  .value();

/* GET home page. */
router.get( '/', function( req, res ) {
  res.render( 'index', {
    title: 'Home',
    items: fixtureObjects
  });
});

module.exports = router;
