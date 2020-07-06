import React from 'react';
import Typography from '@material-ui/core/Typography';
import SignaturePad from 'react-signature-canvas';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CountUp from 'react-countup';

import './SignatureCanvas.scss';

import DEFINES from '../../defines';

import Logo from '../Logo/Logo';

export default function SignatureCanvas() {
  const canvasRef = React.useRef<SignaturePad | null>(null);
  const [count, setCount] = React.useState<number | null>(null);
  const [res, setRes] = React.useState<string>('');
  const [subscription, setSubscription] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

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

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setRes('');
    }
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
                setError('성공적으로 등록되었습니다.');
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
      setError('먼저 방명록을 작성해주세요.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSubscribe = () => {
    if (subscription) {
      if (email) {
        fetch(`${DEFINES.API_URL}/subscription`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }).then((response) => response.json())
          .then((resJson) => {
            if (resJson.error === 0) {
              setError('성공적으로 등록되었습니다.');
              setTimeout(() => setError(null), 3000);
            }
          })
          .catch((err) => {
            setError(JSON.stringify(err));
            setTimeout(() => setError(null), 3000);
          })
          .finally(() => fetchCount());
      } else {
        setError('이메일을 먼저 입력해주세요!');
        setTimeout(() => setError(null), 3000);
      }
    } else {
      setError('');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="signatureRoot background unselectable">
      <Logo />
      <div className="gridContainer">
        {count !== null && (
          <div className="counter">
            <div>지금까지</div>
            <CountUp
              end={count + 50}
              duration={2}
              separator=","
            />
            <div>명 참여</div>
          </div>
        )}
        {error && (
          <div className="errorAlert">
            {error}
          </div>
        )}
        <Typography variant="h6" className="title">방명록</Typography>
        <div className="canvasContainter">
          <button id="sigClear" type="button" onClick={() => handleClear()}>CLEAR!</button>
          <SignaturePad
            ref={canvasRef}
            canvasProps={{
              className: 'sigCanvas',
            }}
            onEnd={() => handleDrawEnd()}
          />
          <div className="content inputPadding">
            <TextField
              name="content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="outlined"
              placeholder="onDisplay 또는 작가님께 하고 싶은 말을 남겨주세요. (선택)"
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
              제출
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
              <span>홍보 &middot; 마케팅을 위한 개인정보 수집 &middot; 활용에 동의합니다.</span>
            </div>
            <div className="seeMoreButton">
              <a href={`${DEFINES.API_URL}/privacy_agreement.pdf`} rel="noopener noreferrer" target="_blank">
                <span>자세히 보기</span>
              </a>
            </div>
            <div className="submit">
              <Button
                variant="outlined"
                onClick={() => handleSubscribe()}
              >
                소식 받아보기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
