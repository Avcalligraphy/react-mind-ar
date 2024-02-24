import React, { useState } from 'react';
import './App.css';
import MindARViewer from './mindar-viewer';
import MindARThreeViewer from './mindar-three-viewer';

function App() {
  const [started, setStarted] = useState(null);

  return (
    <div className="container">
      <MindARViewer />
      <video></video>
    </div>
  );
}

export default App;
