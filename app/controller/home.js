'use strict';

const {
  Controller,
} = require('egg');
const _ = require('lodash');

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const user = ctx.session.user;
    const { appid, callbackUrl } = ctx.app.config.authorize.dingtalkAuth;
    const siteConfig = await ctx.model.Config.findOne({ raw: true });
    const assetsUrl = _.get(siteConfig, 'data.site.assetsUrl');
    ctx.body = await app.render({
      dingtalkAuth: {
        appid,
        callbackUrl,
      },
      user,
    }, {
      title: `${app.config.site.name || 'Reliable'} | Reliable Suites for Macaca`,
      pageId: 'home',
      SERVER_ADDRESS: app.config.reliableView.serverUrl,
      assetsUrl: assetsUrl || app.config.reliableView.assetsUrl,
      version: app.config.pkg.version,
      siteConfig: app.config.site,
      user: await ctx.service.user.buildUserInfo(),
    });
  }
}

module.exports = HomeController;
