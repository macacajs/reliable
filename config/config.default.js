'use strict';

const path = require('path');
const dbConfig = require('../database/config');

const config = {};

config.siteFile = {
  '/favicon.ico': 'https://macacajs.github.io/assets/favicon.ico',
};

// use for cookie sign key, should change to your own and keep security
config.keys = (process.env.RELIABLE_SECRET_KEY || 'reliable') + '_1528180445670_8068';

// add your config here
config.middleware = [
  'forbidden',
  'hostRedirect',
  'openApiAuthorize',
  'authorize',
  'inject',
  'cors',
  'errorHandler',
];

config.hostRedirect = {
  enable: !!process.env.RELIABLE_DEFAULT_HOST,
  defaultHost: process.env.RELIABLE_DEFAULT_HOST,
  ignore: [
    /^\/api\//,
  ],
};

config.authorize = {
  enable: process.env.RELIABLE_ENABLE_AUTHORIZE === 'Y',
  ignore: [
    '/snsAuthorize/callback/dingtalk',
    '/snsAuthorize/auth',
    '/snsAuthorize/signout',

    '/api/gw',
    '/api/latestBuild/:id',
    '/api/app/:id',
    '/api/build/:id',
  ],
  dingtalkAuth: {
    appid: process.env.RELIABLE_AUTH_DINGTALK_APPID,
    appsecret: process.env.RELIABLE_AUTH_DINGTALK_APPSECRET,
    callbackUrl: '/snsAuthorize/callback/dingtalk',
  },
};

config.openApiAuthorize = {
  enable: process.env.RELIABLE_ENABLE_OPENAPI_AUTHORIZE === 'Y',
  match: [
    '/api/gw',
    '/api/latestBuild/:id',
    '/api/app/:id',
    '/api/build/:id',
  ],
};

config.session = {
  maxAge: 48 * 3600 * 1000, // 48 hours
  renew: true, // keep session
};

config.modelQueryConfig = {
  pagination: {
    // default num
    num: 10,
  },
};

config.errorHandler = {
  match: '/api',
};

const reliableHost = process.env.RELIABLE_HOST || '127.0.0.1';

config.reliableView = {
  serverUrl: '',
  reliableHost,
};

config.security = {
  csrf: {
    enable: false,
  },
  methodnoallow: {
    enable: false,
  },
};

config.sequelize = dbConfig.development;

const distDirName = 'dist';
config.static = {
  prefix: `/${distDirName}/`,
  dir: path.resolve(__dirname, '..', 'view', distDirName),
};

config.site = {
  logo: 'https://macacajs.github.io/reliable/logo/reliable.svg',
  name: 'Reliable',
  links: {
    document: 'https://macacajs.github.io/reliable',
    issues: 'https://github.com/macacajs/reliable/issues?utf8=%E2%9C%93&q=',
  },
};

module.exports = config;
