import React from 'react';

import './ViewingRoom2.scss';
import info from '../../info.json';

import useWindowSize from '../useWindowSize';

// const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';

export default function ViewingRoom({ idx, src }: { idx: number, src: string }) {
  const [isLandscape, setLandscape] = React.useState<boolean | null>(null);
  const [maxSize, setMaxSize] = React.useState<string[]>(['calc(80% - 120px)', 'calc(80% - 200px)']);
  const refContainer = React.useRef<HTMLDivElement | null>(null);

  const [innerWidth, innerHeight] = useWindowSize();

  React.useEffect(() => {
    const imageRatio = info[idx].width / info[idx].height;
    const windowRatio = innerWidth / innerHeight;

    setLandscape(imageRatio > windowRatio);
  }, [idx, innerWidth, innerHeight]);

  React.useEffect(() => {
    if (innerWidth < 500) {
      setMaxSize(['calc(100% - 120px)', 'calc(100% - 200px)']);
    } else if (innerWidth < 1000) {
      setMaxSize(['calc(90% - 120px)', 'calc(90% - 200px)']);
    } else {
      setMaxSize(['calc(80% - 120px)', 'calc(80% - 200px)']);
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
          <img
            alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
            src={src}
            width={isLandscape ? '100%' : 'auto'}
            height={isLandscape ? 'auto' : '100%'}
          />
        )}
      </div>
    </div>
  );
}
