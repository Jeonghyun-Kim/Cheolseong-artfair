import React from 'react';

import './App.scss';

import ViewingRoom from './component/ViewingRoom/ViewingRoom';

export default function App() {
  return (
    <div className="App">
      <ViewingRoom src={`${process.env.PUBLIC_URL}/image1.jpg`} />
    </div>
  );
}
