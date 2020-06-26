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
            src={`${process.env.PUBLIC_URL}/letters/title.png`}
          />
        </div>
        <div className="decorum">
          <img
            alt="introDecorum"
            src={`${process.env.PUBLIC_URL}/letters/decorum.png`}
          />
        </div>
        <div id="spacing200" />
      </div>
      <div className="footer">
        <div className="date">
          <img
            alt="introDate"
            src={`${process.env.PUBLIC_URL}/letters/date.png`}
          />
        </div>
        <div id="spacing20" />
        <img
          alt="logo_letter"
          className="logo"
          src={`${process.env.PUBLIC_URL}/letters/logo_letter.png`}
        />
      </div>
      <img
        alt="lantern"
        src={`${process.env.PUBLIC_URL}/lantern (1).png`}
        className="introLantern"
      />
      {innerWidth < 700 ? (
        <img
          alt="Decorum 2020-6"
          src={`${DEFINES.STORAGE_URL_MD}/2020_6.jpg`}
          className="introImage mobile"
        />
      ) : (
        <img
          alt="Decorum 2016-12"
          src={`${DEFINES.STORAGE_URL_MD}/2016_12.jpg`}
          className="introImage desktop"
        />
      )}
    </div>
  );
}
