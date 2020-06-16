import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faImage } from '@fortawesome/free-regular-svg-icons';
import { faUsers, faLandmark } from '@fortawesome/free-solid-svg-icons';

import './MenuScreen.scss';

import menus from './menus.json';

import useWindowSize from '../useWindowSize';

export default function MenuScreen() {
  const [innerWidth] = useWindowSize();
  const history = useHistory();

  return (
    <>
      <div className="bgImage" />
      <div className="App menuRoot unselectable">
        <div className="menuTitle">
          <h2>Decorum{innerWidth < 1000 ? <br /> : ' - '}신, 인간, 자연의 어울림</h2>
        </div>
        {innerWidth < 1000 ? (
          <div className="mobileMenuContainer">
            <div
              role="button"
              tabIndex={0}
              className="mobileMenuItem"
              onClick={() => {
                setTimeout(() => history.push('/list'), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faLandmark} />
              </div>
              <div className="title">
                {menus[0].title}
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="mobileMenuItem"
              onClick={() => {
                setTimeout(() => history.go(0), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faYoutube} />
              </div>
              <div className="title">
                {menus[1].title}
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="mobileMenuItem"
              onClick={() => {
                setTimeout(() => history.push('/comments'), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="title">
                {menus[2].title}
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="mobileMenuItem"
              onClick={() => {
                setTimeout(() => history.go(0), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div className="title">
                {menus[3].title}
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="mobileMenuItem"
              onClick={() => {
                setTimeout(() => history.push('/list'), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className="title">
                {menus[4].title}
              </div>
            </div>
          </div>
        ) : (
          <div className="desktopMenuContainer">
            <div
              role="button"
              tabIndex={0}
              className="desktopMenuItem"
              onClick={() => {
                setTimeout(() => history.push('/list'), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faLandmark} />
              </div>
              <div className="title">
                {menus[0].title.split('\n').map((line, idx) => (
                  <span key={idx.toString()}>{line}<br /></span>
                ))}
              </div>
              <div className="divider" />
              <div className="content">
                <div className="grow" />
                {menus[0].content}
                <div className="grow" />
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="desktopMenuItem"
              onClick={() => {
                setTimeout(() => history.go(0), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faYoutube} />
              </div>
              <div className="title">
                {menus[1].title.split('\n').map((line, idx) => (
                  <span key={idx.toString()}>{line}<br /></span>
                ))}
              </div>
              <div className="divider" />
              <div className="content">
                <div className="grow" />
                {menus[1].content}
                <div className="grow" />
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="desktopMenuItem"
              onClick={() => {
                setTimeout(() => history.push('/comments'), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="title">
                {menus[2].title.split('\n').map((line, idx) => (
                  <span key={idx.toString()}>{line}<br /></span>
                ))}
              </div>
              <div className="divider" />
              <div className="content">
                <div className="grow" />
                {menus[2].content}
                <div className="grow" />
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="desktopMenuItem"
              onClick={() => {
                setTimeout(() => history.go(0), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div className="title">
                {menus[3].title.split('\n').map((line, idx) => (
                  <span key={idx.toString()}>{line}<br /></span>
                ))}
              </div>
              <div className="divider" />
              <div className="content">
                <div className="grow" />
                {menus[3].content}
                <div className="grow" />
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="desktopMenuItem"
              onClick={() => {
                setTimeout(() => history.push('/list'), 0);
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className="title">
                {menus[4].title.split('\n').map((line, idx) => (
                  <span key={idx.toString()}>{line}<br /></span>
                ))}
              </div>
              <div className="divider" />
              <div className="content">
                <div className="grow" />
                {menus[4].content}
                <div className="grow" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
