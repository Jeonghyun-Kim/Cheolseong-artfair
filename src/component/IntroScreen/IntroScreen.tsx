import React from 'react';

import './IntroScreen.scss';

import useWindowSize from '../useWindowSize';

const STORAGE_URL_MD = 'https://d3upf6md31d3of.cloudfront.net';
// const REWRITE_URL = 'https://www.notion.so/Decorum-d5fd16bf040d42fdbf6f7a4a569bd2df';

// const timer = 10;

export default function IntroScreen() {
  const [innerWidth] = useWindowSize();


  // React.useEffect(() => {
  //   setTimeout(() => {
  //     window.location.href = REWRITE_URL;
  //   }, timer * 1000);
  // }, []);

  return (
    <div className="App introApp">
      <div
        className="introTitle"
      >
        {innerWidth < 700 ? (
          <img
            alt="introTitle"
            src={`${process.env.PUBLIC_URL}/letters/m_title.png`}
          />
        ) : (
          <img
            alt="introTitle"
            src={`${process.env.PUBLIC_URL}/letters/title.png`}
          />
        )}
      </div>
      <div className="introContent">
        {innerWidth < 700 ? (
          <img
            alt="introContent"
            src={`${process.env.PUBLIC_URL}/letters/m_contents.png`}
          />
        ) : (
          <img
            alt="introContent"
            src={`${process.env.PUBLIC_URL}/letters/contents.png`}
          />
        )}
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
      {/* <img
        alt="spinner"
        src={`${process.env.PUBLIC_URL}/Spinner.svg`}
        id="spinnerIcon"
      /> */}
    </div>
  );
}
