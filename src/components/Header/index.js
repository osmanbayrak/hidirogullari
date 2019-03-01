import './index.css';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import { connect } from 'react-redux';
import Content from '../Content';
import i18n from '../../i18n';
import logo from '../../assets/logos.png';
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
        <div className="header_menu__logo">
          <Link to="/">
            <img src={logo} alt={'logo'} height="40" />
          </Link>
        </div>
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);
