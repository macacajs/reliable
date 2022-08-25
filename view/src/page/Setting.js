import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
              <FormattedMessage id="sidebar.homepage" />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <FormattedMessage id="sidebar.setting" />
          </Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ marginTop: 10 }} title={<FormattedMessage id="setting.dingMessage" />}>
          <div data-accessibilityid="dingtalk-webhooks">
            <DingdingSetting />
          </div>
        </Card>
        <Card style={{ marginTop: 10 }} title={<FormattedMessage id="setting.site" />}>
          <SiteSetting />
        </Card>
        <Card style={{ marginTop: 10 }} title={<FormattedMessage id="setting.versioning" />}>
          reliable-web: { window.pageConfig.version }
        </Card>
      </ReliableLayout>
    );
  }
}
