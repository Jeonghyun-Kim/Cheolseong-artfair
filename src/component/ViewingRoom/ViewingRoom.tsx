import React from 'react';

import './ViewingRoom.scss';
import info from '../../info.json';

import useWindowSize from '../useWindowSize';

export default function ViewingRoom({ idx, src }:
{ idx: number, src: string }) {
  const [isLandscape, setLandscape] = React.useState<boolean[] | null>(null);
  const [maxSize, setMaxSize] = React.useState<string[]>(['calc(80% - 120px)', 'calc(80% - 200px)']);
  const refContainer = React.useRef<HTMLDivElement | null>(null);

  const [innerWidth, innerHeight] = useWindowSize();
  const imageRatio = info[idx].width / info[idx].height;

  React.useEffect(() => {
    const windowRatio = innerWidth / innerHeight;

    setLandscape([imageRatio > windowRatio, imageRatio > 1.5]);
  }, [imageRatio, innerWidth, innerHeight]);

  React.useEffect(() => {
    if (innerWidth < 700) {
      setMaxSize(['calc(100% - 40px)', '60%']);
    } else {
      setMaxSize(['calc(60% - 120px)', '60%']);
    }
  }, [innerWidth]);

  return (
    <div className="viewingRoomRootContainer unselectable">
      {innerWidth < 700 && innerWidth < innerHeight ? (
        <>
          <img
            alt="lantern"
            src={`${process.env.PUBLIC_URL}/lantern (1).png`}
            height={innerHeight}
            draggable="false"
            className="lanternPortrait"
          />
          <img
            alt="lantern"
            src={`${process.env.PUBLIC_URL}/lantern (1).png`}
            height={innerHeight}
            draggable="false"
            className="lanternPortrait"
          />
          <img
            alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
            src={src}
            className="imagePortrait"
            draggable="false"
            style={{ borderRadius: info[idx].src === '2013_5.gif' ? 999 : 2 }}
          />
        </>
      ) : (
        <>
          <div
            ref={refContainer}
            style={{
              width: maxSize[0],
              height: maxSize[1],
            }}
            className="maximumContainer"
          >
            {isLandscape !== null && (
            <>
              <img
                alt="lantern"
                src={`${process.env.PUBLIC_URL}/lantern (1).png`}
                width={isLandscape[0] ? '200%' : 'auto'}
                height={isLandscape[0] ? 'auto' : `${180 * imageRatio}%`}
                className="lantern full"
                draggable="false"
                style={{
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.75,
                }}
              />
              <img
                alt="lantern"
                src={`${process.env.PUBLIC_URL}/lantern (1).png`}
                width={isLandscape[0] ? '200%' : 'auto'}
                height={isLandscape[0] ? 'auto' : `${180 * imageRatio}%`}
                className="lantern full"
                draggable="false"
                style={{
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.75,
                }}
              />
              <img
                alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
                src={src}
                className="painting"
                draggable="false"
                style={{ borderRadius: info[idx].src === '2013_5.gif' ? 999 : 2 }}
              />
            </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
