'use strict';

function getYearFromDate( date ) {
  if ( ! ( date instanceof Date ) ) {
    date = new Date( date );
  }
  return date.getFullYear();
}

module.exports = getYearFromDate;
