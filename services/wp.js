var WP = require( 'wordpress-rest-api' );
var _ = require( 'lodash' );

var config = _.pick( require( './config' ).wordpress, [
  // Whitelist valid config keys
  'username',
  'password',
  'endpoint'
]);

var wp = new WP( config );

module.exports = wp;
