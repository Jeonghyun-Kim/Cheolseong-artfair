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
  const [welcomeText, setWelcomeText] = React.useState<string[]>(['온라인 아트페어에 오신것을 환영합니다.']);
  const [top, setTop] = React.useState<string[]>(['10%', '']);
  const [innerWidth] = useWindowSize();

  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = REWRITE_URL;
    }, timer * 1000);
  }, []);

  React.useEffect(() => {
    if (innerWidth > 1000) {
      setTop(['10%', '']);
      setWelcomeText(['온라인 아트페어에 오신것을 환영합니다.']);
    } else {
      setTop(['calc(10% - 30px)', 'calc(10% + 35px)']);
      setWelcomeText(['온라인 아트페어에', '오신것을 환영합니다.']);
    }
  }, [innerWidth]);

  return (
    <div className="App">
      <Typography
        variant={innerWidth > 600 ? 'h3' : 'h4'}
        align="center"
        className="welcomeGuide"
        style={{ top: top[0] }}
      >
        {welcomeText[0]}
      </Typography>
      {welcomeText[1] && (
        <Typography
          variant={innerWidth > 600 ? 'h3' : 'h4'}
          align="center"
          className="welcomeGuide"
          style={{ top: top[1] }}
        >
          {welcomeText[1]}
        </Typography>
      )}
      <div
        className="viewingRoom"
      >
        <ViewingRoom idx={0} src={`${STORAGE_URL_MD}/2020_1.jpg`} />
      </div>
      <img
        alt="spinner"
        src={`${process.env.PUBLIC_URL}/Spinner.svg`}
        id="spinnerIcon"
        width="100px"
      />
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
