import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faLandmark, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTranslation } from 'react-i18next';

import { ReactComponent as LogoIcon } from './onDisplay_logo.svg';

import './MenuScreen.scss';

import menus from './menus.json';
import menus_en from './menus_en.json';

import About from '../About/About';
import Logo from '../Logo/Logo';

export default function MenuScreen({ onAbout, setOnAbout }:
{ onAbout: boolean, setOnAbout: React.Dispatch<React.SetStateAction<boolean>> }) {
  const history = useHistory();
  const { i18n } = useTranslation();

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
          id="menuClose"
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
        className="menuRoot unselectable background"
        style={{
          filter: `blur(${onAbout ? 10 : 0}px)`,
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
        <Logo />
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
              {i18n.language === 'ko'
                ? menus[0].title
                : menus_en[0].title}
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="mobileMenuItem"
            onClick={() => {
              if (!onAbout) {
                setTimeout(() => history.push('/history'), 0);
              }
            }}
            onKeyDown={() => {}}
          >
            <div className="menuIcon">
              <FontAwesomeIcon icon={faUserGraduate} />
            </div>
            <div className="title">
              {i18n.language === 'ko'
                ? menus[1].title
                : menus_en[1].title}
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="mobileMenuItem"
            onClick={() => {
              if (!onAbout) {
                setTimeout(() => history.push('/guest'), 0);
              }
            }}
            onKeyDown={() => {}}
          >
            <div className="menuIcon">
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className="title">
              {i18n.language === 'ko'
                ? menus[2].title
                : menus_en[2].title}
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
              <SvgIcon component={LogoIcon} viewBox="0 0 303 303" />
            </div>
            <div className="title">
              {i18n.language === 'ko'
                ? menus[3].title
                : menus_en[3].title}
            </div>
          </div>
        </div>
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
              {i18n.language === 'ko'
                ? menus[0].title
                : menus_en[0].title}
            </div>
            <div className="divider" />
            <div className="content">
              <div className="grow" />
              {i18n.language === 'ko'
                ? menus[0].content
                : menus_en[0].content}
              <div className="grow" />
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="desktopMenuItem"
            onClick={() => {
              if (!onAbout) {
                setTimeout(() => history.push('/history'), 0);
              }
            }}
            onKeyDown={() => {}}
          >
            <div className="menuIcon">
              <FontAwesomeIcon icon={faUserGraduate} />
            </div>
            <div className="title">
              {i18n.language === 'ko'
                ? menus[1].title
                : menus_en[1].title}
            </div>
            <div className="divider" />
            <div className="content">
              <div className="grow" />
              {i18n.language === 'ko'
                ? menus[1].content
                : menus_en[1].content}
              <div className="grow" />
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="desktopMenuItem"
            onClick={() => {
              if (!onAbout) {
                setTimeout(() => history.push('/guest'), 0);
              }
            }}
            onKeyDown={() => {}}
          >
            <div className="menuIcon">
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className="title">
              {i18n.language === 'ko'
                ? menus[2].title
                : menus_en[2].title}
            </div>
            <div className="divider" />
            <div className="content">
              <div className="grow" />
              {i18n.language === 'ko'
                ? menus[2].content
                : menus_en[2].content}
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
              <SvgIcon component={LogoIcon} viewBox="0 0 303 303" />
            </div>
            <div className="title">
              {i18n.language === 'ko'
                ? menus[3].title
                : menus_en[3].title}
            </div>
            <div className="divider" />
            <div className="content">
              <div className="grow" />
              {i18n.language === 'ko'
                ? menus[3].content
                : menus_en[3].content}
              <div className="grow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
