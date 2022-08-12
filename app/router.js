'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;

  router.post('/api/gw', controller.gw.index);

  // latestBuild
  router.post('/api/latestBuild', controller.build.queryLatest);
  router.get('/api/latestBuild/:jobName/:gitBranch+', controller.build.queryLatestByJobNameAndGitBranch);
  router.get('/api/latestBuild/:jobName', controller.build.queryLatestByJobName);

  // insight
  router.get('/api/insight/ci', controller.insight.ci);

  // build
  router.get('/api/build', controller.build.query);
  router.get('/api/build/:uniqId', controller.build.show);
  router.put('/api/build/:uniqId', controller.build.update);
  router.patch('/api/build/:uniqId', controller.build.patch);

  // config
  router.get('/api/config', controller.config.show);
  router.post('/api/config', controller.config.update);

  // apps
  router.get('/api/app/:appId', controller.app.show);

  // delegate
  router.post('/api/delegate/message', controller.delegate.message);

  // oauth login callback
  router.get('/snsAuthorize/callback/dingtalk', controller.snsAuthorize.dingtalkCallback);
  router.get('/snsAuthorize/signout', controller.snsAuthorize.signOut);

  // home page
  router.get('*', controller.home.index);
};
