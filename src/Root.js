import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './Layout';
import NotFound from './notfound';
import Home from './views/Home';
import Advanced from './views/Advanced';

const Root = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Layout>
);

export default withRouter(Root);
