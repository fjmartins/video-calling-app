import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// Layouts
import Layout from './components/Layout';

// Pages
import Home from './components/Home';
import About from './components/About';
import Callback from './components/Callback';

export default (
  <Router history={browserHistory}>
    <Route component={Layout}>
      <Route path="/" component={Home} />

      <Route path="callback" component={Callback} />

      <Route path="about" component={About} />
    </Route>
  </Router>
);
