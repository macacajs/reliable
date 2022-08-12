'use strict';

const LCL = require('last-commit-log');

module.exports = directory => {
  const lcl = new LCL(directory);
  return lcl.getLastCommitSync();
};
