'use strict';

const defaultConfig = {
  username: 'root',
  password: '',
  database: 'reliable_development',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || '3306',
  operatorsAliases: false,
  dialect: 'mysql',
  define: {
    underscored: false,
  },
};

module.exports = {
  development: defaultConfig,
  test: Object.assign({}, defaultConfig, {
    database: 'reliable_unittest',
  }),
  production: Object.assign({}, defaultConfig, {
    defaultConfig,
    database: 'reliable',
  }),
};
