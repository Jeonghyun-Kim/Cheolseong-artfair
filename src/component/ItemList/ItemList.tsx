/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useHistory } from 'react-router-dom';

import './ItemList.scss';

import list from '../../filenames';
import ConfigContext from '../../ConfigContext';

const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';

export default function ItemList({ indexMap }: { indexMap: number[] }) {
  const { yearRange, priceRange } = React.useContext(ConfigContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<number | null>(null);

  const history = useHistory();

  React.useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      if (width > 800) {
        setSize(width / 3);
      } else if (width > 400) {
        setSize(width / 2);
      } else {
        setSize(width);
      }
    }
  }, [ref]);

  const handleMove = (value: number) => {
    history.push(`/viewing-room/${value}`);
  };

  return (
    <div ref={ref} className="itemContainer">
      {size && indexMap.map((value) => (
        <div style={{ width: size, height: size }} className="imageBlock">
          <img
            src={`${STORAGE_URL_XS}/${list[value]}.jpg`}
            alt={`${list[value]}`}
            onClick={() => handleMove(value)}
            onKeyDown={() => handleMove(value)}
            className="listImage"
          />
        </div>
      ))}
    </div>
  );
}