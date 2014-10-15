'use strict';

function formatDate( date ) {
  if ( ! date instanceof Date ) {
    date = new Date( date );
  }
  return date.toString();
}

module.exports = formatDate;
