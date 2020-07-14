import React from 'react';

import './LoadingScreen.scss';

export default function LoadingScreen() {
  return (
    <div className="loadingApp background">
      <img
        alt="spinner"
        src={`${process.env.PUBLIC_URL}/spinner.gif`}
        width="100px"
        height="100px"
      />
    </div>
  );
}
