/* eslint-disable max-len */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';

export default function Review() {
  const [seeMore, setSeeMore] = React.useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h5" className="title">
        {t('review.title')}
        <Button
          id="seeMoreButton"
          color="default"
          type="button"
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? t('review.see_less') : t('review.see_more')}
        </Button>
      </Typography>
      <Typography component="p">
        {t('review.p1')}
      </Typography>
      {!seeMore ? ('...') : (
        <>
          <Typography component="p">
            {t('review.p2')}
          </Typography>
          <Typography component="p">
            {t('review.p3')}
          </Typography>
          <Typography component="p">
            {t('review.p4')}
          </Typography>
          <Typography component="p">
            {t('review.p5')}
          </Typography>
          <Typography component="p">
            {t('review.p6')}
          </Typography>
          <Typography component="p">
            {t('review.p7')}
          </Typography>
          <Typography component="p">
            {t('review.p8')}
          </Typography>
          <Typography component="p">
            {t('review.p9')}
          </Typography>
          <Typography component="p">
            {t('review.p10')}
          </Typography>
          <Typography component="p">
            {t('review.p11')}
          </Typography>
          <Typography component="p">
            {t('review.p12')}
          </Typography>
          <Typography component="p">
            {t('review.p13')}
          </Typography>
          <Typography component="p">
            {t('review.p14')}
          </Typography>
          <Typography component="p">
            {t('review.p15')}
          </Typography>
          <Typography component="p">
            {t('review.p16')}
          </Typography>
        </>
      )}
    </>
  );
}
