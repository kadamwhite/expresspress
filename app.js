'use strict';

var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );

var combynExpress = require( 'combynexpress' );
var stylus = require( 'stylus' );

var app = express();

// View engine setup
app.engine( 'tmpl', combynExpress() );
app.set('view engine', 'tmpl');

// Middleware setup
app.use( favicon( __dirname + '/public/favicon.ico' ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
  extended: false
}));
app.use( cookieParser() );

// Support stylus & serve static assets
function compileStylus( str, path ) {
  return stylus( str )
    .set( 'filename', path )
    // .set( 'sourcemap', true )
    .set( 'compress', true );
}

app.use( stylus.middleware({
  src: path.join( __dirname, 'public/stylus' ),
  dest: path.join( __dirname, 'public/css' ),
  compile: compileStylus
}) );

app.use( express.static( path.join( __dirname, 'public' ) ) );

// Require the public router
app.use( '/', require( './routes/public-router' ) );

module.exports = app;
