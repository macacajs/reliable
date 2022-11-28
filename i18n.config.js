'use strict';

const path = require('path');

module.exports = {
  srcDirs: [
    'view/src/**/*{.js,.jsx,.ts,.tsx}',
  ],
  distDir: path.resolve(__dirname, 'view/src/locale'),
  tokenName: '__i18n',
  debug: true,
};
