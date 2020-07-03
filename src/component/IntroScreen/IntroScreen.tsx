import React from 'react';

import './IntroScreen.scss';

import useWindowSize from '../useWindowSize';

import DEFINES from '../../defines';

import Logo from '../Logo/Logo';

export default function IntroScreen() {
  const [innerWidth] = useWindowSize();

  return (
    <div className="introApp unselectable">
      <Logo />
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
      </div>
      <div className="footer">
        <div className="introGuide">
          <picture>
            <source media="(max-width: 500px) and (orientation: portrait)" srcSet={`${process.env.PUBLIC_URL}/letters/touch_to_start.png`} />
            <source media="(max-height: 500px) and (orientation: landscape)" srcSet={`${process.env.PUBLIC_URL}/letters/touch_to_start.png`} />
            <img
              alt="startGuide"
              src={`${process.env.PUBLIC_URL}/letters/click_to_start.png`}
            />
          </picture>
        </div>
        <div className="date">
          <img
            alt="introDate"
            draggable="false"
            src={`${process.env.PUBLIC_URL}/letters/date.png`}
          />
        </div>
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
