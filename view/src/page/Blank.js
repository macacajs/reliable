import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Alert, Breadcrumb } from 'antd';

import ReliableLayout from '../components/ReliableLayout';

export default class Setting extends React.Component {
  render() {
    return (
      <ReliableLayout>
        <Breadcrumb style={{ marginBottom: '10px' }}>
          <Breadcrumb.Item>
            <Link to="/"><FormattedMessage id="sidebar.homepage" /></Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Alert message="coming soon" type="info" showIcon />
      </ReliableLayout>
    );
  }
}
