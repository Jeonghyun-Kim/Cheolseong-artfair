import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

import './About.scss';

export default function About() {
  const { t } = useTranslation();

  return (
    <Paper variant="elevation" className="aboutPaper">
      <div className="logoImage">
        <img alt="onDisplay로고" src={`${process.env.PUBLIC_URL}/onDisplayLogo/onDisplay_logo_bk.png`} />
      </div>
      <div className="explanation">
        <Typography>
          {t('about.explanation')}
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
              <b>{t('about.representative')}</b>
              <br />
              <b>Email </b>
              <br />
              <b>Tel </b>
              <br />
              <b>Instagram</b>
            </Typography>
          </div>
          <div id="section2">
            <Typography id="content">
              {t('about.psj')}
              <br />
              ondisplay.art@gmail.com
              <br />
              010-6317-1498
              <br />
              <a href="https://www.instagram.com/ondisplay.art" target="_blank" rel="noopener noreferrer">
                <button type="button">ondisplay.art</button>
              </a>
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
