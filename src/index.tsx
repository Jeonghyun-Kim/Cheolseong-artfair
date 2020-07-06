import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import TagManager from 'react-gtm-module';

import './index.scss';
import AppRouter from './AppRouter';

// kick off the polyfill!
smoothscroll.polyfill();

const tagManagerArgs = {
  gtmId: 'GTM-N3JGQXG',
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root'),
);
