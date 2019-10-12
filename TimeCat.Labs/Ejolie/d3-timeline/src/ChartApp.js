import React, { useRef, useEffect, useState } from 'react';

import './ChartApp.css';
import Chart from './Chart';
import chartData from './chartData';
import GlobalStyle from './GlobalStyle';

function App() {
  const chartRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1100, height: 110 });

  useEffect(() => {
    if (chartRef.current) {
      setDimensions({
        width: chartRef.current.offsetWidth,
        height: chartRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <h1>Hello Timeline!</h1>
        <div id="chart" className="timeline-chart" ref={chartRef}>
          <Chart chartData={chartData} svgDimensions={dimensions} />
        </div>
      </div>
    </>
  );
}

export default App;
