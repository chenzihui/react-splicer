'use strict';

export function debounce(fn, delay) {
  let timeout;

  return function() {
    let self = this,
        args = arguments;

    let later = function() {
      timeout = null;
      fn.apply(self, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};
