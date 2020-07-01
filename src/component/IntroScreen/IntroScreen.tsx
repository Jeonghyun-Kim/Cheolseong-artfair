import React from 'react';

import './IntroScreen.scss';

import useWindowSize from '../useWindowSize';

import DEFINES from '../../defines';

export default function IntroScreen() {
  const [innerWidth] = useWindowSize();

  return (
    <div className="App introApp unselectable">
      <div className="introLetters">
        <div className="title">
          <img
            alt="introTitle"
            draggable="false"
            src={`${process.env.PUBLIC_URL}/letters/title.png`}
          />
        </div>
        <div className="decorum">
          <img
            alt="introDecorum"
            draggable="false"
            src={`${process.env.PUBLIC_URL}/letters/decorum.png`}
          />
        </div>
        <div id="spacing200" />
      </div>
      <div className="footer">
        <div className="date">
          <img
            alt="introDate"
            draggable="false"
            src={`${process.env.PUBLIC_URL}/letters/date.png`}
          />
        </div>
        <div id="spacing20" />
        <img
          alt="logo_letter"
          className="logo"
          draggable="false"
          src={`${process.env.PUBLIC_URL}/onDisplay_logo_w.png`}
        />
      </div>
      <img
        alt="lantern"
        draggable="false"
        src={`${process.env.PUBLIC_URL}/lantern (1).png`}
        className="introLantern"
      />
      {innerWidth < 700 ? (
        <img
          alt="Decorum 2020-6"
          draggable="false"
          src={`${DEFINES.STORAGE_URL_MD}/2020_6.jpg`}
          className="introImage mobile"
        />
      ) : (
        <img
          alt="Decorum 2016-12"
          draggable="false"
          src={`${DEFINES.STORAGE_URL_MD}/2016_12.jpg`}
          className="introImage desktop"
        />
      )}
    </div>
  );
}
