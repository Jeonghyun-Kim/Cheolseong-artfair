/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';

import './ItemList.scss';

import list from '../../filenames';
import info from '../../info2.json';

import useWindowSize from '../useWindowSize';

const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';
const imageSize = 350;
const margin = [40, 30];
const breakRatio = 1.5;

export default function ItemList({ indexMap }: { indexMap: number[] }) {
  const [innerWidth] = useWindowSize();

  const history = useHistory();

  const handleMove = (value: number) => {
    sessionStorage.setItem('@scrollY', JSON.stringify(window.pageYOffset));
    history.push(`/viewing-room/${value}`);
  };

  return (
    <div className="itemContainer unselectable">
      <LazyLoad height={400}>
        {indexMap.map((value) => {
          const ratio = info[value].width / info[value].height;
          const isSmall = innerWidth < imageSize + 120 + margin[0] * 2;
          return (
            <div style={{ display: 'inline' }}>
              <div
                style={{
                  width: Math.min(ratio > breakRatio ? imageSize * 2 + margin[0] * 2 : imageSize, innerWidth - 120),
                  // TODO: 100????
                  // eslint-disable-next-line no-nested-ternary
                  height: isSmall ? 'auto' : imageSize,
                  margin: `${margin[0]}px ${margin[1]}px`,
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
            </div>
          );
        })}
      </LazyLoad>
    </div>
  );
}
