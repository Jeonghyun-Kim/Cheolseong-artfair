import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import Logo from '../Logo/Logo';

import './LanguageScreen.scss';

export default function LanguageScreen() {
  const { t, i18n } = useTranslation();

  const history = useHistory();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setTimeout(() => history.push('/'), 0);
  };

  return (
    <div className="languageApp background unselectable">
      <Logo />
      <div className="container">
        <Typography variant="h4">{t('language')}</Typography>
        <button type="button" onClick={() => changeLanguage('ko')}>
          <Typography variant="h6">한글</Typography>
        </button>
        <button type="button" onClick={() => changeLanguage('en')}>
          <Typography variant="h6">English</Typography>
        </button>
        <Typography variant="h4">{t('in_progress')}</Typography>
        {/* <button type="button" onClick={() => changeLanguage('ko')}> */}
        <Typography variant="h6">简体中文</Typography>
        {/* </button> */}
        {/* <button type="button" onClick={() => changeLanguage('en')}> */}
        <Typography variant="h6">Español</Typography>
        {/* </button> */}
      </div>
    </div>
  );
}
