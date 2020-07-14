import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as KoEnIcon } from './ko_en.svg';

import './LanguagesButton.scss';

export default function LanguagesButton() {
  return (
    <Link to="/languages">
      <div className="languagesButton">
        <SvgIcon component={KoEnIcon} viewBox="0 0 1000 1000" />
        <Typography>Language</Typography>
      </div>
    </Link>
  );
}
