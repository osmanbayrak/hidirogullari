import axios from 'axios';
import message from 'antd/lib/message';
import {
  GET_DEVICE,
  ACTIVE_DEVICE,
  GET_SUMMARY,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  SET_NOTIFICATION,
  UPDATE_NOTIFICATION,
  NOTIFICATION_RULES,
  DELETE_NOTIFICATION,
  NEW_DEVICE_REGISTER,
  GRAPHS_REQUEST,
  GRAPHS_SUCCESS,
} from './actionTypes';

import i18n from '../i18n';

const path = '/api/customer/devices';
const devicePath = `${path}/`;
export function setActiveDevice(device) {
  return {
    type: ACTIVE_DEVICE,
    payload: device,
  };
}

export function getDeviceList() {
  return dispatch => {
    axios.get(devicePath).then(res => {
      dispatch(setActiveDevice(res.data[0]));
      dispatch({ type: GET_DEVICE, payload: res.data });
      return res.data;
    });
  };
}

export function getSummary(deviceId) {
  return dispatch => {
    axios.get(`/api/customer/summary/${deviceId}/`).then(res => {
      dispatch({ type: GET_SUMMARY, payload: res.data[0] });
    });
  };
}

export function getGraphs(deviceId, filter) {
  return dispatch => {
    dispatch({ type: GRAPHS_REQUEST });
    axios.get(`/api/customer/graphs/${deviceId}/`, { params: filter }).then(res => {
      dispatch({ type: GRAPHS_SUCCESS, payload: res.data });
    });
  };
}

export function getNotification(deviceId, filter) {
  return dispatch => {
    dispatch({ type: NOTIFICATION_REQUEST });
    axios.get(`/api/customer/notifications/${deviceId}/`, { params: filter }).then(res => {
      dispatch({ type: NOTIFICATION_SUCCESS, payload: res.data.results });
    });
  };
}

export function setNotification(deviceId, filter, callBack, errorCallBack) {
  return dispatch => {
    axios
      .post(`/api/customer/notifications/${deviceId}/`, filter)
      .then(res => {
        dispatch({ type: SET_NOTIFICATION, payload: res.data });
        if (typeof callBack == 'function') {
          callBack();
        }
      })
      .catch(error => {
        if (typeof errorCallBack == 'function') {
          errorCallBack(error.reponse);
        }
        return true;
      });
  };
}

export function updateNotification(deviceId, id, filter) {
  return dispatch => {
    axios.put(`/api/customer/notifications/${deviceId}/${id}/`, filter).then(res => {
      dispatch({ type: UPDATE_NOTIFICATION, payload: res.data });
      message.success(i18n.t('notification_rules_successfully_updated'));
    });
  };
}

export function deleteNotification(deviceId, id) {
  return dispatch => {
    axios.delete(`/api/customer/notifications/${deviceId}/${id}/`).then(() => {
      message.success(i18n.t('notification_rules_successfully_delete'));
      dispatch({ type: DELETE_NOTIFICATION, payload: id });
    });
  };
}

export function nofiticationRules(deviceId) {
  return dispatch => {
    axios.get(`/api/customer/notifications/find_rule_types/${deviceId}/`).then(res => {
      dispatch({ type: NOTIFICATION_RULES, payload: res.data });
    });
  };
}

export function newDeviceRegister(data) {
  return dispatch => {
    axios.post('/api/customer/register_consumption_place/', data).then(res => {
      dispatch({ type: NEW_DEVICE_REGISTER, payload: res.data });
      dispatch(getDeviceList());
      message.success(i18n.t('add_new_register_consumption_success'));
    });
  };
}
