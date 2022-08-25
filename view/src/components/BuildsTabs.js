import React from 'react';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import safeGet from 'lodash/get';

import request from '../util/request';
import BuildsTable from './BuildsTable';
import {
  PAGE_SIZE,
} from '../constants/index';
import { logger, queryParse } from '../util/index';

const { TabPane } = Tabs;

class BuildsTabs extends React.Component {
  state = {
    data: [],
    loading: false,
    jobName: queryParse(location.search).jobName || '',
    allJobName: [],
    pagination: {
      pageSize: PAGE_SIZE,
    },
  };

  getBuildsInfo(res) {
    const result = [];
    res.forEach(item => {
      // common fields
      const { jobName } = item;
      const { buildNumber } = item;
      const { platform } = item.data.environment;
      const buildEndTime = item.createdAt;
      const { testInfo } = item.data;
      const { gitCommitInfo } = item.data;
      const buildUniqId = item.uniqId;
      const hasDeployed = Array.isArray(item.deploys)
        && item.deploys.some(deploy => { return deploy.state === 'SUCCESS'; });
      const { state } = item;

      const formattedItem = {
        buildNumber,
        jobName,
        platform,
        testInfo,
        buildEndTime,
        gitCommitInfo,
        buildUniqId,
        hasDeployed,
        state,
      };

      const buildData = item.data;
      const runnerType = safeGet(buildData, 'environment.ci.RUNNER_TYPE');
      // TODO remove
      const isGitlab = buildData.environment && buildData.environment.gitlab_ci;
      if (runnerType === 'GITLAB_CI' || isGitlab) {
        Object.assign(formattedItem, {
          buildUrl: `${buildData.gitCommitInfo.gitUrl}/builds/${buildNumber}`,
          configureUrl: buildData.gitCommitInfo.gitUrl,
          buildLogUrl: `${buildData.gitCommitInfo.gitUrl}/builds/${buildNumber}`,
        });
      }
      result.push(formattedItem);
    });
    return result;
  }

  updatePagination = (pagination, tab) => {
    const pager = { ...this.state.pagination };
    Object.assign(pager, pagination);
    this.setState({
      pagination: pager,
    }, () => {
      this.fetch(pagination, tab);
    });
  }

  fetch = (pager, tab) => {
    const param = {
      num: pager && pager.pageSize || this.state.pagination.pageSize,
      page: pager && pager.current || 1,
      jobName: tab,
    };
    logger('request getBuildsTable', param);

    this.setState({ loading: true });

    request('getBuildsTable', 'GET', param).then((res) => {
      if (res.success && res.data && res.data.result) {
        logger('getBuildsTable res', res);
        const data = this.getBuildsInfo(res.data.result);

        // Read total count from server
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.total;

        this.setState({
          loading: false,
          data,
          pagination,
          allJobName: res.data && res.data.allJobName || [],
        });
      } else {
        console.error(res);
      }
    });
  }

  handleTabClick = tab => {
    const pagination = {
      pageSize: PAGE_SIZE,
      current: 1,
    };
    const path = tab ? `./?jobName=${tab}` : './';

    this.setState({
      jobName: tab,
      pagination,
    });
    this.props.history.push(path);
    this.updatePagination(pagination, tab);
  }

  componentDidMount() {
    const tab = queryParse(location.search).jobName;
    this.setState({
      jobName: tab,
    });
    this.fetch({ ...this.state.pagination }, tab);
  }

  render() {
    const { allJobName } = this.state;
    const listItems = allJobName && allJobName.map(item => { return <TabPane tab={item} key={item}></TabPane>; }
    );
    return (
      <div>
        { listItems }
        <Tabs
          activeKey={this.state.jobName || ''}
          tabPosition="top"
          onTabClick={this.handleTabClick}
          style={{ height: 'auto' }}
        >
          <TabPane tab={<><FormattedMessage id="sidebar.allbuilds" /> ({allJobName.length})</>} key="">
          </TabPane>
          { listItems }
        </Tabs>
        <BuildsTable
          data={this.state.data}
          updatePagination={this.updatePagination}
          pagination={this.state.pagination}
          loading={this.state.loading}
          jobName={this.state.jobName}
        />
      </div>
    );
  }
}

export default withRouter(BuildsTabs);
