import React from 'react';

import './ViewingRoom.scss';
import info from '../../info.json';

export default function ViewingRoom({ idx, src, windowSize }:
{ idx: number, src: string, windowSize: [number, number] }) {
  const [isLandscape, setLandscape] = React.useState<boolean[] | null>(null);
  const [maxSize, setMaxSize] = React.useState<string[]>(['calc(80% - 120px)', 'calc(80% - 200px)']);
  const [lanternOpacities, setLanternOpacities] = React.useState<number[] | null>(null);
  const refContainer = React.useRef<HTMLDivElement | null>(null);

  const [innerWidth, innerHeight] = windowSize;
  const imageRatio = info[idx].width / info[idx].height;

  React.useEffect(() => {
    const windowRatio = innerWidth / innerHeight;

    setLandscape([imageRatio > windowRatio, imageRatio > 1.5]);
  }, [imageRatio, innerWidth, innerHeight]);

  React.useEffect(() => {
    if (innerWidth < 700) {
      setMaxSize(['calc(100% - 80px)', '60%']);
    } else if (innerWidth < 1500) {
      setMaxSize(['calc(75% - 120px)', '60%']);
    } else {
      setMaxSize(['calc(60% - 120px)', '60%']);
    }
  }, [innerWidth]);

  React.useEffect(() => {
    if (refContainer.current && isLandscape !== null) {
      const containerWidth = refContainer.current.clientWidth;
      const lanternHalfWidth = isLandscape[0]
        ? refContainer.current.clientWidth
        : refContainer.current.clientHeight * imageRatio;
      setLanternOpacities([
        (containerWidth / lanternHalfWidth) ** 0.5 * 0.8,
        (containerWidth / (lanternHalfWidth * 2)) ** 0.5,
      ]);
    }
  }, [imageRatio, isLandscape]);

  return (
    <div className="viewingRoomRootContainer unselectable">
      <div
        ref={refContainer}
        style={{
          width: maxSize[0],
          height: maxSize[1],
        }}
        className="maximumContainer"
      >
        {isLandscape !== null && lanternOpacities && (
        <>
          {isLandscape[1] ? (
            <>
              <img
                alt="lantern"
                src={`${process.env.PUBLIC_URL}/lantern${innerWidth < 1000 ? '_small' : ' (1)'}.png`}
                width={isLandscape[0] ? '100%' : 'auto'}
                height={isLandscape[0] ? 'auto' : `${90 * imageRatio}%`}
                className="lantern half"
                style={{
                  left: '25%',
                  transform: 'translate(0%, -50%)',
                  opacity: lanternOpacities[0],
                }}
              />
              <img
                alt="lantern"
                src={`${process.env.PUBLIC_URL}/lantern${innerWidth < 1000 ? '_small' : ' (1)'}.png`}
                width={isLandscape[0] ? '100%' : 'auto'}
                height={isLandscape[0] ? 'auto' : `${90 * imageRatio}%`}
                className="lantern half"
                style={{
                  right: '25%',
                  transform: 'translate(0%, -50%)',
                  opacity: lanternOpacities[0],
                }}
              />
            </>
          ) : (
            <img
              alt="lantern"
              src={`${process.env.PUBLIC_URL}/lantern${innerWidth < 1000 ? '_small' : ' (1)'}.png`}
              width={isLandscape[0] ? '200%' : 'auto'}
              height={isLandscape[0] ? 'auto' : `${180 * imageRatio}%`}
              className="lantern full"
              style={{
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: lanternOpacities[1],
              }}
            />
          )}
          <img
            alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
            src={src}
            width={isLandscape[0] ? '100%' : 'auto'}
            height={isLandscape[0] ? 'auto' : '100%'}
            className="painting"
            style={{ borderRadius: info[idx].src === '2013_5.gif' ? 999 : 2 }}
          />
        </>
        )}
      </div>
    </div>
  );
}
