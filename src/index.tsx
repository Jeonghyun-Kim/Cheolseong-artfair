import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';

import './index.scss';
import AppRouter from './AppRouter';
import LoadingScreen from './component/LoadingScreen/LoadingScreen';
import MaintenanceScreen from './component/MaintenanceScreen/MaintenanceScreen';

import './i18n';

const isOnAir = true;

// kick off the polyfill!
smoothscroll.polyfill();

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={LoadingScreen}>
      {isOnAir ? (
        <AppRouter />
      ) : (
        <MaintenanceScreen />
      )}
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
