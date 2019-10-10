import React, { useRef, useEffect } from 'react';

// import Timeline from './Timeline';
import TimelineTwo from './TimelineTwo';

const D3example = ({ x, y }) => {
  const refAnchor = useRef(null);

  useEffect(() => {
    TimelineTwo(refAnchor);
  });

  return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

function App() {
  return (
    <div className="App">
      <h1>Hello D3 & React!</h1>
      <svg width="800" height="600">
        <D3example x={0} y={0} />
      </svg>
    </div>
  );
}

export default App;
