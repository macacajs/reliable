'use strict';

export const strUtil = {
  cutStrTail(length, str) {
    if (typeof str === 'string' && str.length > 0) {
      return str && str.length > length ? `${str.substring(0, length)}...` : str;
    } else {
      return '无';
    }
  },
};
