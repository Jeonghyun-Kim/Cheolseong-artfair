import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Details.scss';
import list from '../../filenames';
import informations from './info.json';

import useWindowSize from '../useWindowSize';

import ViewingRoom from '../ViewingRoom/ViewingRoom';

interface Information {
  id: number;
  year: number;
  price: number | string;
  size: string;
}

export default function Details({ idx }: { idx: number }) {
  const [isSmall, setSmall] = React.useState<boolean>(false);
  const [innerWidth, innerHeight] = useWindowSize();

  React.useEffect(() => {
    setSmall(innerWidth < 600);
  }, [innerWidth]);

  const information: Information = informations[idx];
  const fileName = list[idx];

  return (
    <Card className="cardRoot" style={{ width: Math.min(innerWidth * 3 / 4, 520), top: isSmall ? 'calc(50% - 35px)' : '50%' }}>
      <div className="imgBackgroud">
        <img
          alt={`Decorum ${information.year} - ${information.id}`}
          src={`${process.env.PUBLIC_URL}/images/${fileName}.jpg`}
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
        <Typography align="right" variant="body1" color="textSecondary" component="p" id="price">
          {information.price === 'sold out'
            ? (
              'SOLD OUT'
            ) : (
              `${information.price} 만원`
            )}
        </Typography>
      </CardContent>
      <CardActions>
        <div className="grow" />
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Contact
        </Button>
      </CardActions>
    </Card>
  );
}
