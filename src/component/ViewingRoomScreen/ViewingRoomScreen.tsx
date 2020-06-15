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
const STORAGE_URL_SM = 'https://d1mqeykb8ywbm3.cloudfront.net';
const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';

interface ViewingRoomProps extends RouteComponentProps<{ idx: string }> {}

export default function ViewingRoomScreen({ match }: ViewingRoomProps) {
  const { idxMap } = React.useContext(ConfigContext);
  const MAX_INDEX = idxMap.length - 1;
  const [index, setIndex] = React.useState<number>(0);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const [onDetail, setOnDetail] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const history = useHistory();

  React.useEffect(() => {
    setIndex(idxMap.findIndex((element: number) => element === Number(match.params.idx)));
  }, [idxMap, match.params.idx, setIndex]);

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (window.innerWidth > 800) {
      setImgSrc(STORAGE_URL_MD);
    } else if (window.innerWidth > 400) {
      setImgSrc(STORAGE_URL_SM);
    } else {
      setImgSrc(STORAGE_URL_XS);
    }
    setLoading(false);
  }, [index]);

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

  return (
    <div className="App">
      {!isLoading && (
        <div
          ref={ref}
          tabIndex={0}
          role="button"
          style={{ filter: `brightness(${onDetail ? 0.8 : 1}) blur(${onDetail ? 10 : 0}px)` }}
          className="viewingRoom"
          onClick={() => setOnDetail(false)}
          onKeyDown={handleKeydown}
        >
          <IconButton
            id="backIcon"
            onClick={() => history.push('/list')}
            disabled={onDetail}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          {imgSrc && (
            <ViewingRoom idx={idxMap[index]} src={`${imgSrc}/${info[idxMap[index]].src}`} />
          )}
        </div>
      )}
      <div
        style={{
          opacity: onDetail ? 1 : 0,
          zIndex: onDetail ? 100 : -1,
        }}
        className="detailScreen"
      >
        <Details idx={idxMap[index]} src={`${imgSrc}/${info[idxMap[index]].src}`} />
      </div>
      <IconButton
        id="arrowLeft"
        onClick={handleLeft}
        disabled={index === 0}
        style={{
          color: index === 0 ? '#444' : 'azure',
        }}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>
      <IconButton
        id="arrowRight"
        onClick={handleRight}
        disabled={index === MAX_INDEX}
        style={{ color: index === MAX_INDEX ? '#444' : 'azure' }}
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
