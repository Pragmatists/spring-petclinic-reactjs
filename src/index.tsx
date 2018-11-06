import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/scss/petclinic.scss';
import './styles/scss/responsive.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/scss/header.scss';
import './styles/scss/typography.scss';

import { browserHistory as history } from 'react-router';

// The Application
import Root from './Root';

// Render Application
const mountPoint = document.getElementById('root');
ReactDOM.render(
  <Root history={history}/>,
  mountPoint
);
