import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import './About.scss';

export default function About() {
  return (
    <Paper variant="elevation" className="aboutPaper">
      <div className="logoImage">
        <img alt="onDisplay로고" src={`${process.env.PUBLIC_URL}/onDisplayLogo/onDisplay_logo_bk.png`} />
      </div>
      <div className="explanation">
        <Typography>
          onDisplay는 작가, 갤러리와 함께 포스트 코로나 시대의 새로운 미술 관람 문화를 선도하는 전문 IT 기업입니다.
          코로나 사태로 인해 예정되었던 전시가 취소되었거나 온라인 전시에 관심있는 갤러리나 작가님께서는 자유롭게 문의해주세요.
        </Typography>
      </div>
      <div className="contactUs">
        <Typography id="title">
          Contact Us for Online Exhibition
        </Typography>
        <div className="info">
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
          <img alt="문화체육관광부로고" src={`${process.env.PUBLIC_URL}/subLogo/sub_logo_1.png`} />
        </div>
        <div id="subLogoImage2">
          <img alt="예술경영지원센터로고" src={`${process.env.PUBLIC_URL}/subLogo/sub_logo_2.png`} />
        </div>
      </div>
    </Paper>
  );
}
