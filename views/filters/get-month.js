'use strict';

function getMonthFromDate( date ) {
  if ( ! ( date instanceof Date ) ) {
    date = new Date( date );
  }
  // getMonth is 0-indexed
  var month = date.getMonth() + 1;
  // Convert to a string and pad to two digits
  return ( month < 10 ? '0' : '' ) + month;
}

module.exports = getMonthFromDate;
