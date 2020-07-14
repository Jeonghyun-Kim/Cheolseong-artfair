import React from 'react';
import { useTranslation } from 'react-i18next';

import './VideoScreen.scss';

import Logo from '../Logo/Logo';

export default function VideoScreen() {
  const { i18n } = useTranslation();

  return (
    <div className="videoContainer unselectable">
      <Logo />
      <div id="videoPlayer">
        <iframe
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Decorum Intro"
          src={`https://www.youtube.com/embed/${i18n.language === 'ko' ? 'RCkfIYvAxC8' : 'uXmOdj_F6Vk'}?autoplay=1&amp;origin=https://ondisplay.co.kr/&amp;enablejsapi=1`}
        />
      </div>
      <div className="quote">
        {i18n.language === 'ko'
          ? (
            <img
              alt="quote"
              src={`${process.env.PUBLIC_URL}/letters/ko/quote.png`}
              draggable={false}
            />
          ) : (
            <img
              alt="quote"
              src={`${process.env.PUBLIC_URL}/letters/en/quote.png`}
              draggable={false}
            />
          )}
      </div>
    </div>
  );
}
