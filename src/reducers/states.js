import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_NOTIFICATION,
} from '../actions/actionTypes';

const initialDeviceState = {
  devices: [],
  active_device: {},
  summary: [],
};

const initialGraphs = {
  data: [],
  loading: true,
};

const initialNotifications = {
  data: [],
  notifications_rules: [],
  loading: true,
};

function device(state = initialDeviceState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function graphs(state = initialGraphs, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function notifications(state = initialNotifications, action) {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return Object.assign({}, state, { loading: true });
    case NOTIFICATION_SUCCESS:
      return Object.assign({}, state, { data: action.payload, loading: false });
    case UPDATE_NOTIFICATION:
      console.log(state.data.map(item => (item.id === action.payload.id ? action.payload : item)));
      return Object.assign({}, state, {
        data: state.data.map(item => (item.id === action.payload.id ? action.payload : item)),
      });
    case SET_NOTIFICATION:
      return Object.assign({}, state, { data: [...state.data, action.payload] });
    case DELETE_NOTIFICATION:
      return Object.assign({}, state, {
        data: state.data.filter(item => item.id !== action.payload),
      });
    default:
      return state;
  }
}

export { device, graphs, notifications };
