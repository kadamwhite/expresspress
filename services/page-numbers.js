'use strict';

/**
 pageNumbers takes a integer (as a string), and returns an object containing
 the provided integer, the integer + 1, and the integer -1. This simplistic
 service gives us an object that can be passed to templates in conjunction with
 a paging object to construct "next" / "previous" buttons in the Library.

 @method pageNumbers
 @param current {Integer} The integer representing the current page number
 @return {String} An object with `current`, `prev` and `next` page numbers
 */
function pageNumbers( current ) {
  // Request params come through as strings: convert to integers
  // If "current" is undefined, assume we're on the first page
  current = parseInt( current || 1, 10 );
  return {
    prev: current - 1,
    current: current,
    next: current + 1
  };
}

module.exports = pageNumbers;
