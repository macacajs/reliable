'use strict';

const _ = require('lodash');
const Service = require('egg').Service;

module.exports = class BuildService extends Service {
  async buildUserInfo() {
    const { ctx, app } = this;
    const res = _.get(ctx, app.config.admin.userKey);
    if (app.config.admin.list.includes(res)) {
      return {
        isAdmin: true,
      };
    }
    return {};
  }
};
