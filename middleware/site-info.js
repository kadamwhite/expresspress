'use strict';

var contentService = require( '../services/content-service' );

// Add the absolute url to the locals object so it is available in templates.
// This is mainly used for the social media sharing links, to provide the
// absolute URL to the page being shared.
module.exports = function(req, res, next) {
  contentService.siteInfo().then(function( info ) {
    // Add site info as a local
    console.log('setting res.locals');
    res.locals.site = {
      name: info.name,
      description: info.description
    };
    // Continue with the request chain
  }).then( next.bind( null, null ), next );
};
