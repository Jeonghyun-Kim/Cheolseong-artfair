import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import './ContactScreen.scss';
import info from '../../info.json';

import useWindowSize from '../useWindowSize';
import ViewingRoom from '../ViewingRoom/ViewingRoom';

const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';

interface ContactProps extends RouteComponentProps<{ idx: string }> {}

export default function ContactScreen({ match }: ContactProps) {
  // const [isSmall, setSmall] = React.useState<boolean>(false);
  const [innerWidth, innerHeight] = useWindowSize();
  const [size, setSize] = React.useState<number[]>([]);
  const history = useHistory();

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setSize([img.width, img.height, img.width / img.height]);
    };
    img.src = `${STORAGE_URL_MD}/${info[Number(match.params.idx)].src}`;
  }, [match.params.idx]);

  // React.useEffect(() => {
  //   setSmall(innerWidth < 600);
  // }, [innerWidth]);

  return (
    <div className="App">
      <IconButton
        id="backIcon"
        onClick={() => history.goBack()}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Grid container justify="center" className="contactContainer">
        <Grid item container xs={10} sm={8} justify="center">
          <Card className="contactCardRoot" style={{ maxHeight: innerHeight * (4 / 5) }}>
            <Grid item container md={4}>
              {size && size[2] < 1.5 && (
                <img
                  alt="Decorum"
                  src={`${STORAGE_URL_MD}/${info[Number(match.params.idx)].src}`}
                  className="contactCardImage"
                />
              )}
            </Grid>
            <Grid item sm={12} md={8}>
              {size && size[2] >= 1.5 && (
                <img
                  alt="Decorum"
                  src={`${STORAGE_URL_MD}/${info[Number(match.params.idx)].src}`}
                  className="contactCardImage"
                  style={{ maxHeight: innerHeight / 5 }}
                />
              )}
              <CardContent>
              </CardContent>
              <CardActions>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
