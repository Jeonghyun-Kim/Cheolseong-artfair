/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';

import './ItemList.scss';

import list from '../../filenames';

const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';
const marginWidth = 20;

export default function ItemList({ indexMap }: { indexMap: number[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<number[] | null>(null);
  const [marginHeight, setMarginHeight] = React.useState<number>(30);

  const history = useHistory();

  React.useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        const containerWidth = ref.current.clientWidth;
        if (containerWidth > 1000) {
          setSize([containerWidth / 3, containerWidth / 3]);
          setMarginHeight(30);
        } else if (containerWidth > 500) {
          setSize([containerWidth / 2, containerWidth / 2]);
          setMarginHeight(30);
        } else {
          setSize([containerWidth, 0]);
          setMarginHeight(50);
        }
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [ref]);

  const handleMove = (value: number) => {
    sessionStorage.setItem('@scrollY', JSON.stringify(window.pageYOffset));
    history.push(`/viewing-room/${value}`);
  };

  return (
    <div ref={ref} className="itemContainer unselectable">
      <LazyLoad height={200}>
        {size && indexMap.map((value) => (
          <div
            key={value}
            style={{
              width: size[0] - 2 * marginWidth,
              height: size[1] ? size[1] - 2 * marginWidth : '',
              margin: `${marginHeight}px ${marginWidth}px`,
            }}
            className="imageBlock"
          >
            <img
              src={`${STORAGE_URL_XS}/${list[value]}.jpg`}
              alt={`${list[value]}`}
              onClick={() => handleMove(value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleMove(value);
                }
              }}
              className="listImage"
            />
          </div>
        ))}
      </LazyLoad>
    </div>
  );
}
