import React from 'react';
import './App.css';
import Timeline from './Timeline';
import { testData } from './data';

function App() {
  return (
    <div className="App">
      <h1>Hello Timeline!</h1>
      <div classNAm="App-timeline-container">
        <Timeline data={testData} />
      </div>
    </div>
  );
}

export default App;
