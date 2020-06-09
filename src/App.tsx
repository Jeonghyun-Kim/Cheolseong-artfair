import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';

import './App.scss';

import useWindowSize from './component/useWindowSize';
import ViewingRoom from './component/ViewingRoom/ViewingRoom';
import Details from './component/Details/Details';

import list from './filenames';

const MIN_INDEX = 0;
const MAX_INDEX = 193;

export default function App() {
  const [index, setIndex] = React.useState<number>(MIN_INDEX + 1);
  const [onDetail, setOnDetail] = React.useState<boolean>(false);

  const [innerWidth] = useWindowSize();

  React.useEffect(() => {
    console.log(list[0]);
  }, []);

  const handleLeft = () => {
    if (index !== MIN_INDEX) {
      setIndex(index - 1);
    }
  };

  const handleRight = () => {
    if (index !== MAX_INDEX) {
      setIndex(index + 1);
    }
  };

  const toggleDetail = () => {
    setOnDetail(!onDetail);
  }

  return (
    <div className="App">
      <div
        style={{ filter: `brightness(${onDetail ? 0.8 : 1}) blur(${onDetail ? 10 : 0}px)` }}
        className="viewingRoom"
      >
        <ViewingRoom src={`${process.env.PUBLIC_URL}/images/${list[index]}.jpg`} />
      </div>
      <div
        style={{ opacity: onDetail ? 1 : 0 }}
        className="detailScreen"
      >
        <Details idx={index} width={Math.min(innerWidth * 3 / 4, 520)} />
      </div>
      <IconButton id="moreIcon" onClick={toggleDetail}>
        <AssignmentIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
