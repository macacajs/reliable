'use strict';

const path = require('path');

const _ = require('./helper');

const {
  shelljs,
  mkdir,
} = _;

const {
  JOB_NAME,
  BUILD_NUMBER,
} = process.env;

exports.migrateToDockerStaticSync = (relativePath, ruleType = 'jenkins') => {
  const distDir = `${_.getStaticServerRoot()}/${ruleType}/${_.normalizeJobName(JOB_NAME)}/${BUILD_NUMBER}`;
  mkdir(distDir);
  const originPath = path.resolve(relativePath);
  const distPath = path.join(distDir, relativePath);
  mkdir(path.dirname(distPath));
  console.log(`file copy: ${originPath} >> ${distPath}`);
  shelljs.cp(originPath, distPath);
};
