'use strict';

var path = require( 'path' );
var yaml = require( 'js-yaml' );
var fs = require( 'fs' );

var config;

var configPath = path.resolve( __dirname, '../config.yml' );

// Get document, or throw exception on error
try {
  config = yaml.safeLoad( fs.readFileSync( configPath, 'utf8' ) );
} catch( err ) {
  console.error( err );
}

module.exports = config;
