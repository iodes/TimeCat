import React from 'react';
import Timeline from './Timeline';
import { data } from './data';

const App: React.FC = () => {
  return (
    <div style={{ height: 400 }}>
      <h1>Hello Timeline!</h1>
      <Timeline data={data} />
    </div>
  );
};

export default App;
