'use strict';

var contentService = require( './content-service' );

/**
 pageTitle takes any number of strings, and produces a formatted HTML title
 string in which the provided arguments are separated by | and followed by
 the site title.

 @method pageTitle
 @param titleComponent* {String} Value(s) to be included in the rendered title
 @return {Promise} A promise to a formatted title string
 */
function pageTitle() {
  var titleComponents = Array.prototype.slice.call( arguments );
  var siteNameRequest = contentService.siteInfo( 'name' );
  return siteNameRequest.then(function( siteName ) {
    return titleComponents
      .concat( siteName )
      .join(' | ');
  });
}

module.exports = pageTitle;
