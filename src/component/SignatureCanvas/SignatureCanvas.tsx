import React from 'react';
import SignaturePad from 'react-signature-canvas';

import './SignatureCanvas.scss';

export default function SignatureCanvas() {
  const canvasRef = React.useRef<SignaturePad | null>(null);
  const [res, setRes] = React.useState<string>('');

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const handleSubmit = () => {
    if (canvasRef.current) {
      if (canvasRef.current.isEmpty()) {
        // TODO: alert error
      } else {
        setRes(JSON.stringify(canvasRef.current.toData()));
      }
    }
  };

  return (
    <div className="signatureRoot">
      <div className="canvasContainter">
        <SignaturePad
          // penColor="black"
          ref={canvasRef}
          canvasProps={{
            className: 'sigCanvas',
          }}
        />
      </div>
      <div className="controlArea">
        <button id="sigClear" type="button" onClick={() => handleClear()}>CLEAR!</button>
        <button id="sigSubmit" type="button" onClick={() => handleSubmit()}>SUBMIT!</button>
      </div>
      <div
        style={{
          backgroundColor: 'white', width: 500, height: 300, overflowY: 'auto', margin: '100px auto',
        }}
      >
        {res}
      </div>
    </div>
  );
}
