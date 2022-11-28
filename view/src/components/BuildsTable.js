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
    title: __i18n('项目名'),
    dataIndex: 'jobName',
    render: (text, record) => {
      return (
        <span>
          {text}
        </span>
      );
    },
  }, {
    title: __i18n('运行日志'),
    width: 100,
    render: (text, record) => {
      return (record.buildLogUrl
        ? (
          <a
            href={record.buildLogUrl}
            target="_blank"
          >
            {__i18n('运行日志')}
          </a>
        )
        : (
          <Link to={{ pathname: '/buildlog', search: `?jobName=${record.jobName}&buildNumber=${record.buildNumber}` }}>
            {__i18n('运行日志')}
          </Link>
        ));
    },
  }, {
    title: __i18n('构建号'),
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
    title: __i18n('平台'),
    dataIndex: 'platform',
  }, {
    title: __i18n('完成时间'),
    dataIndex: 'buildEndTime',
    render: (text, record) => {
      return (
        <span>
          {moment(text).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      );
    },
  }, {
    title: __i18n('代码分支'),
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
    title: __i18n('提交人'),
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
    title: __i18n('详情'),
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
