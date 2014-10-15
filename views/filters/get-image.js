'use strict';

var _ = require( 'lodash' );

var validSizes = [
  'large',
  'medium',
  'thumbnail'
];

var validProps = [
  'url',
  'width',
  'height'
];

/**
 Get the banner image URL off a CMS post's featured_image object: it will
 return either the URL associated with the specified image crop (defaulting
 to "large"), or the URL for the original image itself.

 @param {Object} featuredImage The featured_image property of a post object
 @param {String} [size] The size of the image version to retrieve (one of
                        "thumbnail", "medium" or "large")
 @param {String} [prop] A property name to return: "url", "width" or "height"
 @return {Object} An object with url, width & height parameters
 */
function getImageSize( featuredImage, size, prop ) {
  /*jshint -W106 */// Disable underscore_case warnings: WP uses them
  var image = {};

  if ( ! featuredImage ) {
    // Bad arguments: return empty object
    return image;
  }

  if ( ! size || ! _.contains( validSizes, size ) ) {
    // Default size to "large"
    size = 'large';
  }

  var src = featuredImage.source;
  var meta = featuredImage.attachment_meta;

  if ( ! meta || ! src ) {
    // Malformed: return empty object
    return image;
  }

  var sizes = meta.sizes;

  if ( sizes && sizes[ size ] ) {
    image = _.pick( sizes[ size ], [
      'url',
      'width',
      'height'
    ]);
  } else {
    image = {
      url: src,
      width: meta.width,
      height: meta.height
    };
  }

  return prop && _.contains( validProps, prop ) ?
    image[ prop ] :
    image;
}

module.exports = getImageSize;
