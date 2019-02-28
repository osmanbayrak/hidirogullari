import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './Layout';
import NotFound from './notfound';
import Home from './views/Home';
import Advanced from './views/Advanced';
import Notifications from './views/Notifications';

const Root = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/advanced" component={Advanced} />
      <Route path="/notification-rules" component={Notifications} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Layout>
);

export default withRouter(Root);
