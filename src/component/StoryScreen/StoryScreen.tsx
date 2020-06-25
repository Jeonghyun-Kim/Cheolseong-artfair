import React from 'react';
import { useHistory } from 'react-router-dom';
import YouTube, { Options } from 'react-youtube';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './StoryScreen.scss';

export default function StoryScreen() {
  const history = useHistory();

  const videoOpts: Options = {
    width: '60%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="App unselectable">
      <IconButton
        id="backIcon"
        className="fixed"
        onClick={() => history.push('/')}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <div className="storyContainer">
        <div id="videoPlayer">
          <YouTube videoId="p8yPxEGx7oM" opts={videoOpts} onReady={() => {}} />
        </div>
        <div className="quote">
          <img alt="quote" src={`${process.env.PUBLIC_URL}/letters/quote.png`} />
        </div>
      </div>
    </div>
  );
}
