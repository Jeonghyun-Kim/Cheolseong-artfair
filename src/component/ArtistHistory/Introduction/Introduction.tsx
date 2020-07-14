import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

export default function Introduction() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4" className="title">
        {t('introduction.title')}
      </Typography>
      <Typography variant="body1" component="p">
        {t('introduction.p1')}
      </Typography>
      <br />
      <Typography variant="body1" component="p">
        {t('introduction.p2')}
      </Typography>
      <br />
      <Typography variant="body1" component="p">
        {t('introduction.p3')}
      </Typography>
      <Typography variant="body2" component="p" align="right" className="artistName">
        {t('introduction.name')}
      </Typography>
    </>
  );
}
