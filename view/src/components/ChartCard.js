import React from 'react';
import { Card, Spin } from 'antd';

import './chartCard.less';

class ChartCard extends React.Component {
  render() {
    return (
      <Card
        className="chartcard"
        bodyStyle={{ padding: '20px 24px 8px 24px' }}
      >
        <Spin spinning={this.props.loading}>
          <h3 className="title">{this.props.title}</h3>
          <div className="content">{this.props.content}</div>
        </Spin>
      </Card>
    );
  }
}

export default ChartCard;
