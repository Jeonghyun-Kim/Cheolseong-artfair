import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CopyToClipboard from 'react-copy-to-clipboard';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import { useTranslation } from 'react-i18next';

import './Details.scss';
import info from '../../info.json';
import DEFINES from '../../defines';

export default function Details({ idx, src }:
{ idx: number, src: string }) {
  const [alert, setAlert] = React.useState<string | null>(null);

  const { t } = useTranslation();

  const handleAlert = () => {
    setAlert(t('detail.copied_to_clipboard'));
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Card className="cardRoot">
      <div className="imgBackground">
        <img
          alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
          src={src}
          className="cardImage"
          style={{
            borderRadius: info[idx].src === '2013_5.gif' ? 999 : 2,
          }}
        />
      </div>
      <div className="cardContent">
        <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h5">
            Decorum <span style={{ fontSize: 18, float: 'right' }}>{info[idx].year} - {info[idx].id}</span>
          </Typography>
          <div className="grow" />
          <Typography align="right" variant="body2" color="textSecondary" component="p">
            {info[idx].height}x{info[idx].width}cm
          </Typography>
          <Typography align="right" variant="body2" color="textSecondary" component="p">
            Oil on Canvas
          </Typography>
          <Grid container justify="space-between">
            <Grid item xs>
              <Typography variant="body1" color="textSecondary" component="p">
                {alert && (
                  alert
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary" component="p" id="price">
                {info[idx].price === 'sold out'
                  ? (
                    'SOLD OUT'
                  ) : (
                    `${(Number(info[idx].price) * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${t('currency')}`
                  )}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {info[idx].price === 'sold out' && (
            <Brightness1Icon fontSize="small" id="soldOutIcon" />
          )}
          <div className="grow" />
          <CopyToClipboard
            text={`${DEFINES.DOMAIN}/viewing-room/${idx}`}
            onCopy={handleAlert}
          >
            <Button size="small" color="primary">
              {t('detail.share')}
            </Button>
          </CopyToClipboard>
          <Button size="small" color="primary">
            <Link to={`/contact/${idx}`} className="buttonLink">
              {t('detail.contact')}
            </Link>
          </Button>
          <Button size="small" color="primary">
            <Link to={`/poster/${idx}`} className="buttonLink">
              {t('detail.printing')}
            </Link>
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
