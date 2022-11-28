import React from 'react';
import { Table } from 'antd';

import { getUuid } from '../util/index';

const columns = [{
  title: __i18n('项'),
  dataIndex: 'extraName',
  width: 200,
  render: value => { return <span className="itemName">{value}</span>; },
}, {
  title: __i18n('内容'),
  dataIndex: 'extraContent',
  render: value => { return <pre>{JSON.stringify(value, null, 2)}</pre>; },
}];

export default class ExtraTable extends React.Component {
  state = {
    loading: false,
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => { return getUuid(); }}
        dataSource={this.props.data}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        size="small"
        bordered
      />
    );
  }
}
