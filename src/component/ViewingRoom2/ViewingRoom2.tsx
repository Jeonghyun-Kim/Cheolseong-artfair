import React from 'react';

import './ViewingRoom2.scss';
import info from '../../info.json';

import useWindowSize from '../useWindowSize';

// const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';

export default function ViewingRoom({ idx, src }: { idx: number, src: string }) {
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
    if (innerWidth < 500) {
      setMaxSize(['calc(100% - 120px)', 'calc(100% - 200px)']);
    } else if (innerWidth < 1500) {
      setMaxSize(['calc(75% - 120px)', 'calc(100% - 300px)']);
    } else {
      setMaxSize(['calc(60% - 120px)', 'calc(100% - 400px)']);
    }
  }, [innerWidth]);

  return (
    <div ref={refContainer} className="viewingRoomRootContainer unselectable">
      <div
        style={{
          width: maxSize[0],
          height: maxSize[1],
        }}
        className="maximumContainer"
      >
        {isLandscape !== null && (
          <>
            {isLandscape[1] ? (
              <>
                <img
                  alt="lantern"
                  src={`${process.env.PUBLIC_URL}/lantern (1).png`}
                  width={isLandscape[0] ? '200%' : 'auto'}
                  height={isLandscape[0] ? 'auto' : `${180 * imageRatio}%`}
                  className="lantern"
                  style={{
                    left: '25%',
                    transform: 'translate(-25%, -50%)',
                  }}
                />
                <img
                  alt="lantern"
                  src={`${process.env.PUBLIC_URL}/lantern (1).png`}
                  width={isLandscape[0] ? '200%' : 'auto'}
                  height={isLandscape[0] ? 'auto' : `${180 * imageRatio}%`}
                  className="lantern"
                  style={{
                    right: '25%',
                    transform: 'translate(25%, -50%)',
                  }}
                />
              </>
            ) : (
              <img
                alt="lantern"
                src={`${process.env.PUBLIC_URL}/lantern (1).png`}
                width={isLandscape[0] ? '200%' : 'auto'}
                height={isLandscape[0] ? 'auto' : `${180 * imageRatio}%`}
                className="lantern"
                style={{
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
            <img
              alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
              src={src}
              width={isLandscape[0] ? '100%' : 'auto'}
              height={isLandscape[0] ? 'auto' : '100%'}
              className="painting"
            />
          </>
        )}
      </div>
    </div>
  );
}
