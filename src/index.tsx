import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';

import './index.scss';
import AppRouter from './AppRouter';

import './i18n';

// kick off the polyfill!
smoothscroll.polyfill();

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <AppRouter />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
