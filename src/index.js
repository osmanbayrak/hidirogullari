import 'babel-polyfill';
import './styles/main.css';
import axios from 'axios';
import message from 'antd/lib/message';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux';
import 'moment/locale/tr';
import 'moment/locale/sk';
import 'moment/locale/cs';
import 'moment/locale/ro';
import 'react-day-picker/lib/style.css';

const history = createHistory();
const store = configureStore(undefined, history);

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.interceptors.response.use(
  response => response,
  error => {
    // intercept the global error
    if (error.response.status === 401 && window.location.pathname.indexOf('auth') === -1) {
      // if the error is 401 and hasent already been retried
      history.push('/auth/login');
      message.error(Object.values(error.response.data)[0].toString());
      window.location.reload(true);
    }
    // 504 / 500 / 400 / 404 error configuration line
    if (error.response.status === 500) {
    } else if (error.response.status === 504) {
    } else if (error.response.status === 403) {
    } else if (error.response.status === 404) {
      message.error(Object.values(error.response.data)[0].toString());
    } else if (error.response.status === 400) {
      message.error(Object.values(error.response.data)[0].toString());
    }
    return Promise.reject(error);
  },
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
/* istanbul ignore if */
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line
    const NextApp = require('./Root').default;
    render(NextApp);
  });
}

registerServiceWorker();
