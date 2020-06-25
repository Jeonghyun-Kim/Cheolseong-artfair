import React from 'react';
import { useHistory } from 'react-router-dom';
import YouTube, { Options } from 'react-youtube';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './StoryScreen.scss';

export default function StoryScreen() {
  const history = useHistory();

  const videoOpts: Options = {
    height: '540',
    width: '960',
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
        <YouTube videoId="p8yPxEGx7oM" opts={videoOpts} onReady={() => {}} />
      </div>
    </div>
  );
}
