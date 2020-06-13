import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CopyToClipboard from 'react-copy-to-clipboard';
import Brightness1Icon from '@material-ui/icons/Brightness1';

import './Details.scss';
import info from '../../info.json';

import useWindowSize from '../useWindowSize';

export default function Details({ idx, src }: { idx: number, src: string }) {
  const [isSmall, setSmall] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<string | null>(null);
  const [innerWidth, innerHeight] = useWindowSize();

  React.useEffect(() => {
    setSmall(innerWidth < 600);
  }, [innerWidth]);

  const handleAlert = () => {
    setAlert('주소가 클립보드에 복사되었습니다.');
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Card
      className="cardRoot"
      style={{
        width: Math.min(innerWidth * (3 / 4), 600),
        maxHeight: innerHeight - 180,
        top: isSmall ? 'calc(50% - 35px)' : '50%',
      }}
    >
      <div className="imgBackgroud">
        <img
          alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
          src={src}
          className="cardImage"
          style={{ maxHeight: isSmall ? innerHeight - 370 : innerHeight - 440 }}
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Decorum {info[idx].year} - {info[idx].id}
        </Typography>
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
                  `${info[idx].price} 만원`
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
          text={`https://kay.airygall.com/viewing-room/${idx}`}
          onCopy={handleAlert}
        >
          <Button size="small" color="primary">
            Share
          </Button>
        </CopyToClipboard>
        <Button size="small" color="primary" href="https://forms.gle/NLBHc8GgPDwZrPwK7" target="_blank">
          Contact
        </Button>
      </CardActions>
    </Card>
  );
}
