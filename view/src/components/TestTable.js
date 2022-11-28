import React from 'react';
import { Table } from 'antd';


import { getUuid } from '../util/index';

const columns = [{
  title: <FormattedMessage id="buildinfo.test.lineCoverage" />,
  dataIndex: 'lineCoverage',
  render: value => { return <span>{value ? `${value}%` : ''}</span>; },
  width: 100,
}, {
  title: <FormattedMessage id="buildinfo.test.passPercent" />,
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
  title: <FormattedMessage id="buildinfo.test.testReporter" />,
  dataIndex: 'testReporter',
  render: value => { return (value ? <a href={value} target="_blank"><FormattedMessage id="buildinfo.test.reporter" /></a> : ''); },
}, {
  title: <FormattedMessage id="buildinfo.test.coverageReporter" />,
  dataIndex: 'coverageReporter',
  render: value => { return (value ? <a href={value} target="_blank"><FormattedMessage id="buildinfo.test.reporter" /></a> : ''); },
}, {
  title: <FormattedMessage id="buildinfo.pkg.gitBranch" />,
  dataIndex: 'gitBranch',
  width: 240,
}, {
  title: <FormattedMessage id="buildinfo.pkg.gitCommit" />,
  dataIndex: 'gitCommit',
  render: (value, record) => {
    return (
      <a href={record.gitHref} target="_blank">
        <span>{value}</span>
      </a>
    );
  },
}, {
  title: <FormattedMessage id="buildinfo.pkg.committer" />,
  dataIndex: 'committer',
}, {
  title: <FormattedMessage id="buildinfo.pkg.commitTime" />,
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
