import React from 'react';
import { useHistory } from 'react-router-dom';
import YouTube, { Options } from 'react-youtube';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import UpIcon from '@material-ui/icons/ArrowUpward';

import './StoryScreen.scss';

export default function StoryScreen() {
  const history = useHistory();

  const handleScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

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
        onClick={() => history.push('/')}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="upIcon"
        onClick={() => handleScrollToTop()}
      >
        <UpIcon fontSize="small" />
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
