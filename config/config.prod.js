'use strict';

const dbConfig = require('../database/config');
exports.sequelize = dbConfig.production;

// eslint-disable-next-line no-unused-vars
module.exports = appInfo => {
  const config = exports = {};

  // inject-extra-config
  return config;
};
