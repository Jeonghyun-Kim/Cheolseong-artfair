import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import './ViewingRoomScreen.scss';

import ViewingRoom from '../ViewingRoom/ViewingRoom';
import Details from '../Details/Details';
import ConfigContext from '../../ConfigContext';

import useWindowSize from '../useWindowSize';

import info from '../../info.json';

const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';
// const STORAGE_URL_SM = 'https://d1mqeykb8ywbm3.cloudfront.net';
// const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';

interface MotionState {
  touchStartX: number;
  beingTouched: boolean;
}

const defaultMotionState = {
  touchStartX: 0,
  beingTouched: false,
};

const swipeThreshold = 100;

interface ViewingRoomProps extends RouteComponentProps<{ idx: string }> {}

export default function ViewingRoomScreen({ match }: ViewingRoomProps) {
  const { idxMap } = React.useContext(ConfigContext);
  const MAX_INDEX = idxMap.length - 1;
  const [index, setIndex] = React.useState<number>(0);
  const [onDetail, setOnDetail] = React.useState<boolean>(false);
  const [motionState, setMotionState] = React.useState<MotionState>(defaultMotionState);

  const history = useHistory();
  const [innerWidth, innerHeight] = useWindowSize();
  // const [innerWidth, innerHeight] = [window.innerWidth, window.innerHeight];

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setIndex(idxMap.findIndex((element: number) => element === Number(match.params.idx)));
  }, [idxMap, match.params.idx, setIndex]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleLeft = React.useCallback(() => {
    if (index !== 0) {
      history.push(`/viewing-room/${idxMap[index - 1]}`);
      setOnDetail(false);
    }
  }, [idxMap, index, history]);

  const handleRight = React.useCallback(() => {
    if (index !== MAX_INDEX) {
      history.push(`/viewing-room/${idxMap[index + 1]}`);
      setOnDetail(false);
    }
  }, [idxMap, MAX_INDEX, index, history]);

  const toggleDetail = () => {
    setOnDetail(!onDetail);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.keyCode) {
      case 27:
        if (onDetail) {
          setOnDetail(false);
        } else {
          history.push('/list');
        }
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

  const handleMotion = {
    start: (clientX: number) => {
      setMotionState({
        ...motionState,
        touchStartX: clientX,
        beingTouched: true,
      });
    },
    move: (clientX: number) => {
      if (motionState.beingTouched) {
        const touchX = clientX;
        const deltaX = touchX - motionState.touchStartX;
        if (deltaX < -swipeThreshold) {
          setTimeout(() => {
            handleRight();
          }, 250);
        } else if (deltaX > swipeThreshold) {
          setTimeout(() => {
            handleLeft();
          }, 250);
        }
      }
    },
    end: () => {
      setMotionState(defaultMotionState);
    },
  };

  const handleSwipe = {
    touchStart: (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleMotion.start(event.targetTouches[0].clientX);
    },
    touchMove: (event: React.TouchEvent<HTMLDivElement>) => {
      handleMotion.move(event.targetTouches[0].clientX);
    },
    touchEnd: () => {
      handleMotion.end();
    },
  };

  return (
    <div className="App">
      <div
        ref={ref}
        tabIndex={0}
        role="button"
        style={{
          filter: `brightness(${onDetail ? 0.8 : 1}) blur(${onDetail ? 10 : 0}px)`,
        }}
        className="viewingRoom"
        onClick={() => setOnDetail(false)}
        onKeyDown={handleKeydown}
        onTouchStart={handleSwipe.touchStart}
        onTouchMove={handleSwipe.touchMove}
        onTouchEnd={() => handleSwipe.touchEnd}
      >
        <IconButton
          id="backIcon"
          onClick={() => history.push('/list')}
          disabled={onDetail}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <ViewingRoom
          idx={idxMap[index]}
          src={`${STORAGE_URL_MD}/${info[idxMap[index]].src}`}
          windowSize={[innerWidth, innerHeight]}
        />
      </div>
      <div
        style={{
          opacity: onDetail ? 1 : 0,
          zIndex: onDetail ? 100 : -1,
        }}
        className="detailScreen"
      >
        <Details
          idx={idxMap[index]}
          src={`${STORAGE_URL_MD}/${info[idxMap[index]].src}`}
          windowSize={[innerWidth, innerHeight]}
        />
      </div>
      <IconButton
        id="arrowLeft"
        onClick={handleLeft}
        disabled={index === 0}
        style={{
          color: index === 0 ? '#222' : 'rgba(149, 148, 160, 0.664)',
        }}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="arrowRight"
        onClick={handleRight}
        disabled={index === MAX_INDEX}
        style={{ color: index === MAX_INDEX ? '#222' : 'rgba(149, 148, 160, 0.664)' }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="moreIcon"
        onClick={toggleDetail}
      >
        <AssignmentIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="closeIcon"
        onClick={() => setOnDetail(false)}
        disabled={!onDetail}
        style={{ opacity: onDetail ? 1 : 0 }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
