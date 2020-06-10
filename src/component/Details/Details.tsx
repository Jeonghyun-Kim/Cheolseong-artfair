import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CopyToClipboard from 'react-copy-to-clipboard';

import './Details.scss';
import list from '../../filenames';
import informations from './info.json';

import useWindowSize from '../useWindowSize';

const STORAGE_URL = 'https://d3jjllifozvlym.cloudfront.net';

interface Information {
  id: number;
  year: number;
  price: number | string;
  size: string;
}

export default function Details({ idx }: { idx: number }) {
  const [isSmall, setSmall] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<string | null>(null);
  const [innerWidth, innerHeight] = useWindowSize();

  React.useEffect(() => {
    setSmall(innerWidth < 600);
  }, [innerWidth]);

  const information: Information = informations[idx];
  const fileName = list[idx];

  const handleAlert = () => {
    setAlert('주소가 클립보드에 복사되었습니다.');
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Card className="cardRoot" style={{ width: Math.min(innerWidth * (3 / 4), 520), top: isSmall ? 'calc(50% - 35px)' : '50%' }}>
      <div className="imgBackgroud">
        <img
          alt={`Decorum ${information.year} - ${information.id}`}
          src={`${STORAGE_URL}/${fileName}.jpg`}
          className="cardImage"
          style={{ maxHeight: isSmall ? innerHeight - 300 : innerHeight - 370 }}
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Decorum {information.year} - {information.id}
        </Typography>
        <Typography align="right" variant="body2" color="textSecondary" component="p">
          {information.size}
        </Typography>
        <Typography align="right" variant="body2" color="textSecondary" component="p">
          Oil on Canvas
        </Typography>
        <Grid container justify="space-between">
          <Grid item xs>
            <Typography align="center" variant="body1" color="textSecondary" component="p">
              {alert && (
                alert
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary" component="p" id="price">
              {information.price === 'sold out'
                ? (
                  'SOLD OUT'
                ) : (
                  `${information.price} 만원`
                )}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
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
