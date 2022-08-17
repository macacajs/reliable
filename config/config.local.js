'use strict';

module.exports = () => {
  const config = (exports = {});

  config.reliableView = {
    assetsUrl: '//127.0.0.1:8080',
  };
  config.authorize = {
    enable: false,
    dingtalkAuth: {
      appid: '',
      appsecret: '',
    },
  };
  config.openApiAuthorize = {
    enable: true,
  };
  config.hostRedirect = {
    enable: false,
    defaultHost: '',
  };

  // inject-extra-config
  return config;
};
