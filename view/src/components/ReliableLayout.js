import React from 'react';
import { Layout } from 'antd';

import Header from './Header';
import SiderBar from './SiderBar';

const { Content } = Layout;

export default class ReliableLayout extends React.Component {
  state = {
    collapsed: localStorage.RELIABLE_SIDERBAR_COLLAPSED === 'true',
  };

  toggleCollapsed = (value) => {
    localStorage.RELIABLE_SIDERBAR_COLLAPSED = value;
    this.setState({
      collapsed: value,
    });
  };

  render() {
    return (
      <Layout
        style={{ minHeight: '100%' }}
      >
        { !this.props.hideMenu && <SiderBar collapsed={this.state.collapsed} /> }
        <Layout>
          <Header
            collapsed={this.state.collapsed}
            toggleCollapsed={this.toggleCollapsed}
          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}
