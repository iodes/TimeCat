import React, { useRef, useEffect, useState } from 'react';

import Chart from './components/ResponsiveChart';
import chartData from './assets/chartData';
import GlobalStyle from './assets/GlobalStyle';

function App() {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1100, height: 110 });

  const measureSVG = () => {
    const { width, height } = svgRef.current.getBoundingClientRect();
    setDimensions({
      width,
      height
    })
  }

  useEffect(() => {
    // did mount
    measureSVG();
    window.addEventListener('resize', measureSVG);

    // will unmount
    return () => {
      window.removeEventListener('resize', measureSVG);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <h1>Hello Timeline!</h1>
        <svg width="100%" height="110" ref={svgRef}>
          <Chart chartData={chartData} svgDimensions={dimensions} />
        </svg>
        {/* <div id="chart" className="timeline-chart" ref={chartRef}>
          <Chart chartData={chartData} svgDimensions={dimensions} />
        </div> */}
      </div>
    </>
  );
}

export default App;
