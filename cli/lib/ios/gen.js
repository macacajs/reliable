'use strict';

const fs = require('fs');
const path = require('path');
const moment = require('moment');

const Render = require('microtemplate').render;

exports.genDownloadHtml = (options) => {
  const template = options.customTemplatePath || path.join(__dirname, 'download.template.html');
  const content = fs.readFileSync(template, 'utf8');
  options.time = moment().format('YYYY-MM-DD HH:mm:ss');
  const output = Render(content, options, {
    tagOpen: '<#',
    tagClose: '#>',
  });
  return output;
};

exports.genPlist = (options) => {
  const template = path.join(__dirname, 'plist.template');
  const content = fs.readFileSync(template, 'utf8');
  const output = Render(content, options, {
    tagOpen: '<#',
    tagClose: '#>',
  });
  return output;
};
