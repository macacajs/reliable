import React from 'react';
import QRCode from 'qrcode-react';

import {
  Table,
  Modal,
  Popover,
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

import safeGet from 'lodash/get';

import {
  getUuid,
} from '../util/index';
import logos from './logos';

import './pkgTable.less';

const getLogo = type => {
  return logos[type] || logos.web;
};

export default class PkgTable extends React.Component {
  state = {
    loading: false,
    record: {},
    visible: false,
    currentPackage: {},
  };

  getColumns = () => {
    let columns = [{
      title: __i18n('版本号'),
      dataIndex: 'version',
      width: 100,
    }, {
      title: __i18n('类型'),
      dataIndex: 'type',
      width: 160,
    }];
    columns = columns.concat([{
      title: __i18n('下载'),
      dataIndex: 'download',
      width: 160,
      render: (value, record) => {
        return (
          <span>
            <QrcodeOutlined
              style={{ fontSize: 20, color: '#38b8f3' }}
              onClick={this.showQrCodeModal.bind(this, record)}
            />
            <a href={value} style={{ marginLeft: '8px' }} target="_blank">
              {__i18n('下载')}
            </a>
          </span>
        );
      },
    }]);
    columns = columns.concat([{
      title: __i18n('代码分支'),
      dataIndex: 'gitBranch',
      width: 300,
      render: (value, record) => {
        return (
          <span>{ record.gitCommitInfo.gitBranch }</span>
        );
      },
    }, {
      title: __i18n('提交信息'),
      width: 240,
      dataIndex: 'gitCommit',
      render: (value, record) => {
        return (
          <Popover
            content={(
              <ul className="commit-pop-block">
                <li>
                  committer name: { safeGet(record, 'gitCommitInfo.author.name') }
                </li>
                <li>
                  committer email: { safeGet(record, 'gitCommitInfo.author.email') }
                </li>
                <li>
                  author name: { safeGet(record, 'gitCommitInfo.author.name') }
                </li>
                <li>
                  author email: { safeGet(record, 'gitCommitInfo.author.email') }
                </li>
                <li>
                  gitTag: { safeGet(record, 'gitCommitInfo.gitTag') || 'null' }
                </li>
                <li>
                  subject: { safeGet(record, 'gitCommitInfo.subject') }
                </li>
              </ul>
          )}
            trigger="hover"
            placement="left"
          >
            <a
              href={record.gitCommitInfo.gitHref}
              target="_blank"
            >
              {record.gitCommitInfo.shortHash}
            </a> {record.gitCommitInfo.author?.name}
          </Popover>
        );
      },
    }]
    );
    return columns;
  }

  showQrCodeModal = (record) => {
    this.setState({
      record,
      visible: true,
    });
  }

  handleQrCodeOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleQrCodeCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  getDownloadUrl = () => {
    if (this.state.record
      && this.state.record.download
      && this.state.record.download.startsWith('http')) {
      return this.state.record.download;
    }
    return `${location.protocol}${this.state.record.download}`;
  }

  render() {
    return (
      <div>
        <Table
          className="package-table"
          pagination={false}
          columns={this.getColumns()}
          rowKey={record => { return getUuid(); }}
          dataSource={this.props.data}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        <Modal
          className="pkg"
          title={null}
          width={280}
          closable={false}
          visible={this.state.visible}
          wrapClassName="vertical-center-modal"
          onOk={this.handleQrCodeOk}
          onCancel={this.handleQrCodeCancel}
        >
          <QRCode
            value={this.getDownloadUrl()}
            logoWidth={64}
            size={260}
            logo={getLogo(this.state.record.platform)}
          />
          <div className="tips">
            {
              `${this.state.record.version} |
              ${this.state.record.type} |
              ${safeGet(this.state.record, 'gitCommitInfo.commitTime')} |
              ${safeGet(this.state.record, 'gitCommitInfo.shortHash')} |
              ${safeGet(this.state.record, 'gitCommitInfo.gitBranch')} |
              ${safeGet(this.state.record, 'gitCommitInfo.author.name')}`
            }
          </div>
        </Modal>
      </div>
    );
  }
}
