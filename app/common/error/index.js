'use strict';

// key: error code
// value: error details
// value.message: default error message
module.exports = new Map([
  [
    'ERR_RELIABLE_INTERNAL_SERVER_ERROR', {
      message: 'Internal server error.',
    },
  ],
  [
    'ERR_RELIABLE_INVALID_PARAM_ERROR', {
      message: 'Invalid parameters.',
    },
  ],
  [
    'ERR_RELIABLE_BUILD_RECORD_NOT_FOUND', {
      message: 'Build record not found.',
    },
  ],
]);
