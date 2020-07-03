import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

export default function Logo() {
  return (
    <Link to="/">
      <div className="logoComponent">
        <img
          alt="logoImage"
          src={`${process.env.PUBLIC_URL}/onDisplay_logo_w.png`}
        />
      </div>
    </Link>
  );
}
