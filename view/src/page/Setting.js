import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  Breadcrumb,
} from 'antd';

import ReliableLayout from '../components/ReliableLayout';
import SiteSetting from '../components/SiteSetting';
import DingdingSetting from '../components/DingdingSetting';

import './Setting.less';

export default class Setting extends React.Component {
  render() {
    return (
      <ReliableLayout>
        <Breadcrumb style={{ marginBottom: '10px' }}>
          <Breadcrumb.Item>
            <Link to="/">
              {__i18n('主页')}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {__i18n('设置')}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ marginTop: 10 }} title={__i18n('钉钉消息设置')}>
          <div data-accessibilityid="dingtalk-webhooks">
            <DingdingSetting />
          </div>
        </Card>
        <Card style={{ marginTop: 10 }} title={__i18n('站点设置')}>
          <SiteSetting />
        </Card>
        <Card style={{ marginTop: 10 }} title={__i18n('版本信息')}>
          reliable-web: { window.pageConfig.version }
        </Card>
      </ReliableLayout>
    );
  }
}
