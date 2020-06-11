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
const REWRITE_URL = 'https://www.notion.so/3f9ecec2a1d940c1b001a22b973b0794?v=b6dd3ece14c44efd9ec9b0a90fee226e';

const timer = 5;

export default function HomeScreen() {
  const [innerWidth] = useWindowSize();
  const [timeLeft, setTimeLeft] = React.useState<number>(timer);

  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = REWRITE_URL;
    }, timer * 1000);
  }, []);

  React.useEffect(() => {
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }, [timeLeft]);

  return (
    <div className="App">
      <Typography variant={innerWidth > 600 ? 'h5' : 'h6'} align="center" className="welcomeGuide">
        온라인 아트페어에 오신것을 환영합니다.
      </Typography>
      <div
        className="viewingRoom"
      >
        <ViewingRoom src={`${STORAGE_URL_MD}/2020_1.jpg`} brightness={0.9} />
      </div>
      <Typography variant={innerWidth > 600 ? 'h5' : 'h6'} align="center" className="timer">
        {timeLeft}초 후 이동합니다.
      </Typography>
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
