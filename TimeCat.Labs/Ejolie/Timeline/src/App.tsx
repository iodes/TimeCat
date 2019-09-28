import React from 'react';
import MyResponsiveBar from './MyResponsiveBar';
import { data } from './data';

const App: React.FC = () => {
  return (
    <div style={{ height: 400 }}>
      <h1>Hello Timeline!</h1>
      <MyResponsiveBar data={data} />
    </div>
  );
};

export default App;
