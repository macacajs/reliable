'use strict';

import React from 'react';
import dayjs from 'dayjs';
import safeGet from 'lodash.get';
import { Spin, Tabs } from 'antd';
import { FormattedMessage } from 'react-intl';

import PkgTable from './PkgTable';
import TestTable from './TestTable';
import ExtraTable from './ExtraTable';
import FileTable from './FileTable';

const TabPane = Tabs.TabPane;

export default class OneBuildTabs extends React.Component {
  getExtraInfo () {
    const data = this.props.data;
    const result = [];
    if (data && data.extraInfo) {
      Object.keys(data.extraInfo).forEach(item => {
        result.push({
          extraName: item,
          extraContent: data.extraInfo[item],
        });
      });
    }
    return result;
  }

  getPkgInfo () {
    const data = this.props.data;
    const result = {
      packages: [],
      platform: safeGet(data, 'environment.platform'),
    };
    if (data && data.packages && data.packages.length && data.gitCommitInfo) {
      data.packages.forEach(item => {
        data.gitCommitInfo.commitTime = dayjs(data.gitCommitInfo?.date).format('YYYY-MM-DD HH:mm:ss');
        data.gitCommitInfo.gitHref = `${data.gitCommitInfo.gitUrl}/commit/${data.gitCommitInfo.hash}`;
        result.packages.push({
          ...item,
          download: item.path || '',
          gitCommitInfo: data.gitCommitInfo,
          buildUniqId: data.buildUniqId,
        });
      });
    }
    return result;
  }

  getTestInfo () {
    const data = this.props.data;
    const result = [];
    if (data && data.testInfo) {
      const report = data.testInfo.testHtmlReporterPath;
      const coverage = data.testInfo.coverageHtmlReporterPath;
      result.push({
        lineCoverage: data.testInfo.linePercent,
        passingRate: data.testInfo.passPercent,
        testInfo: data.testInfo,
        testReporter: report || '',
        coverageReporter: coverage || '',
        gitBranch: data.gitCommitInfo.gitBranch,
        gitCommit: data.gitCommitInfo.shortHash,
        gitHref: `${data.gitCommitInfo.gitUrl}/commit/${data.gitCommitInfo.hash}`,
        committer: data.gitCommitInfo.author?.name,
        committerEmail: data.gitCommitInfo.author?.email,
        commitTime: dayjs(data.gitCommitInfo?.date).format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    return result;
  }

  getFileInfo () {
    const data = this.props.data;
    const result = [];
    if (data && data.files && data.files.length) {
      data.files.forEach(item => {
        result.push({
          fileName: item,
          fileAddress: item || '',
        });
      });
    }
    return result;
  }

  onTabChange (type) {
    location.hash = `type=${type}`;
  }

  render () {
    if (this.props.loading) {
      return <Spin />;
    }
    const getPkgInfo = this.getPkgInfo();
    const activeTabKey = location.hash.replace('#type=', '');
    const fallBackActiveTabKey = getPkgInfo.packages.length ? 'pkginfo' : 'test';
    return (
      <div>
        <Tabs
          defaultActiveKey={activeTabKey || fallBackActiveTabKey}
          tabPosition="top"
          style={{ height: 'auto' }}
          onChange={this.onTabChange}
        >
          <TabPane tab={<FormattedMessage id='buildinfo.pkgTab' />} key="pkginfo">
            <PkgTable
              fetchOneBuild={this.props.fetchOneBuild}
              data={getPkgInfo.packages}
              platform={getPkgInfo.platform}
            />
          </TabPane>
          <TabPane tab={<FormattedMessage id='buildinfo.testTab' />} key="test">
            <TestTable data={this.getTestInfo()} />
          </TabPane>
          <TabPane tab={<FormattedMessage id='buildinfo.extraTab' />} key="extrainfo">
            <ExtraTable data={this.getExtraInfo()} />
          </TabPane>
          <TabPane tab={<FormattedMessage id='buildinfo.filesTab' />} key="fileinfo">
            <FileTable data={this.getFileInfo()} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

