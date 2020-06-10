import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import './HomeScreen.scss';

import ViewingRoom from '../ViewingRoom/ViewingRoom';
import useWindowSize from '../useWindowSize';

const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';

export default function HomeScreen() {
  const [innerWidth] = useWindowSize();

  return (
    <div className="Root">
      <Typography variant={innerWidth > 600 ? 'h5' : 'h6'} align="center" className="welcomeGuide">
        온라인 아트페어에 오신것을 환영합니다.
      </Typography>
      <div
        // style={{ filter: `brightness(${onDetail ? 0.8 : 1}) blur(${onDetail ? 10 : 0}px)` }}
        className="viewingRoom"
      >
        <ViewingRoom src={`${STORAGE_URL_MD}/2020_1.jpg`} brightness={0.9} />
      </div>
      <IconButton id="arrowLeft" style={{ color: '#444' }}>
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <IconButton id="arrowRight" style={{ color: 'azure' }}>
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
      <IconButton id="moreIcon">
        <AssignmentIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
