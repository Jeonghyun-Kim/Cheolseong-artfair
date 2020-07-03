import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import ViewingRoom from '../ViewingRoom/ViewingRoom';
import Details from '../Details/Details';
import MenuScreen from '../MenuScreen/MenuScreen';
import IntroScreen from '../IntroScreen/IntroScreen';
import VideoScreen from '../VideoScreen/VideoScreen';

import info from '../../info.json';
import DEFINES from '../../defines';

import './SummaryScreen.scss';

const idxMap = [-1, 53, 119, 89, 126, 197, -2, -3];

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

const swipeThreshold = {
  x: 100,
  y: 200,
};

export default function SummaryScreen() {
  const MAX_INDEX = idxMap.length - 1;
  const [index, setIndex] = React.useState<number>(0);
  const [onDetail, setOnDetail] = React.useState<boolean>(false);
  const [onAbout, setOnAbout] = React.useState<boolean>(false);
  const [motionState, setMotionState] = React.useState<MotionState>(defaultMotionState);
  const [seenGuide, setSeenGuide] = React.useState<boolean>(
    JSON.parse(sessionStorage.getItem('@seenGuide') ?? 'false'),
  );

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    idxMap.slice(1, MAX_INDEX - 1).forEach((idx) => {
      const img = new Image();
      img.src = `${DEFINES.STORAGE_URL_MD}/${info[idx].src}`;
    });
  }, [MAX_INDEX]);

  const focusSet = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  React.useEffect(() => {
    focusSet();
    const exIndex = sessionStorage.getItem('@index');
    if (exIndex) {
      setIndex(JSON.parse(exIndex));
    }
  }, []);

  const handleLeft = React.useCallback(() => {
    if (index !== 0) {
      if (onDetail) {
        setOnDetail(false);
        setTimeout(() => setIndex(index - 1), 700);
      } else if (onAbout) {
        setOnAbout(false);
        setTimeout(() => setIndex(index - 1), 1000);
      } else {
        setTimeout(() => setIndex(index - 1), 10);
      }
      sessionStorage.setItem('@index', JSON.stringify(index - 1));
    }
  }, [index, onDetail, onAbout]);

  const handleRight = React.useCallback(() => {
    if (index !== MAX_INDEX) {
      if (onDetail) {
        setOnDetail(false);
        setTimeout(() => setIndex(index + 1), 700);
      } else {
        setTimeout(() => setIndex(index + 1), 10);
      }
      sessionStorage.setItem('@index', JSON.stringify(index + 1));
    }
  }, [MAX_INDEX, index, onDetail]);

  const toggleDetail = () => {
    if (index !== 0 && index < MAX_INDEX - 1) {
      setOnDetail(!onDetail);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!seenGuide && index !== 0 && index < MAX_INDEX - 1) {
      if (event.keyCode !== 122) {
        setSeenGuide(true);
        sessionStorage.setItem('@seenGuide', 'true');
      }
    } else if (index === MAX_INDEX && event.keyCode === 32) {
      setOnAbout(!onAbout);
    } else {
      switch (event.keyCode) {
        case 27:
          if (onDetail) {
            setOnDetail(false);
          }
          if (onAbout) {
            setOnAbout(false);
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
    }
    setTimeout(() => focusSet(), 10);
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
              if (!onDetail && index !== 0 && index < MAX_INDEX - 1) {
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
      if (!seenGuide && index !== 0 && index < MAX_INDEX - 1) {
        setSeenGuide(true);
        sessionStorage.setItem('@seenGuide', 'true');
      } else {
        handleMotion.end();
      }
    },
  };

  const renderSwitch = () => {
    switch (index) {
      case 0:
        return <IntroScreen />;
      case MAX_INDEX - 1:
        return <VideoScreen />;
      case MAX_INDEX:
        return <MenuScreen onAbout={onAbout} setOnAbout={setOnAbout} />;
      default:
        return (
          <>
            <div
              id="viewingroomDiv"
              className="background"
              style={{
                filter: `blur(${seenGuide && !onDetail ? 0 : 8}px)`,
                transform: `scale(${seenGuide && !onDetail ? 1 : 1.1})`,
              }}
            >
              <ViewingRoom
                idx={idxMap[index]}
                src={`${DEFINES.STORAGE_URL_MD}/${info[idxMap[index]].src}`}
              />
            </div>
            {!seenGuide && (
              <div
                className="guide"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSeenGuide(true);
                  sessionStorage.setItem('@seenGuide', 'true');
                  setTimeout(() => focusSet(), 10);
                }}
                onKeyDown={(e) => {
                  if (e.keyCode !== 122) {
                    setSeenGuide(true);
                    sessionStorage.setItem('@seenGuide', 'true');
                    setTimeout(() => focusSet(), 10);
                  }
                }}
              >
                <div className="guideBackground" />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="summaryApp background">
      <div
        ref={ref}
        tabIndex={0}
        className="pagenator"
        role="button"
        onClick={() => {
          setOnDetail(false);
          setTimeout(() => focusSet(), 10);
        }}
        onKeyDown={handleKeydown}
        onTouchStart={handleSwipe.touchStart}
        onTouchMove={handleSwipe.touchMove}
        onTouchEnd={() => handleSwipe.touchEnd()}
      >
        {renderSwitch()}
      </div>
      {index !== 0 && index < MAX_INDEX - 1 && (
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
      )}
      <IconButton
        id="arrowLeft"
        onClick={() => {
          if (!seenGuide && index !== 0 && index < MAX_INDEX - 1) {
            setSeenGuide(true);
            sessionStorage.setItem('@seenGuide', 'true');
          } else {
            handleLeft();
          }
          setTimeout(() => focusSet(), 10);
        }}
        style={{
          display: index === 0 || onAbout ? 'none' : '',
        }}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="arrowRight"
        onClick={() => {
          if (!seenGuide && index !== 0 && index < MAX_INDEX - 1) {
            setSeenGuide(true);
            sessionStorage.setItem('@seenGuide', 'true');
          } else {
            handleRight();
          }
          setTimeout(() => focusSet(), 10);
        }}
        disabled={index === MAX_INDEX}
        style={{
          display: index === MAX_INDEX ? 'none' : '',
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
      {index !== 0 && index < MAX_INDEX - 1 && (
        <IconButton
          id="moreIcon"
          onClick={() => {
            if (!seenGuide && index !== 0 && index < MAX_INDEX - 1) {
              setSeenGuide(true);
              sessionStorage.setItem('@seenGuide', 'true');
            } else {
              toggleDetail();
            }
            setTimeout(() => focusSet(), 10);
          }}
        >
          <AssignmentIcon fontSize="large" />
        </IconButton>
      )}
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
