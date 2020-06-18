import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9';

import './index.scss';
import AppRouter from './AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root'),
);
