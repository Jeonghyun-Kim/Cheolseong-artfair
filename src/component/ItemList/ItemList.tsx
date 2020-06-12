/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';

import './ItemList.scss';

import list from '../../filenames';

import useWindowSize from '../useWindowSize';

const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';
const imageSize = 350;

export default function ItemList({ indexMap }: { indexMap: number[] }) {
  const [innerWidth] = useWindowSize();

  const history = useHistory();

  const handleMove = (value: number) => {
    sessionStorage.setItem('@scrollY', JSON.stringify(window.pageYOffset));
    history.push(`/viewing-room/${value}`);
  };

  return (
    <div className="itemContainer unselectable">
      <LazyLoad height={200}>
        {indexMap.map((value) => (
          <div
            style={{
              width: Math.min(imageSize, innerWidth - 100),
              // TODO: 100????
              height: innerWidth > Math.min(imageSize, innerWidth - imageSize) ? Math.min(imageSize, innerWidth - 100) : '',
              margin: '30px 20px',
            }}
            className="imageBlock"
          >
            <img
              key={value}
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
