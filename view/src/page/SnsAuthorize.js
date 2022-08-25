import React from 'react';
import Script from 'react-load-script';
import queryString from 'query-string';
import safeGet from 'lodash.get';
import { DingdingOutlined } from '@ant-design/icons';

import ReliableLayout from '../components/ReliableLayout';

const appid = safeGet(window, 'context.dingtalkAuth.appid');
const callbackUrl = `${location.protocol}//${location.hostname}${safeGet(window, 'context.dingtalkAuth.callbackUrl')}`;

export default class Builds extends React.Component {
  handleScriptError = () => {
    console.log('handleScriptError');
  }

  handleScriptLoad = () => {
    this.addHandler();
    this.initAuth();
  }

  addHandler = () => {
    const hanndleMessage = event => {
      const { origin } = event;
      if (origin === 'https://login.dingtalk.com') {
        const loginTmpCode = event.data;
        this.redirectToCallbackUrl(loginTmpCode);
      }
    };

    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', hanndleMessage, false);
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onmessage', hanndleMessage);
    }
  }

  redirectToCallbackUrl = loginTmpCode => {
    const query = queryString.stringify({
      appid,
      response_type: 'code',
      scope: 'snsapi_login',
      state: 'STATE',
      redirect_uri: callbackUrl,
      loginTmpCode,
    });
    location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?${query}`;
  }

  initAuth = () => {
    const query = queryString.stringify({
      appid,
      response_type: 'code',
      scope: 'snsapi_login',
      state: 'STATE',
      redirect_uri: callbackUrl,
    });
    const goto = encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?${query}`);
    window.DDLogin({
      id: 'login_container',
      goto,
      style: 'border:none;background-color:#FFFFFF;',
      width: '365',
      height: '400',
    });
  }

  render() {
    return (
      <ReliableLayout hideMenu>
        <Script
          url="//g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad}
        />
        <div style={{
          width: '365px',
          margin: 'auto',
          textAlign: 'center',
        }}
        >
          <div style={{ fontSize: '1rem' }}>Sign in with Dingtalk
            <DingdingOutlined style={{ fontSize: '1.5rem' }} />
          </div>
          <div id="login_container" />
        </div>
      </ReliableLayout>
    );
  }
}
