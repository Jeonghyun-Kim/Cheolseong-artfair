import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import './About.scss';

import useWindowSize from '../useWindowSize';

export default function About() {
  const [innerWidth] = useWindowSize();

  return (
    <Paper variant="elevation" className="aboutPaper">
      <div className="logoImage">
        {innerWidth < 600 ? (
          <img alt="onDisplay로고" src={`${process.env.PUBLIC_URL}/logo_mobile.png`} />
        ) : (
          <img alt="onDisplay로고" src={`${process.env.PUBLIC_URL}/logo_desktop.png`} />
        )}
      </div>
      <div className="explanation">
        <Typography>
          onDisplay는 미술계와 협력하여 새로운 온라인 미술시장을 개척하는 소프트웨어 개발 전문가 팀입니다.
          코로나 사태로 인해 예정되었던 전시가 취소되었거나 온라인 전시에 관심있는 작가와 갤러리의 자유로운 문의를 바랍니다.
        </Typography>
      </div>
      <div>
        <Typography id="title">
          Contact Us for Online Exhibition
        </Typography>
        <div className="contactUs">
          <br />
          <div id="section1">
            <Typography id="content">
              <b>대표 </b>
              <br />
              <b>Email </b>
              <br />
              <b>Tel </b>
            </Typography>
          </div>
          <div id="section2">
            <Typography id="content">
              박세정
              <br />
              gogle.gallery@gmail.com
              <br />
              010-6317-1498
            </Typography>
          </div>
        </div>
      </div>
      <div className="subLogoImages">
        <div id="subLogoImage1">
          <img alt="문화체육관광부로고" src={`${process.env.PUBLIC_URL}/sub_logo_1.png`} />
        </div>
        <div id="subLogoImage2">
          <img alt="예술경영지원센터로고" src={`${process.env.PUBLIC_URL}/sub_logo_2.png`} />
        </div>
      </div>
    </Paper>
  );
}
