import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import UpIcon from '@material-ui/icons/ArrowUpward';

import './StoryScreen.scss';

export default function StoryScreen() {
  const history = useHistory();

  const handleScrollToTop = () => {
    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <div className="unselectable storyApp">
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
          <iframe
            frameBorder="0"
            allowFullScreen
            title="Decorum Intro"
            width="640"
            height="360"
            src="https://www.youtube.com/embed/p8yPxEGx7oM?autoplay=0&amp;enablejsapi=1"
          />
        </div>
        <div className="quote">
          <img alt="quote" src={`${process.env.PUBLIC_URL}/letters/quote.png`} />
        </div>
        <div className="introduction">
          <div className="paddingBox">
            <Typography variant="h4" className="title">
              작가의 말
            </Typography>
            <Typography variant="body1" component="p">
              내 그림에는 채워지지 않은 빈 공간, 즉 餘白이 많다.
              {' '}
              이러한 여백은 그저 비어있는 공간이 아닌 시각적으로 담겨져 있는 것 이상의
              {' '}
              많은 관념과 사유가 머물고 채워진 후 다시 떠나가는 공간이다.
              {' '}
              절제되고 정제된 형과 색, 그리고 무심코 배치된 여백의 화면구성은 채우기보다는 비움을 향해 나아가고 있는 것이다.
            </Typography>
            <div id="spacing50" />
            <Typography variant="body1" component="p">
              오늘날의 세상은 빠르게 변하고 있으며, 물질과 속도를 우선시하는 가치관이 팽배하다.
              {' '}
              불분명한 내면의 느낌과 성장의 과정보다는 외적으로 드러나는 결과와 효율을 중시하는 가치관으로 인해 더 좋은 것,
              {' '}
              더 귀한 것은 외부에 있다고 여기게 되었다, 자신의 내면에서 들려오는 소리에 귀 기울일 여유가 없어진 것이다.
            </Typography>
            <div id="spacing50" />
            <Typography variant="body1" component="p">
              나는 그림을 통해 보이는 것과 더불어 보이지 않은 것조차 보이도록 하고 싶다.
              {' '}
              그려진 것과 어우러져 그려지지 않은 곳에 존재하고 있는 것을 찾도록 하고픈 것이다.
              {' '}
              여백이라는 확연한 공간에 자신만의 사유와 미학을 채우며 주체성을 회복하고,
              {' '}
              오늘날을 살아가는 고단함을 잠시 내려놓고 자신의 심연을 들여다볼 수 있기를 소망한다.
            </Typography>
            <Typography variant="body2" component="p" align="right" className="artistName">
              작가 김철성
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
