'use strict';

const globby = require('globby');

const {
  migrateToDockerStaticSync,
} = require('./migrate');

module.exports = async function (options) {
  const patterns = options.files;
  const paths = await globby(patterns);
  paths.map(i => migrateToDockerStaticSync(i));
  return paths;
};
