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

import info from '../../info.json';

const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';
// const STORAGE_URL_SM = 'https://d1mqeykb8ywbm3.cloudfront.net';
// const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';

interface MotionState {
  touchStartX: number;
  moved: boolean;
  beingTouched: boolean;
  moveTo: string;
}

const defaultMotionState = {
  touchStartX: 0,
  moved: false,
  beingTouched: false,
  moveTo: 'null',
};

const defaultFlag = {
  first: false,
  last: false,
};

const swipeThreshold = 100;

interface ViewingRoomProps extends RouteComponentProps<{ idx: string }> {}

export default function ViewingRoomScreen({ match }: ViewingRoomProps) {
  const { idxMap } = React.useContext(ConfigContext);
  const MAX_INDEX = idxMap.length - 1;
  const [index, setIndex] = React.useState<number>(0);
  const [onDetail, setOnDetail] = React.useState<boolean>(false);
  const [motionState, setMotionState] = React.useState<MotionState>(defaultMotionState);
  const [flag, setFlag] = React.useState<{ first: boolean, last: boolean }>(defaultFlag);

  const history = useHistory();

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setIndex(idxMap.findIndex((element: number) => element === Number(match.params.idx)));
  }, [idxMap, match.params.idx, setIndex]);

  const focusSet = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  React.useEffect(() => {
    focusSet();
  }, []);

  const handleLeft = React.useCallback(() => {
    if (index !== 0) {
      if (onDetail) {
        setOnDetail(false);
        setTimeout(() => history.push(`/viewing-room/${idxMap[index - 1]}`), 700);
      } else {
        setTimeout(() => history.push(`/viewing-room/${idxMap[index - 1]}`), 10);
      }
    } else {
      setFlag({
        ...flag,
        first: true,
      });
      setTimeout(() => setFlag(defaultFlag), 1500);
    }
  }, [idxMap, index, history, onDetail, flag]);

  const handleRight = React.useCallback(() => {
    if (index !== MAX_INDEX) {
      if (onDetail) {
        setOnDetail(false);
        setTimeout(() => history.push(`/viewing-room/${idxMap[index + 1]}`), 700);
      } else {
        setTimeout(() => history.push(`/viewing-room/${idxMap[index + 1]}`), 10);
      }
    } else {
      setFlag({
        ...flag,
        last: true,
      });
      setTimeout(() => setFlag(defaultFlag), 1500);
    }
  }, [idxMap, MAX_INDEX, index, history, onDetail, flag]);

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
    start: React.useCallback((clientX: number) => {
      setMotionState({
        ...motionState,
        touchStartX: clientX,
        beingTouched: true,
      });
    }, [motionState]),
    move: React.useCallback((clientX: number) => {
      if (motionState.beingTouched) {
        const deltaX = clientX - motionState.touchStartX;
        if (deltaX < -swipeThreshold) {
          setMotionState({
            ...motionState,
            moveTo: 'right',
          });
        } else if (deltaX > swipeThreshold) {
          setMotionState({
            ...motionState,
            moveTo: 'left',
          });
        } else {
          setMotionState({
            ...motionState,
            moveTo: 'null',
            moved: true,
          });
        }
      }
    }, [motionState]),
    end: React.useCallback(() => {
      if (motionState.beingTouched && !motionState.moved && !onDetail) {
        handleRight();
      } else if (motionState.beingTouched && motionState.moved) {
        switch (motionState.moveTo) {
          case 'right':
            handleRight();
            break;
          case 'left':
            handleLeft();
            break;
          default:
            break;
        }
      }
      setMotionState(defaultMotionState);
    }, [motionState, handleLeft, handleRight, onDetail]),
  };

  const handleSwipe = {
    touchStart: (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length === 1) {
        handleMotion.start(event.targetTouches[0].clientX);
      }
    },
    touchMove: (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length === 1) {
        handleMotion.move(event.targetTouches[0].clientX);
      }
    },
    touchEnd: () => {
      handleMotion.end();
    },
  };

  return (
    <div className="App">
      <div
        className="alertFirstLast"
        style={{
          opacity: flag.first ? 1 : 0,
          zIndex: flag.first ? 90 : -1,
        }}
      >
        <p>첫번째 그림입니다.</p>
      </div>
      <div
        className="alertFirstLast"
        style={{
          opacity: flag.last ? 1 : 0,
          zIndex: flag.last ? 90 : -1,
        }}
      >
        <p>마지막 그림입니다.</p>
      </div>
      <IconButton
        id="backIcon"
        onClick={() => history.push('/list')}
        disabled={onDetail}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
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
        onTouchEnd={() => handleSwipe.touchEnd()}
      >
        <ViewingRoom
          idx={idxMap[index]}
          src={`${STORAGE_URL_MD}/${info[idxMap[index]].src}`}
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
