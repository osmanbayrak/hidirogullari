import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { device, graphs, notifications } from './states';

export default combineReducers({
  device,
  graphs,
  notifications,
  router: routerReducer,
});
