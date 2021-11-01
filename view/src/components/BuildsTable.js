'use strict';

import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Clipboard from 'awesome-clipboard';
import {
  Table,
} from 'antd';
import {
  SettingOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import {
  getUuid,
  mapBuildDataToColor,
} from '../util/index';

import './buildsTable.less';

export default class BuildsTable extends React.Component {
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.updatePagination(pager, this.props.jobName);
  }
  columns = [{
    title: <FormattedMessage id='builds.jobName' />,
    dataIndex: 'jobName',
    render: (text, record) =>
      <span>
        {text}
      </span>,
  }, {
    title: <FormattedMessage id='builds.buildLog' />,
    width: 100,
    render: (text, record) =>
      record.buildLogUrl
        ? <a
          href={record.buildLogUrl}
          target="_blank"
        >
          <FormattedMessage id='builds.buildLog' />
        </a>
        : <Link to={{ pathname: '/buildlog', search: `?jobName=${record.jobName}&buildNumber=${record.buildNumber}` }}>
          <FormattedMessage id='builds.buildLog' />
        </Link>,
  }, {
    title: <FormattedMessage id='builds.buildNumber' />,
    dataIndex: 'buildNumber',
    width: 160,
    render: (value, record) => (
      <span>
        <a
          href={record.configureUrl}
          target="_blank"
        >
          <SettingOutlined />
        </a>
        <a
          style={{
            marginLeft: 10,
          }}
          href={record.buildUrl}
          target="_blank"
        >
          {value}
        </a>
      </span>
    ),
  }, {
    title: <FormattedMessage id='builds.platform' />,
    dataIndex: 'platform',
  }, {
    title: <FormattedMessage id='builds.buildEndTime' />,
    dataIndex: 'buildEndTime',
    render: (text, record) => (
      <span>
        {dayjs(text).format('YYYY-MM-DD HH:mm:ss')}
      </span>
    ),
  }, {
    title: <FormattedMessage id='buildinfo.pkg.gitBranch' />,
    dataIndex: 'gitBranch',
    width: 240,
    render: (text, record) =>
      <span>
        {record.gitCommitInfo.gitBranch}
      </span>,
  }, {
    title: <FormattedMessage id='buildinfo.pkg.committer' />,
    dataIndex: 'committer',
    width: 120,
    render: (text, record) =>
      <span>
        {record.gitCommitInfo.committer.name}
      </span>,
  }, {
    title: <FormattedMessage id='builds.detailInfo' />,
    align: 'center',
    width: 80,
    render: (value, record) => {
      if (record.state === 'INIT') return;
      return (
        record.buildNumber
          ? <Link
            to={{
              pathname: '/buildinfo',
              search: `?jobName=${record.jobName}&buildNumber=${record.buildNumber}`,
            }}
          >
            <RightCircleOutlined />
          </Link>
          : ''
      );
    },
  },
  ];

  render () {
    return (
      <div>
        <Table
          className="builds-table"
          columns={this.columns}
          rowKey={record => record.buildNumber + getUuid()}
          rowClassName={record => mapBuildDataToColor(record)}
          dataSource={this.props.data}
          loading={this.props.loading}
          pagination={this.props.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
