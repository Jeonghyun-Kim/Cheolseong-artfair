/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';

import './ItemList.scss';

import info from '../../info.json';

import useWindowSize from '../useWindowSize';

const STORAGE_URL_XS = 'https://dly1k4se6h02w.cloudfront.net';
const imageSize = 350;
const margin = [30, 80];
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
          const isSingleLine = innerWidth - 150 < (imageSize + margin[0]) * 2;
          const imageRatio = info[value].width / info[value].height;

          return (
            <div key={value}>
              {isSingleLine ? (
                <div
                  style={{
                    width: Math.min(innerWidth - 100, imageSize),
                    height: 'auto',
                    margin: `${margin[1] / 2}px ${margin[0] / 2}px`,
                  }}
                >
                  <img
                    src={`${STORAGE_URL_XS}/${info[value].src}`}
                    alt={`${info[value].src.split('.')[0]}`}
                    width="100%"
                    onClick={() => handleMove(value)}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        handleMove(value);
                      }
                    }}
                    style={{
                      boxShadow: '1px 7px 10px 0px rgba(0, 0, 0, 1)',
                      borderRadius: info[value].src === '2013_5.gif' ? 999 : 2,
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: innerWidth - 100,
                    width: imageRatio > breakRatio ? (imageSize + margin[0]) * 2 : imageSize,
                    height: imageSize,
                    margin: `${margin[1]}px ${margin[0]}px`,
                  }}
                  className="imageBlock"
                >
                  {imageRatio > breakRatio ? (
                    <img
                      src={`${STORAGE_URL_XS}/${info[value].src}`}
                      alt={`${info[value].src.split('.')[0]}`}
                      width={imageRatio > 2 ? '100%' : 'auto'}
                      height={imageRatio > 2 ? 'auto' : '100%'}
                      onClick={() => handleMove(value)}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          handleMove(value);
                        }
                      }}
                      className="listImage"
                      style={{ borderRadius: info[value].src === '2013_5.gif' ? 999 : 2 }}
                    />
                  ) : (
                    <img
                      src={`${STORAGE_URL_XS}/${info[value].src}`}
                      alt={`${info[value].src.split('.')[0]}`}
                      width={imageRatio > 1 ? '100%' : 'auto'}
                      height={imageRatio > 1 ? 'auto' : '100%'}
                      onClick={() => handleMove(value)}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          handleMove(value);
                        }
                      }}
                      className="listImage"
                      style={{ borderRadius: info[value].src === '2013_5.gif' ? 999 : 2 }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </LazyLoad>
    </div>
  );
}
