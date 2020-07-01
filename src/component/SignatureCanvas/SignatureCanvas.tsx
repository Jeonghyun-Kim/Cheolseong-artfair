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

  const handleSubmit = () => {
    if (canvasRef.current) {
      if (canvasRef.current.isEmpty()) {
        setRes('먼저 서명을 해주세요!');
      } else {
        setRes(JSON.stringify(canvasRef.current.toData()));
      }
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
        />
      </div>
      <div id="spacing20" />
      <div className="controlArea">
        <button id="sigClear" type="button" onClick={() => handleClear()}>CLEAR!</button>
        <button id="sigSubmit" type="button" onClick={() => handleSubmit()}>SUBMIT!</button>
      </div>
      <div id="spacing20" />
      <div className="sigRes">
        {res}
      </div>
      <div id="spacing50" />
    </div>
  );
}
