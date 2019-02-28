import {
  GET_DEVICE,
  ACTIVE_DEVICE,
  GET_SUMMARY,
  GRAPHS_SUCCESS,
  GRAPHS_REQUEST,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_RULES,
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
    case GET_DEVICE:
      return Object.assign({}, state, {
        devices: action.payload,
        active_device: action.payload[0],
      });
    case ACTIVE_DEVICE:
      return Object.assign({}, state, { active_device: action.payload });
    case GET_SUMMARY:
      return Object.assign({}, state, { summary: action.payload });
    default:
      return state;
  }
}

function graphs(state = initialGraphs, action) {
  switch (action.type) {
    case GRAPHS_REQUEST:
      return Object.assign({}, state, { loading: true });
    case GRAPHS_SUCCESS:
      return Object.assign({}, state, { data: action.payload, loading: false });
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
    case NOTIFICATION_RULES:
      return Object.assign({}, state, { notifications_rules: action.payload });
    default:
      return state;
  }
}

export { device, graphs, notifications };
