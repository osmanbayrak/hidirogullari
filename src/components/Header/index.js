import './index.css';

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import { connect } from 'react-redux';
import Content from '../Content';
import i18n from '../../i18n';
import authConfig from '../../config/auth';

function changeLanguage(lang) {
  i18n.changeLanguage(lang);
  setTimeout(() => {
    window.location.reload(true);
  }, 200);
}
const Lang = (
  <Menu>
    {authConfig.authConfig.language.map(res => (
      <Menu.Item key={res} size="small" onClick={() => changeLanguage(res)}>
        <span>{i18n.t(res)}</span>
      </Menu.Item>
    ))}
  </Menu>
);

class HeaderComponent extends React.Component {
  render() {
    const dropdown = (
      <Menu>
        <Menu.Item key="user">
          <Link to="/profile">
            <Icon type="user" />
            <span className="marL5">{i18n.t('profile')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="user-o">
          <Link to="/new-register-consumption">
            <Icon type="user" />
            <span className="marL5">{i18n.t('new_register_consumption')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="password">
          <Link to="/password-change">
            <Icon type="lock" />
            <span className="marL5">{i18n.t('change_password')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="poweroff" onClick={this.logout}>
          <Icon type="poweroff" />
          <span className="marL5">{i18n.t('logout')}</span>
        </Menu.Item>
      </Menu>
    );
    const { auth, tenant } = this.props;

    return (
      <div className="header_menu">
        <Content>
          <div className="header_menu__logo">
            <Link to="/">
              <img src={tenant.file} alt={tenant.description} height="40" />
            </Link>
          </div>
          <div className="info marT20">
            <Dropdown className="" overlay={Lang} trigger={['click']} position="bottomRight">
              <span className="ant-dropdown-link marR10 cursor">
                {i18n.t(localStorage.getItem('i18nextLng').split('-')[0])}
                <Icon type="down" />
              </span>
            </Dropdown>
            {auth ? (
              <Dropdown overlay={dropdown} trigger={['click']} position="bottomRight">
                <span className="ant-dropdown-link cursor">
                  <Icon type="user" />
                  <Icon type="down" />
                </span>
              </Dropdown>
            ) : (
              ''
            )}
          </div>
          <div className="header_menu__menu marT5">
            <Menu mode="horizontal">
              <Menu.Item key="appstore-o">
                <NavLink strict to="/">
                  <Icon type="appstore-o" />
                  <span className="reponsive-menu">{i18n.t('summary')}</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="api">
                <NavLink to="/advanced">
                  <Icon type="api" />
                  <span className="reponsive-menu">{i18n.t('advanced')}</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="notification">
                <NavLink to="/notification-rules">
                  <Icon type="notification" />
                  <span className="reponsive-menu">{i18n.t('notification_rules')}</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </div>
        </Content>
      </div>
    );
  }
}

HeaderComponent.defaultProps = {
  tenant: {
    file: null,
    description: null,
  },
};

const mapStateToProps = state => ({
  auth: state.users,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);
