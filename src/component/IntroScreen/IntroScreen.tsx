import React from 'react';

import { useTranslation } from 'react-i18next';

import './IntroScreen.scss';

import useWindowSize from '../useWindowSize';

import DEFINES from '../../defines';

import Logo from '../Logo/Logo';
import LanguagesButton from '../LanguagesButton/LanguagesButton';

export default function IntroScreen() {
  const [innerWidth] = useWindowSize();
  const { i18n } = useTranslation();

  return (
    <div className="introApp unselectable">
      <Logo />
      <LanguagesButton />
      <div className="introLetters">
        <div className="title">
          {i18n.language === 'ko'
            ? (
              <img
                alt="introTitle"
                draggable="false"
                src={`${process.env.PUBLIC_URL}/letters/ko/title.png`}
              />
            ) : (
              <img
                alt="introTitle"
                draggable="false"
                src={`${process.env.PUBLIC_URL}/letters/en/title.png`}
              />
            )}
        </div>
        <div className="decorum">
          {i18n.language === 'ko'
            ? (
              <img
                alt="introDecorum"
                draggable="false"
                src={`${process.env.PUBLIC_URL}/letters/ko/decorum.png`}
              />
            ) : (
              <img
                alt="introDecorum"
                draggable="false"
                src={`${process.env.PUBLIC_URL}/letters/en/decorum.png`}
              />
            )}
        </div>
      </div>
      <div className="footer">
        <div className="introGuide">
          {i18n.language === 'ko'
            ? (
              <picture>
                <source media="(max-width: 500px) and (orientation: portrait)" srcSet={`${process.env.PUBLIC_URL}/letters/ko/touch_to_start.png`} />
                <source media="(max-height: 500px) and (orientation: landscape)" srcSet={`${process.env.PUBLIC_URL}/letters/ko/touch_to_start.png`} />
                <img
                  alt="startGuide"
                  src={`${process.env.PUBLIC_URL}/letters/ko/click_to_start.png`}
                />
              </picture>
            ) : (
              <picture>
                <source media="(max-width: 500px) and (orientation: portrait)" srcSet={`${process.env.PUBLIC_URL}/letters/en/touch_to_start.png`} />
                <source media="(max-height: 500px) and (orientation: landscape)" srcSet={`${process.env.PUBLIC_URL}/letters/en/touch_to_start.png`} />
                <img
                  alt="startGuide"
                  src={`${process.env.PUBLIC_URL}/letters/en/click_to_start.png`}
                />
              </picture>
            )}
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
        src={`${process.env.PUBLIC_URL}/lantern.png`}
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
