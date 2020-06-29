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
import DEFINES from '../../defines';

interface MotionState {
  touchStartX: number;
  touchStartY: number;
  moved: boolean;
  beingTouched: boolean;
  moveTo: string;
  isMultiTouch: boolean;
}

const defaultMotionState = {
  touchStartX: 0,
  touchStartY: 0,
  moved: false,
  beingTouched: false,
  moveTo: 'null',
  isMultiTouch: true,
};

const defaultFlag = {
  first: false,
  last: false,
};

const swipeThreshold = {
  x: 100,
  y: 200,
};

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

  React.useEffect(() => {
    idxMap.slice(Math.max(index - 2, 0), Math.min(index + 3, MAX_INDEX)).forEach((idx) => {
      const img = new Image();
      img.src = `${DEFINES.STORAGE_URL_MD}/${info[idx].src}`;
    });
  }, [MAX_INDEX, idxMap, index]);

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
    start: React.useCallback((touchStartX: number, touchStartY: number) => {
      setMotionState({
        ...motionState,
        touchStartX,
        touchStartY,
        beingTouched: true,
        isMultiTouch: false,
      });
    }, [motionState]),
    move: React.useCallback((clientX: number, clientY: number) => {
      if (motionState.beingTouched) {
        const deltaX = clientX - motionState.touchStartX;
        const deltaY = clientY - motionState.touchStartY;
        if (deltaY < -(swipeThreshold.y / 2) && Math.abs(deltaX) < swipeThreshold.x) {
          setMotionState({
            ...motionState,
            moveTo: 'up',
            moved: true,
          });
        } else if (deltaX < -swipeThreshold.x && Math.abs(deltaY) < swipeThreshold.y) {
          setMotionState({
            ...motionState,
            moveTo: 'right',
            moved: true,
          });
        } else if (deltaX > swipeThreshold.x && Math.abs(deltaY) < swipeThreshold.y) {
          setMotionState({
            ...motionState,
            moveTo: 'left',
            moved: true,
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
      if (!motionState.isMultiTouch) {
        if (motionState.beingTouched && !motionState.moved && !onDetail) {
          setTimeout(() => handleRight(), 0);
        } else if (motionState.beingTouched && motionState.moved) {
          switch (motionState.moveTo) {
            case 'up':
              if (!onDetail && index !== 0 && index !== MAX_INDEX) {
                setOnDetail(true);
              }
              break;
            case 'right':
              setTimeout(() => handleRight(), 0);
              break;
            case 'left':
              setTimeout(() => handleLeft(), 0);
              break;
            default:
              break;
          }
        }
      }
      setMotionState(defaultMotionState);
    }, [motionState, handleLeft, handleRight, onDetail, index, MAX_INDEX]),
  };

  const handleSwipe = {
    touchStart: (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length === 1) {
        handleMotion.start(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
      }
    },
    touchMove: (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length === 1) {
        handleMotion.move(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
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
        className="fieed"
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
          src={`${DEFINES.STORAGE_URL_MD}/${info[idxMap[index]].src}`}
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
          src={`${DEFINES.STORAGE_URL_MD}/${info[idxMap[index]].src}`}
        />
      </div>
      <IconButton
        id="arrowLeft"
        className="fixed"
        onClick={() => {
          handleLeft();
          setTimeout(() => focusSet(), 10);
        }}
        style={{
          display: index === 0 ? 'none' : '',
        }}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="arrowRight"
        className="fixed"
        onClick={() => {
          handleRight();
          setTimeout(() => focusSet(), 10);
        }}
        disabled={index === MAX_INDEX}
        style={{
          display: index === MAX_INDEX ? 'none' : '',
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="moreIcon"
        onClick={() => {
          toggleDetail();
          setTimeout(() => focusSet(), 10);
        }}
      >
        <AssignmentIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="closeIcon"
        onClick={() => {
          setOnDetail(false);
          setTimeout(() => focusSet(), 10);
        }}
        disabled={!onDetail}
        style={{ opacity: onDetail ? 1 : 0 }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
