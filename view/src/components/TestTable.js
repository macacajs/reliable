import React from 'react';
import { Table } from 'antd';


import { getUuid } from '../util/index';

const columns = [{
  title: __i18n('行覆盖率'),
  dataIndex: 'lineCoverage',
  render: value => { return <span>{value ? `${value}%` : ''}</span>; },
  width: 100,
}, {
  title: __i18n('通过率'),
  dataIndex: 'passingRate',
  render: (text, record) => {
    return (
      <span>
        {
        record.testInfo.passPercent
          ? (
            <span>
              <a href={record.testReporter} target="_blank">
                {record.testInfo.passPercent}%
              </a>&nbsp;
              {record.testInfo.passes}/{record.testInfo.tests}
            </span>
          )
          : null
      }
      </span>
    );
  },
  width: 140,
}, {
  title: __i18n('测试报告'),
  dataIndex: 'testReporter',
  render: value => { return (value ? <a href={value} target="_blank">{__i18n('查看')}</a> : ''); },
}, {
  title: __i18n('覆盖率报告'),
  dataIndex: 'coverageReporter',
  render: value => { return (value ? <a href={value} target="_blank">{__i18n('查看')}</a> : ''); },
}, {
  title: __i18n('代码分支'),
  dataIndex: 'gitBranch',
  width: 240,
}, {
  title: __i18n('提交链接'),
  dataIndex: 'gitCommit',
  render: (value, record) => {
    return (
      <a href={record.gitHref} target="_blank">
        <span>{value}</span>
      </a>
    );
  },
}, {
  title: __i18n('提交人'),
  dataIndex: 'committer',
}, {
  title: __i18n('提交时间'),
  dataIndex: 'commitTime',
}];

export default class TesTable extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => { return record.testId + getUuid(); }}
        dataSource={this.props.data}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
