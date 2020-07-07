import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';

import './index.scss';
import AppRouter from './AppRouter';

// kick off the polyfill!
smoothscroll.polyfill();

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root'),
);
