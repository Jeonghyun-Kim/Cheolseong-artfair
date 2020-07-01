import React from 'react';
import SignaturePad from 'react-signature-canvas';

import './SignatureCanvas.scss';

export default function SignatureCanvas() {
  const canvasRef = React.useRef<SignaturePad | null>(null);
  const [res, setRes] = React.useState<string>('');

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
      // TODO: FETCH TO SERVER
    }
  };

  return (
    <div className="signatureRoot">
      <div id="spacing100" />
      <div className="canvasContainter">
        <SignaturePad
          // penColor="black"
          ref={canvasRef}
          canvasProps={{
            className: 'sigCanvas',
          }}
          onEnd={() => handleDrawEnd()}
        />
      </div>
      <div id="spacing20" />
      <div className="controlArea">
        <button id="sigClear" type="button" onClick={() => handleClear()}>CLEAR!</button>
        <button id="sigSubmit" type="button" onClick={() => handleSubmit()}>SUBMIT!</button>
      </div>
      <div id="spacing20" />
      <div className="sigRes">
        {res && (
          <img src={res} alt="sig" />
        )}
      </div>
      <div id="spacing50" />
    </div>
  );
}
