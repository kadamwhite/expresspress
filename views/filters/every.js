'use strict';

function everyNItems( index, n, base ) {
  base = base || 0;
  return index >= base && (index - base) % n === 0;
}

module.exports = everyNItems;
