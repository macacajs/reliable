import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
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
import { strUtil } from '../util/dataUtil';

export default class BuildsTable extends React.Component {
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.props.pagination, ...pagination };
    pager.current = pagination.current;
    this.props.updatePagination(pager, this.props.jobName);
  }

  columns = [{
    title: <FormattedMessage id="builds.jobName" />,
    dataIndex: 'jobName',
    render: (text, record) => {
      return (
        <span>
          {text}
        </span>
      );
    },
  }, {
    title: <FormattedMessage id="builds.buildLog" />,
    width: 100,
    render: (text, record) => {
      return (record.buildLogUrl
        ? (
          <a
            href={record.buildLogUrl}
            target="_blank"
          >
            <FormattedMessage id="builds.buildLog" />
          </a>
        )
        : (
          <Link to={{ pathname: '/buildlog', search: `?jobName=${record.jobName}&buildNumber=${record.buildNumber}` }}>
            <FormattedMessage id="builds.buildLog" />
          </Link>
        ));
    },
  }, {
    title: <FormattedMessage id="builds.buildNumber" />,
    dataIndex: 'buildNumber',
    width: 200,
    render: (value, record) => {
      return (
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
            {strUtil.cutStrTail(15, value)}
          </a>
        </span>
      );
    },
  }, {
    title: <FormattedMessage id="builds.platform" />,
    dataIndex: 'platform',
  }, {
    title: <FormattedMessage id="builds.buildEndTime" />,
    dataIndex: 'buildEndTime',
    render: (text, record) => {
      return (
        <span>
          {moment(text).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      );
    },
  }, {
    title: <FormattedMessage id="buildinfo.pkg.gitBranch" />,
    dataIndex: 'gitBranch',
    width: 240,
    render: (text, record) => {
      return (
        <span>
          {record.gitCommitInfo.gitBranch}
        </span>
      );
    },
  }, {
    title: <FormattedMessage id="buildinfo.pkg.committer" />,
    dataIndex: 'committer',
    width: 120,
    render: (text, record) => {
      return (
        <span>
          {record.gitCommitInfo.author?.name}
        </span>
      );
    },
  }, {
    title: <FormattedMessage id="builds.detailInfo" />,
    align: 'center',
    width: 80,
    render: (value, record) => {
      if (record.state === 'INIT') return;
      return (
        record.buildNumber
          ? (
            <Link
              to={{
                pathname: '/buildinfo',
                search: `?jobName=${record.jobName}&buildNumber=${record.buildNumber}`,
              }}
            >
              <RightCircleOutlined />
            </Link>
          )
          : ''
      );
    },
  },
  ];

  render() {
    return (
      <div>
        <Table
          className="builds-table"
          columns={this.columns}
          rowKey={record => { return record.buildNumber + getUuid(); }}
          rowClassName={record => { return mapBuildDataToColor(record); }}
          dataSource={this.props.data}
          loading={this.props.loading}
          pagination={this.props.pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
