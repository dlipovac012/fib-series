import React from 'react';
import Grid from './components/grid/Grid';

function App() {
  const gridSize = 50;
  const sequenceLength = 5;

  return (
    <div>
      <Grid gridSize={gridSize} sequenceLength={sequenceLength} />
    </div>
  );
}

export default App;
