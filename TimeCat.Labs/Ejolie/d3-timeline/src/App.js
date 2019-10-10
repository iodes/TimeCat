import React, { useState } from 'react';
import './App.css';
import Timeline from './Timeline';

function App() {
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(400);

  const onWheel = () => {
    console.log('hello');
  };

  return (
    <div className="App">
      <h1>Hello Timeline!</h1>
      <svg width="800" height="600">
        <Timeline
          x={50}
          y={50}
          width={width}
          height={height}
          onWheel={onWheel}
        />
      </svg>
    </div>
  );
}

export default App;
