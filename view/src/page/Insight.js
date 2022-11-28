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
      title: __i18n('排行'),
      key: 'rank',
      render: (text, record, index) => { return <span>{++index}</span>; },
      align: 'center',
      width: 80,
    }, {
      title: __i18n('项目名'),
      dataIndex: 'jobName',
      render: (text, record) => {
        return (
          <Link to={{ pathname: '/', search: `?jobName=${record.jobName}` }}>
            {text}
          </Link>
        );
      },
    }, {
      title: __i18n('行覆盖率'),
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
          {__i18n('平均行覆盖率')}
          <Popover content={__i18n('测试覆盖率的平均值')}>
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
              title={__i18n('测试覆盖率历史记录')}
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
          {__i18n('通过率')}
          <Popover content={__i18n('CI 100% 成功次数 / CI 执行次数')}>
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
              title={__i18n('通过率历史记录')}
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
      title: __i18n('最后提交'),
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
            <Link to="/">{__i18n('主页')}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/insight">{__i18n('洞察')}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title={__i18n('应用总数')}
              loading={this.state.loading1}
              content={this.state.data.length}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title={__i18n('构建总数')}
              loading={this.state.loading2}
              content={this.state.total}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title={__i18n('榜单')}
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
                      {__i18n('请选择时间范围，不选择将会统计全部数据')}
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
