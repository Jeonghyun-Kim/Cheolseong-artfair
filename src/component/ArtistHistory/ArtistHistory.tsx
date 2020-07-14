import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/ArrowUpward';

import { useTranslation } from 'react-i18next';

import './ArtistHistory.scss';

import Logo from '../Logo/Logo';
import Introduction from './Introduction/Introduction';
import Review from './Review/Review';
import History from './History/History';
import HistoryEn from './History/HistoryEn';

import DEFINES from '../../defines';

export default function ArtistHistory() {
  const handleScrollToTop = () => {
    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
  };

  const { i18n } = useTranslation();

  React.useEffect(() => {
    fetch(`${DEFINES.API_URL}/hitcount/history`);
  }, []);

  return (
    <div className="unselectable historyApp background">
      <div className="stickyBar">
        <Logo />
      </div>
      <IconButton
        id="upIcon"
        onClick={() => handleScrollToTop()}
      >
        <UpIcon fontSize="small" />
      </IconButton>
      <div className="historyContainer">
        <div className="introduction paper">
          <div className="paddingBox">
            <Introduction />
          </div>
        </div>
        <div className="paper review">
          <div className="paddingBox">
            <Review />
          </div>
        </div>
        <div className="paper history">
          <div className="paddingBox">
            {i18n.language === 'ko' ? (
              <History />
            ) : (
              <HistoryEn />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
