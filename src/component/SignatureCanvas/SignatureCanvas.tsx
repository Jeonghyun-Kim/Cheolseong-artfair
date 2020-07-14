import React from 'react';
import SignaturePad from 'react-signature-canvas';
import CountUp from 'react-countup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';

import './SignatureCanvas.scss';

import DEFINES from '../../defines';

import Logo from '../Logo/Logo';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignatureCanvas() {
  const canvasRef = React.useRef<SignaturePad | null>(null);
  const [count, setCount] = React.useState<number | null>(null);
  const [drawingStarted, setDrawingStarted] = React.useState<boolean>(false);
  const [res, setRes] = React.useState<string>('');
  const [subscription, setSubscription] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const { t } = useTranslation();

  const fetchCount = () => {
    fetch(`${DEFINES.API_URL}/signatures`, {
      method: 'GET',
    }).then((response) => response.json())
      .then((resJson) => {
        if (!resJson.error) {
          setCount(Number(resJson.count));
        }
      });
  };

  React.useEffect(() => {
    fetchCount();
  }, []);

  React.useEffect(() => {
    fetch(`${DEFINES.API_URL}/hitcount/guest`);
  }, []);


  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setRes('');
      setDrawingStarted(false);
    }
  };

  const handleDrawStart = () => {
    setDrawingStarted(true);
  };

  const handleDrawEnd = () => {
    if (canvasRef.current) {
      if (!canvasRef.current.isEmpty()) {
        setRes(canvasRef.current.toDataURL());
      }
    }
  };

  const handleSubmit = () => {
    if (res) {
      fetch(res)
        .then((response) => response.blob())
        .then((blob) => {
          const formData = new FormData();
          formData.append('signature', blob, 'signature.png');
          formData.append('content', content);
          fetch(`${DEFINES.API_URL}/signature`, {
            method: 'POST',
            body: formData,
          }).then((response) => response.json())
            .then((resJson) => {
              if (resJson.error === 0) {
                handleClear();
                setContent('');
                setError(t('alert.successfully_registered'));
                setTimeout(() => setError(null), 3000);
              }
            })
            .catch((err) => {
              setError(JSON.stringify(err));
              setTimeout(() => setError(null), 3000);
            })
            .finally(() => fetchCount());
        });
    } else {
      setError(t('alert.draw_first'));
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSubscribe = () => {
    if (subscription) {
      if (email) {
        if (EMAIL_REGEX.test(email)) {
          fetch(`${DEFINES.API_URL}/subscription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          }).then((response) => response.json())
            .then((resJson) => {
              if (resJson.error === 0) {
                setError(t('alert.successfully_registered'));
                setEmail('');
                setSubscription(false);
                setTimeout(() => setError(null), 3000);
              } else if (resJson.error === 2) {
                setError(t('alert.already_subscribed'));
                setEmail('');
                setSubscription(false);
                setTimeout(() => setError(null), 3000);
              }
            })
            .catch(() => {
              setError(t('alert.internal_server_error'));
              setTimeout(() => setError(null), 3000);
            })
            .finally(() => fetchCount());
        } else {
          setError(t('alert.inappropriate_email'));
          setTimeout(() => setError(null), 3000);
        }
      } else {
        setError(t('alert.enter_email_first'));
        setTimeout(() => setError(null), 3000);
      }
    } else {
      setError(t('alert.privacy_policy_required'));
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="signatureRoot background unselectable">
      <Logo />
      <div className="gridContainer">
        {count !== null && (
          <div className="counter">
            <div>{t('visitors_book.by_now')}</div>
            <CountUp
              end={count + 50}
              duration={2}
              separator=","
            />
            <div>{t('visitors_book.participated')}</div>
          </div>
        )}
        {error && (
          <div className="errorAlert">
            {error}
          </div>
        )}
        <Typography variant="h6" className="title">{t('visitors_book.title')}</Typography>
        <div className="canvasContainter">
          <IconButton
            id="sigClear"
            onClick={() => handleClear()}
          >
            <FontAwesomeIcon
              icon={faEraser}
              size="xs"
            />
          </IconButton>
          <SignaturePad
            ref={canvasRef}
            canvasProps={{
              className: 'sigCanvas',
            }}
            onBegin={() => handleDrawStart()}
            onEnd={() => handleDrawEnd()}
          />
          <div
            id="signPadPlaceHolder"
            className="unselectable"
            style={{
              opacity: drawingStarted ? 0 : 1,
            }}
          >
            <img
              alt="signPad_place_hodler"
              src={`${process.env.PUBLIC_URL}/signPadPlaceHolder.jpg`}
              draggable={false}
            />
            <Typography align="center">{t('visitors_book.placeholder')}</Typography>
          </div>
          <div className="content inputPadding">
            <TextField
              name="content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              placeholder={t('visitors_book.text_placeholder')}
              multiline
              fullWidth
              inputProps={{ maxLength: 300 }}
            />
          </div>
          <div
            className="contentLength"
            style={{ color: content.length >= 300 ? '#e40d0d' : 'black' }}
          >
            {content.length}/300
          </div>
          <div className="submit">
            <Button
              variant="outlined"
              onClick={() => handleSubmit()}
            >
              {t('submit')}
            </Button>
          </div>
        </div>
        <div className="subscriptionForm">
          <form>
            <div className="inputPadding">
              <TextField
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                label="email"
                fullWidth
              />
            </div>
            <div className="checkbox unselectable">
              <Checkbox
                required
                color="default"
                checked={subscription}
                onChange={(e) => {
                  setSubscription(e.target.checked);
                }}
              />
              <span>{t('visitors_book.agreement')}</span>
            </div>
            <div className="seeMoreButton">
              <a href={`${DEFINES.API_URL}/privacy_agreement.pdf`} rel="noopener noreferrer" target="_blank">
                <span>{t('privacy_policy')}</span>
              </a>
            </div>
            <div className="submit">
              <Button
                variant="outlined"
                onClick={() => handleSubscribe()}
              >
                {t('visitors_book.keep_updated')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
