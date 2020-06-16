import React from 'react';

import './HomeScreen.scss';

import useWindowSize from '../useWindowSize';

const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';
// const REWRITE_URL = 'https://www.notion.so/3f9ecec2a1d940c1b001a22b973b0794?v=b6dd3ece14c44efd9ec9b0a90fee226e';

// const timer = 1.5;

export default function HomeScreen() {
  const [innerWidth] = useWindowSize();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     window.location.href = REWRITE_URL;
  //   }, timer * 1000);
  // }, []);

  return (
    <div className="App">
      <div className="introTitle">
        <h3>국내 최초 온라인 아트페어</h3>
        <h3>&#39;작가를 찾아서&#39;에 오신 것을 환영합니다.</h3>
      </div>
      {innerWidth < 700 ? (
        <img
          alt="Decorum 2020-6"
          src={`${STORAGE_URL_MD}/2020_6.jpg`}
          className="introImage mobile"
        />
      ) : (
        <>
          <img
            alt="lantern"
            src={`${process.env.PUBLIC_URL}/lantern (1).png`}
            className="introLantern"
          />
          <img
            alt="Decorum 2016-12"
            src={`${STORAGE_URL_MD}/2016_12.jpg`}
            className="introImage desktop"
          />
        </>
      )}
      <img
        alt="spinner"
        src={`${process.env.PUBLIC_URL}/Spinner.svg`}
        id="spinnerIcon"
      />
    </div>
  );
}
