import React from 'react';
import SignaturePad from 'react-signature-canvas';

import './SignatureCanvas.scss';

import DEFINES from '../../defines';

interface SignatureData {
  url: string;
}

export default function SignatureCanvas() {
  const canvasRef = React.useRef<SignaturePad | null>(null);
  const [signs, setSigns] = React.useState<SignatureData[]>([]);
  const [res, setRes] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const refreshData = () => {
    fetch(`${DEFINES.API_URL}/signatures`, {
      method: 'GET',
    }).then((response) => response.json())
      .then((resJson) => {
        setSigns(resJson.signatures);
      })
      .catch((err) => setError(JSON.stringify(err)));
  };

  React.useEffect(() => {
    refreshData();
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
          fetch(`${DEFINES.API_URL}/signature`, {
            method: 'POST',
            body: formData,
          }).then(() => {
            refreshData();
          }).catch((err) => setError(JSON.stringify(err)));
        });
    }
  };

  return (
    <div className="signatureRoot">
      <div id="spacing100" />
      <div className="gridContainer">
        <div>
          <div className="canvasContainter">
            <SignaturePad
              ref={canvasRef}
              canvasProps={{
                className: 'sigCanvas',
              }}
              onEnd={() => handleDrawEnd()}
            />
          </div>
          <div className="controlArea">
            <button id="sigClear" type="button" onClick={() => handleClear()}>CLEAR!</button>
            <button id="sigSubmit" type="button" onClick={() => handleSubmit()}>SUBMIT!</button>
          </div>
        </div>
        <div className="sigRes">
          {res && (
            <img src={res} alt="sig" />
          )}
        </div>
      </div>
      <div id="spacing50" />
    </div>
  );
}
