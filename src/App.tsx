import React from 'react';
import './App.scss';
import Grid from './components/grid/Grid';

function App() {
  const gridSize: number = 50;

  return (
    <div className="container">
      <Grid gridSize={gridSize} />
    </div>
  );
}

export default App;
