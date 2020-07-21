import React from 'react';

import './MaintenanceScreen.scss';

import LoadingScreen from '../LoadingScreen/LoadingScreen';

const REWRITE_URL = 'https://home.ondisplay.co.kr';

export default function MaintenanceScreen() {
  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = REWRITE_URL;
    }, 100);
  }, []);

  return (
    <LoadingScreen />
  );
}
