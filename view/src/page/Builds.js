import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';


import { queryParse } from '../util/index';
import BuildsTabs from '../components/BuildsTabs';
import ReliableLayout from '../components/ReliableLayout';

export default class Builds extends React.Component {
  render() {
    const { jobName } = queryParse(location.search);
    return (
      <ReliableLayout>
        <Breadcrumb style={{ marginBottom: '10px' }}>
          <Breadcrumb.Item>
            <Link to="/"><FormattedMessage id="sidebar.homepage" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/"><FormattedMessage id="sidebar.allbuilds" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            { jobName ? <Link to={{ pathname: '/', search: `jobName=${jobName}` }}>{jobName}</Link> : '' }
          </Breadcrumb.Item>
        </Breadcrumb>
        <BuildsTabs />
      </ReliableLayout>
    );
  }
}
