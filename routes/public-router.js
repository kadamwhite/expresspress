'use strict';

var express = require( 'express' );
var router = express.Router();

// Public Routes
// =============

router.use( '/', require( './index' ) );
// router.use( '/search', require( './search' ) );
// router.use( '/:year/:month', require( './archive-year-month' ) );
// router.use( '/:year/:month/:slug', require( './single' ) );
// router.use( '/tags/', require( './tags' ) );
// router.use( '/categories/', require( './categories' ) );

// catch 404 and forward to error handler
router.use(function( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next(err);
});

// Error Handling
// ==============

// development error handler
// will print stacktrace
function developmentErrorRoute( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: err
  });
}

// production error handler
// no stacktraces leaked to user
function friendlyErrorRoute( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: {}
  });
}

// Configure error-handling behavior
if ( router.get( 'env' ) === 'development' ) {
  router.use( developmentErrorRoute );
} else {
  router.use( friendlyErrorRoute );
}

module.exports = router;
