import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import request from '../util/request';
import { logger, queryParse } from '../util/index';
import OneBuildTabs from '../components/OneBuildTabs';
import ReliableLayout from '../components/ReliableLayout';

export default class Builds extends React.Component {
  state = {
    data: {},
    loading: true,
  };

  fetchOneBuild = () => {
    this.setState({
      loading: true,
    });
    request('getOneBuildTable', 'GET', queryParse(location.href)).then(res => {
      logger('getOneBuildTable res', res);
      if (res.success) {
        try {
          const buildData = res.data.data;
          buildData.buildUniqId = res.data.uniqId;
          logger('buildData res', buildData);
          this.setState({
            data: buildData,
          });
        } catch (e) {
          console.error('getOneBuildTable error', res, e);
        }
      } else {
        console.error('getOneBuildTable failed', res);
      }
      this.setState({ loading: false });
    }).catch(e => {
      console.error('getOneBuildTable error', e);
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.fetchOneBuild();
  }

  render() {
    const { buildNumber, jobName } = queryParse(location.search);
    return (
      <ReliableLayout>
        <Breadcrumb style={{ marginBottom: '10px' }}>
          <Breadcrumb.Item>
            <Link to="/">{__i18n('主页')}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/">{__i18n('所有构建')}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={{ pathname: '/', search: `jobName=${jobName}` }}>{jobName}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{buildNumber}</Breadcrumb.Item>
        </Breadcrumb>

        <OneBuildTabs
          loading={this.state.loading}
          fetchOneBuild={this.fetchOneBuild}
          data={this.state.data}
        />
      </ReliableLayout>
    );
  }
}
