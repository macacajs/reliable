'use strict';

const dbConfig = require('../database/config');

module.exports = appInfo => {
  const config = exports = {};

  config.sequelize = dbConfig.test;
  config.keys = appInfo.name + '_unittest_key';

  // inject-extra-config
  return config;
};
