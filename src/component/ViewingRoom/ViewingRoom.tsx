import React from 'react';
import Grid from '@material-ui/core/Grid';

import './ViewingRoom.scss';

import useWindowSize from '../useWindowSize';

export default function ViewingRoom({ src, brightness = 1 }: { src: string, brightness?: number }) {
  const [imgDimension, setImgDimension] = React.useState<number[]>([]);
  const [size, setSize] = React.useState<number[]>([0, 0]);
  const [containerDimension, setContainerDimension] = React.useState<number[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const [innerWidth, innerHeight] = useWindowSize();

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgDimension([img.width, img.height, img.width / img.height]);
    };
    img.src = src;
  }, [src]);

  React.useEffect(() => {
    if (innerWidth >= 600) {
      setContainerDimension([innerWidth * 0.5, innerHeight * 0.6,
        (innerWidth / innerHeight) * (0.5 / 0.6)]);
    } else {
      setContainerDimension([innerWidth * (2 / 3), innerHeight * 0.6,
        (innerWidth / innerHeight) * (10 / 9)]);
    }
  }, [innerWidth, innerHeight]);

  React.useEffect(() => {
    if (containerDimension[2] > imgDimension[2]) {
      setSize([containerDimension[1] * imgDimension[2], containerDimension[1]]);
    } else {
      setSize([containerDimension[0], containerDimension[0] / imgDimension[2] || 0]);
    }
    setLoading(false);
  }, [containerDimension, imgDimension]);

  return (
    <Grid container className="container">
      <Grid item xs={2} sm={3} />
      <Grid container direction="column" item xs={8} sm={6} id="max-height">
        <Grid item className="heightGrid" />
        <Grid container item xs className="widthContainer">
          {!isLoading && (
            <div className="imageContainer">
              <img
                src={src}
                alt="ViewingRoomImage"
                style={{ width: size[0], height: size[1], filter: `brightness(${brightness * 0.8})` }}
                className="image"
              />
              {imgDimension[2] > 1.5
                ? (
                  <>
                    <img
                      src={`${process.env.PUBLIC_URL}/lantern.png`}
                      alt="lantern"
                      className="lantern"
                      style={{
                        width: size[0] / 2,
                        height: size[1],
                        left: '25%',
                        transform: 'translate(0%, -50%)',
                      }}
                    />
                    <img
                      src={`${process.env.PUBLIC_URL}/lantern.png`}
                      alt="lantern"
                      className="lantern"
                      style={{
                        width: size[0] / 2,
                        height: size[1],
                        right: '25%',
                        transform: 'translate(0%, -50%)',
                      }}
                    />
                  </>
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/lantern.png`}
                    alt="lantern"
                    className="lantern"
                    style={{
                      width: size[0], height: size[1], left: '50%', transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
            </div>
          )}
        </Grid>
        <Grid item className="heightGrid" />
      </Grid>
      <Grid item xs={2} sm={3} />
    </Grid>
  );
}
