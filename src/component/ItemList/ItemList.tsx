/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';

import './ItemList.scss';

import list from '../../filenames';

const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';
const marginWidth = 20;
const marginHeight = 30;

export default function ItemList({ indexMap }: { indexMap: number[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<number | null>(null);

  const history = useHistory();

  React.useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      if (width > 1000) {
        setSize(width / 3);
      } else if (width > 500) {
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
      <LazyLoad height={200}>
        {size && indexMap.map((value) => (
          <div
            key={value}
            style={{
              width: size - 2 * marginWidth,
              height: size - 2 * marginWidth,
              margin: `${marginHeight}px ${marginWidth}px`,
            }}
            className="imageBlock"
          >
            <img
              src={`${STORAGE_URL_XS}/${list[value]}.jpg`}
              alt={`${list[value]}`}
              onClick={() => handleMove(value)}
              onKeyDown={() => handleMove(value)}
              className="listImage"
            />
          </div>
        ))}
      </LazyLoad>
    </div>
  );
}
