'use strict';

const os = require('os');

const _ = require('./helper');

module.exports = () => {
  const env = process.env;
  return {
    platform: _.getPlatformType(),
    ci: {
      JOB_NAME: _.normalizeJobName(env.JOB_NAME),
      BUILD_NUMBER: env.BUILD_NUMBER,
      RUNNER_TYPE: 'JENKINS', // GITLAB_CI
    },
    os: {
      nodeVersion: process.version,
      platform: os.platform(),
    },
  };
};
