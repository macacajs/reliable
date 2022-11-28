import React from 'react';
import moment from 'moment';
import safeGet from 'lodash/get';
import { Spin, Tabs } from 'antd';

import PkgTable from './PkgTable';
import TestTable from './TestTable';
import ExtraTable from './ExtraTable';
import FileTable from './FileTable';

const { TabPane } = Tabs;

export default class OneBuildTabs extends React.Component {
  getExtraInfo() {
    const { data } = this.props;
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

  getPkgInfo() {
    const { data } = this.props;
    const result = {
      packages: [],
      platform: safeGet(data, 'environment.platform'),
    };
    if (data && data.packages && data.packages.length && data.gitCommitInfo) {
      data.packages.forEach(item => {
        data.gitCommitInfo.commitTime = moment(data.gitCommitInfo?.date).format('YYYY-MM-DD HH:mm:ss');
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

  getTestInfo() {
    const { data } = this.props;
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
        commitTime: moment(data.gitCommitInfo?.date).format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    return result;
  }

  getFileInfo() {
    const { data } = this.props;
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

  onTabChange(type) {
    location.hash = `type=${type}`;
  }

  render() {
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
          <TabPane tab={__i18n('包信息')} key="pkginfo">
            <PkgTable
              fetchOneBuild={this.props.fetchOneBuild}
              data={getPkgInfo.packages}
              platform={getPkgInfo.platform}
            />
          </TabPane>
          <TabPane tab={__i18n('测试结果')} key="test">
            <TestTable data={this.getTestInfo()} />
          </TabPane>
          <TabPane tab={__i18n('扩展信息')} key="extrainfo">
            <ExtraTable data={this.getExtraInfo()} />
          </TabPane>
          <TabPane tab={__i18n('产物')} key="fileinfo">
            <FileTable data={this.getFileInfo()} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
