import * as React from 'react';
// Routes
import configureRoutes from './configureRoutes';

const { Router } = require('react-router');

const Root = ({history}) => (
    <Router history={history}>
      {configureRoutes()}
  </Router>
);

export default Root;
