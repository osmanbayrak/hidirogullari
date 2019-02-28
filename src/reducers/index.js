import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { login, users, register, passwordForgot, confirmPassword, tenantInfo } from 'skyrc-auth';
import { device, graphs, notifications } from './states';

export default combineReducers({
  device,
  graphs,
  notifications,
  tenant: tenantInfo,
  login,
  users,
  register,
  passwordForgot,
  confirmPassword,
  router: routerReducer,
});
