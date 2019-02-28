import axios from 'axios';
import message from 'antd/lib/message';
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  SET_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from './actionTypes';

import i18n from '../i18n';

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
