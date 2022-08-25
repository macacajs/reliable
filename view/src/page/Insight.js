import {
  Row,
  Col,
  Spin,
  Table,
  Popover,
  Breadcrumb,
  DatePicker,
} from 'antd';
import {
  QuestionCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import React from 'react';
import safeGet from 'lodash/get';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import request from '../util/request';
import ChartCard from '../components/ChartCard';
import {
  logger,
  mapNumberToColor,
} from '../util/index';
import ReliableLayout from '../components/ReliableLayout';

const { RangePicker } = DatePicker;

const topColResponsiveProps = {
  xs: 24,
  sm: 10,
  md: 10,
  lg: 10,
  xl: 8,
  style: { marginBottom: 24 },
};

export default class Builds extends React.Component {
  state = {
    loading: false,
    total: 0,
    data: [],
    loading1: true,
    loading2: true,
    loading3: true,
    loading4: true,
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async ([startDate, endDate] = []) => {
    this.setState({
      loading: true,
    });
    const insightRes = await request('insight/ci', 'GET', {
      startDate,
      endDate,
      allBranches: 'Y',
    });
    if (insightRes.success) {
      try {
        const result = insightRes.data;
        logger('buildData res', result);
        this.setState({
          loading1: false,
          loading3: false,
          loading4: false,
          data: result,
        });
      } catch (e) {
        console.error(insightRes, e);
      }
    } else {
      console.error(insightRes);
    }

    const buildsRes = await request('getBuildsTable', 'GET', {});
    if (buildsRes.success) {
      try {
        const {
          total,
        } = buildsRes.data;
        this.setState({
          loading2: false,
          total,
        });
      } catch (e) {
        console.error('getBuildsTable error', buildsRes, e);
      }
    } else {
      console.error('getBuildsTable error', buildsRes);
    }
  }

  changeDateRange = async (date, dateString) => {
    console.log(date, dateString);
    await this.fetch(dateString);
  }

  getColumns = () => {
    return [{
      title: <FormattedMessage id="builds.rank" />,
      key: 'rank',
      render: (text, record, index) => { return <span>{++index}</span>; },
      align: 'center',
      width: 80,
    }, {
      title: <FormattedMessage id="builds.jobName" />,
      dataIndex: 'jobName',
      render: (text, record) => {
        return (
          <Link to={{ pathname: '/', search: `?jobName=${record.jobName}` }}>
            {text}
          </Link>
        );
      },
    }, {
      title: <FormattedMessage id="insight.test.lineCoverage.latest" />,
      dataIndex: 'linePercentList[0].linePercent',
      key: 'latestLinePercent',
      render: (text, record) => {
        const pct = record.linePercentList[0].linePercent;
        const coverageUrl = safeGet(record, 'linePercentList[0].coverageUrl');
        if (!pct) {
          return '-';
        }
        return (
          <a target="_blank" href={coverageUrl}>
            {pct}%
          </a>
        );
      },
    }, {
      title: (
        <span>
          <FormattedMessage id="insight.test.lineCoverage" />
          <Popover content={<FormattedMessage id="insight.test.lineCoverage.tip" />}>
            <QuestionCircleOutlined style={{ marginLeft: '2px' }} />
          </Popover>
        </span>
      ),
      dataIndex: 'linePercent',
      render: (text, record) => {
        return record.linePercent
          ? (
            <Popover
              placement="right"
              title={<FormattedMessage id="insight.test.lineCoverage.history" />}
              content={(
                <Table
                  size="small"
                  dataSource={record.linePercentList}
                  columns={[
                    {
                      title: 'Commit',
                      dataIndex: 'commitUrl',
                      key: 'commitUrl',
                      render: (text, record) => {
                        return <a target="_blank" href={text}>{record.shortHash}</a>;
                      },
                    },
                    {
                      title: 'Coverage',
                      dataIndex: 'coverageUrl',
                      key: 'commitUrl',
                      align: 'center',
                      render: (text, record) => {
                        return record.linePercent
                          ? <a target="_blank" href={text}>{record.linePercent}%</a>
                          : '-';
                      },
                    },
                    {
                      title: 'CreatedAt',
                      dataIndex: 'createdAt',
                      key: 'createdAt',
                      align: 'right',
                    },
                  ]}
                />
            )}
            >
              <a>{record.linePercent}%</a>
            </Popover>
          )
          : '-';
      },
    }, {
      title: (
        <span>
          <FormattedMessage id="insight.test.passPercent" />
          <Popover content={<FormattedMessage id="insight.test.passPercent.tip" />}>
            <QuestionCircleOutlined style={{ marginLeft: '2px' }} />
          </Popover>
        </span>
      ),
      dataIndex: 'passPercent',
      render: (text, record) => {
        return record.passPercent
          ? (
            <Popover
              placement="right"
              title={<FormattedMessage id="insight.test.passPercent.history" />}
              content={(
                <Table
                  size="small"
                  dataSource={record.passPercentList}
                  columns={[
                    {
                      title: 'Commit',
                      dataIndex: 'commitUrl',
                      key: 'commitUrl',
                      render: (text, record) => {
                        return <a target="_blank" href={text}>{record.shortHash}</a>;
                      },
                    },
                    {
                      title: 'Pass Percentage',
                      dataIndex: 'reporterUrl',
                      key: 'reporterUrl',
                      align: 'right',
                      render: (text, record) => {
                        return record.passPercent
                          ? <a target="_blank" href={text}>{record.passPercent}%</a>
                          : '-';
                      },
                    },
                    {
                      title: 'CreatedAt',
                      dataIndex: 'createdAt',
                      key: 'createdAt',
                      align: 'right',
                    },
                  ]}
                />
            )}
            >
              <a>{record.passPercent}%</a>
            </Popover>
          )
          : '-';
      },
    }, {
      title: <FormattedMessage id="insight.committer" />,
      dataIndex: 'committer',
      render: (text, record) => {
        return (
          <a
            target="_blank"
            href={record.lastCommit.commitUrl}
            style={{ marginLeft: '4px' }}
          >{ record.lastCommit.committer.name }
          </a>
        );
      },
    }];
  }

  getData = () => {
    const data = this.state.data.sort((a, b) => {
      return parseFloat(b.linePercent || 0) - parseFloat(a.linePercent || 0);
    });
    console.log('data =>', data);
    return data;
  }

  getTopCard() {
    const list = this.getData();
    if (!list.length) {
      return (
        <div>No Rank</div>
      );
    }
    const first = list[0];
    const last = list.length === 1 ? { jobName: '', committer: '' } : list[list.length - 1];

    return (
      <div className="topcard">
        <div className="up">
          <CaretUpOutlined />
          <Link to={{ pathname: '/', search: `?jobName=${first.jobName}` }}>
            {first.jobName}
          </Link>
          <span className="committer">
            {first.committer}
          </span>
        </div>
        <div className="down">
          <CaretDownOutlined />
          <Link to={{ pathname: '/', search: `?jobName=${last.jobName}` }}>
            {last.jobName}
          </Link>
          <span className="committer">
            {last.committer}
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ReliableLayout>
        <Breadcrumb style={{
          marginBottom: '10px',
        }}
        >
          <Breadcrumb.Item>
            <Link to="/"><FormattedMessage id="sidebar.homepage" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/insight"><FormattedMessage id="sidebar.insight" /></Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title={<FormattedMessage id="insight.builds.number" />}
              loading={this.state.loading1}
              content={this.state.data.length}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title={<FormattedMessage id="insight.builds.trend" />}
              loading={this.state.loading2}
              content={this.state.total}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title={<FormattedMessage id="insight.builds.top" />}
              loading={this.state.loading3}
              content={this.getTopCard()}
            />
          </Col>
        </Row>
        <Spin spinning={this.state.loading4}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={6} offset={18}>
              <RangePicker
                style={{ width: '100%' }}
                renderExtraFooter={() => {
                  return (
                    <span>
                      <BulbOutlined />
                      <FormattedMessage id="insight.dateRange.tip" />
                    </span>
                  );
                }}
                onChange={this.changeDateRange}
              />
            </Col>
          </Row>
          <Table
            size="middle"
            rowKey={record => { return record.jobName; }}
            rowClassName={record => { return mapNumberToColor(record.linePercent); }}
            dataSource={this.getData()}
            columns={this.getColumns()}
            pagination={false}
          />
        </Spin>
      </ReliableLayout>
    );
  }
}
