import React from 'react';

import './ViewingRoom2.scss';
import info from '../../info.json';

import useWindowSize from '../useWindowSize';

const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';

const widthBreakPoint = 1500;

export default function ViewingRoom({ idx }: { idx: number }) {
  const [isLandscape, setLandscape] = React.useState<boolean | null>(null);
  const refContainer = React.useRef<HTMLDivElement | null>(null);

  const [innerWidth, innerHeight] = useWindowSize();

  React.useEffect(() => {
    const imageRatio = info[idx].width / info[idx].height;
    const windowRatio = innerWidth / innerHeight;

    setLandscape(imageRatio > windowRatio);
  }, [idx, innerWidth, innerHeight]);

  return (
    <div ref={refContainer} className="viewingRoomRootContainer unselectable">
      <div
        style={{
          width: innerWidth > widthBreakPoint ? '70%' : 'calc(100% - 300px)',
          height: innerWidth > widthBreakPoint ? '70%' : 'calc(100% - 300px)',
        }}
        className="maximumContainer"
      >
        <img
          alt={`Decorum ${info[idx].year} - ${info[idx].id}`}
          src={`${STORAGE_URL_MD}/${info[idx].src}`}
          width={isLandscape ? '100%' : 'auto'}
          height={isLandscape ? 'auto' : '100%'}
        />
      </div>
    </div>
  );
}
