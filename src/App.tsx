import React from 'react';
import './App.scss';
import Grid from './components/grid/Grid';

function App() {
  const gridSize = 50;
  const sequenceLength = 5;

  return (
    <div className="container">
      <Grid gridSize={gridSize} sequenceLength={sequenceLength} />
    </div>
  );
}

export default App;
