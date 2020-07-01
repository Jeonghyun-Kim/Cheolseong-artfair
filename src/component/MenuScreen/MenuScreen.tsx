import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SvgIcon from '@material-ui/core/SvgIcon';

import { ReactComponent as LogoIcon } from './onDisplay_logo.svg';

import './MenuScreen.scss';

import menus from './menus.json';

import About from '../About/About';
import useWindowSize from '../useWindowSize';

export default function MenuScreen({ onAbout, setOnAbout }:
{ onAbout: boolean, setOnAbout: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [innerWidth] = useWindowSize();
  const history = useHistory();

  return (
    <div
      className="menuScreenRoot"
      style={{
        overflowY: onAbout ? 'auto' : 'hidden',
      }}
    >
      <div
        id="aboutDiv"
        className="unselectable"
        style={{
          opacity: onAbout ? 1 : 0,
          zIndex: onAbout ? 10 : -1,
        }}
      >
        <About />
        <IconButton
          id="close"
          onClick={() => setOnAbout(false)}
          disabled={!onAbout}
          style={{
            opacity: onAbout ? 1 : 0,
            zIndex: onAbout ? 5 : -1,
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <div
        className="App menuRoot unselectable"
        style={{
          filter: `blur(${onAbout ? 10 : 0}px)`,
          transform: `scale(${onAbout ? 1.1 : 1})`,
        }}
        role="button"
        tabIndex={0}
        onClick={() => {
          if (onAbout) {
            setOnAbout(false);
          }
        }}
        onKeyDown={() => {}}
      >
        {innerWidth < 1000 ? (
          <div className="mobileMenuContainer">
            <div
              role="button"
              tabIndex={0}
              className="mobileMenuItem"
              onClick={() => {
                if (!onAbout) {
                  setTimeout(() => history.push('/list'), 0);
                }
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
                if (!onAbout) {
                  setTimeout(() => history.push('/story'), 0);
                }
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
                if (!onAbout) {
                  window.open(
                    'https://gformanalytics.com/form.php?ga_id=UA-168932005-1](https://www.googletagmanager.com/gtag/js?id=UA-168932005-1)&form_id=1FAIpQLSe71tn0suGW1SYIujzi5oJdTQsJp1nbCKK7RtvxIJgDAyNv1g',
                    '_blank',
                  );
                }
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className="title">
                {menus[2].title}
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="mobileMenuItem"
              onClick={() => setOnAbout(true)}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <SvgIcon component={LogoIcon} viewBox="0 -20 110 110" />
              </div>
              <div className="title">
                {menus[3].title}
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
                if (!onAbout) {
                  setTimeout(() => history.push('/list'), 0);
                }
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
                if (!onAbout) {
                  setTimeout(() => history.push('/story'), 0);
                }
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
                if (!onAbout) {
                  window.open(
                    'https://gformanalytics.com/form.php?ga_id=UA-168932005-1](https://www.googletagmanager.com/gtag/js?id=UA-168932005-1)&form_id=1FAIpQLSe71tn0suGW1SYIujzi5oJdTQsJp1nbCKK7RtvxIJgDAyNv1g',
                    '_blank',
                  );
                }
              }}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <FontAwesomeIcon icon={faEdit} />
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
              onClick={() => setOnAbout(true)}
              onKeyDown={() => {}}
            >
              <div className="menuIcon">
                <SvgIcon component={LogoIcon} viewBox="0 -20 110 110" />
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
          </div>
        )}
      </div>
    </div>
  );
}
