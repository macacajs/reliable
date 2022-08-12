'use strict';

const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

module.exports = async (context, options = {}) => {
  return template.replace(/<!--\s*data\s*-->/, () => {
    return `
          <script>
            window.pageConfig = ${JSON.stringify(options, null, 2)};
            window.context = ${JSON.stringify(context, null, 2)};
          </script>
        `;
  }).replace(/<!--\s*title\s*-->/, () => {
    return `${options.title}`;
  });
};

