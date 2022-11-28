import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Menu,
} from 'antd';
import {
  FlagOutlined,
  LineChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';


const { Sider } = Layout;

const { siteConfig, user } = window.pageConfig;

export default class SiderBar extends React.Component {
  handleMenuClick(e) {
    this.setState({
      currentPath: e.key,
    });
  }

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        theme="light"
        collapsed={this.props.collapsed}
      >
        <div className="logo">
          <Link to="/">
            <img alt="logo" src={siteConfig.logo} />
            <h1>{siteConfig.name}</h1>
          </Link>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[location.pathname]}
          onClick={this.handleMenuClick.bind(this)}
        >
          <Menu.Item key="/">
            <Link to="/">
              <FlagOutlined />
              <span>
                <FormattedMessage id="sidebar.buildinfo" />
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/insight">
            <Link to="/insight">
              <span>
                <LineChartOutlined />
                <FormattedMessage id="sidebar.insight" />
              </span>
            </Link>
          </Menu.Item>
          {user.isAdmin && (
            <Menu.Item key="/setting">
              <Link to="/setting">
                <SettingOutlined />
                <span>
                  <FormattedMessage id="sidebar.setting" />
                </span>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
    );
  }
}
