import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';

import './ViewingRoomScreen.scss';

import ViewingRoom from './ViewingRoom/ViewingRoom';
import Details from './Details/Details';

import list from '../filenames';

const MIN_INDEX = 0;
const MAX_INDEX = 193;

interface Match {
  params: {
    id: number;
  };
}

export default function ViewingRoomScreen({ match }: { match?: Match }) {
  const [index, setIndex] = React.useState<number>(match?.params.id || MIN_INDEX);
  const [onDetail, setOnDetail] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const prevImage = new Image();
    const currentImage = new Image();
    const nextImage = new Image();

    prevImage.src = `${process.env.PUBLIC_URL}/images/${list[index !== MIN_INDEX ? index - 1 : MIN_INDEX]}.jpg`;
    currentImage.src = `${process.env.PUBLIC_URL}/images/${list[index]}.jpg`;
    nextImage.src = `${process.env.PUBLIC_URL}/images/${list[index !== MAX_INDEX ? index + 1 : MAX_INDEX]}.jpg`;
  }, [index]);

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  });

  React.useEffect(() => {
    const storedIndex = sessionStorage.getItem('INDEX');
    if (storedIndex) {
      setIndex(Number(storedIndex));
    }
    setLoading(false);
  }, []);

  const handleLeft = React.useCallback(() => {
    if (index !== MIN_INDEX) {
      sessionStorage.setItem('INDEX', String(index - 1));
      setIndex(index - 1);
    }
  }, [index]);

  const handleRight = React.useCallback(() => {
    if (index !== MAX_INDEX) {
      sessionStorage.setItem('INDEX', String(index + 1));
      setIndex(index + 1);
    }
  }, [index]);

  const toggleDetail = () => {
    setOnDetail(!onDetail);
  };

  const turnOffDetail = () => {
    if (onDetail) {
      setOnDetail(false);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.keyCode) {
      case 27:
        turnOffDetail();
        break;
      case 32:
        toggleDetail();
        break;
      case 37:
        handleLeft();
        break;
      case 39:
        handleRight();
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      {!isLoading && (
        <div
          ref={ref}
          tabIndex={0}
          role="button"
          style={{ filter: `brightness(${onDetail ? 0.8 : 1}) blur(${onDetail ? 10 : 0}px)` }}
          className="viewingRoom"
          onClick={turnOffDetail}
          onKeyDown={handleKeydown}
        >
          <ViewingRoom src={`https://d3jjllifozvlym.cloudfront.net/${list[index]}.jpg`} brightness={0.8} />
        </div>
      )}
      <div
        style={{ opacity: onDetail ? 1 : 0 }}
        className="detailScreen"
      >
        <Details idx={index} />
      </div>
      <IconButton id="arrowLeft" onClick={handleLeft} disabled={index === MIN_INDEX} style={{ color: index === MIN_INDEX ? '#444' : 'azure' }}>
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <IconButton id="arrowRight" onClick={handleRight} disabled={index === MAX_INDEX} style={{ color: index === MAX_INDEX ? '#444' : 'azure' }}>
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
      <IconButton id="moreIcon" onClick={toggleDetail}>
        <AssignmentIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
