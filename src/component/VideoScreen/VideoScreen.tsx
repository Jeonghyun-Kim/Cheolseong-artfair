import React from 'react';

import './VideoScreen.scss';

export default function VideoScreen() {
  return (
    <div className="videoContainer">
      <div id="videoPlayer">
        <iframe
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Decorum Intro"
          src="https://www.youtube.com/embed/p8yPxEGx7oM?autoplay=1&amp;origin=https://ondisplay.co.kr/&amp;enablejsapi=1"
        />
      </div>
      <div className="quote">
        <img alt="quote" src={`${process.env.PUBLIC_URL}/letters/quote.png`} />
      </div>
    </div>
  );
}
