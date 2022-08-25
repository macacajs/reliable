import React from 'react';
import { List } from 'antd';

export default class DepTable extends React.Component {
  state = {
    loading: false,
  };

  render() {
    return (
      <List
        size="small"
        bordered
        dataSource={this.props.data}
        renderItem={item => {
          return (
            <List.Item>
              <a href={item.fileAddress} target="_blank">{item.fileName}</a>
            </List.Item>
          );
        }}
      />
    );
  }
}
