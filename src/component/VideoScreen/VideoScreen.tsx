import React from 'react';

import './VideoScreen.scss';

import Logo from '../Logo/Logo';

export default function VideoScreen() {
  return (
    <div className="videoContainer unselectable">
      <Logo />
      <div id="videoPlayer">
        <iframe
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Decorum Intro"
          src="https://www.youtube.com/embed/RCkfIYvAxC8?autoplay=1&amp;origin=https://ondisplay.co.kr/&amp;enablejsapi=1"
        />
      </div>
      <div className="quote">
        <img
          alt="quote"
          src={`${process.env.PUBLIC_URL}/letters/quote.png`}
          draggable={false}
        />
      </div>
    </div>
  );
}
