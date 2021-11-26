import React, { useEffect, useState, Fragment } from 'react';
import Cell from '../cell/Cell';
import './styles.scss';

function Grid({ gridSize }: { gridSize: number; }) {
  const sequence = [1, 1, 2, 3, 5];
  const [grid, setGrid] = useState(() => {
    return Array(gridSize).fill(0).map(()=>Array(gridSize).fill(0))
  });

  useEffect(() => {
    lookForSequence(grid, sequence);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  return (
    <div className="grid" grid-size={gridSize}>
      {renderGrid()}
    </div>
  );

  function renderGrid() {
		return grid.map((_, i) => {
      return (<Fragment key={`row-${i}`}>
        {grid[i].map((_, j) => {
          return <Cell 
            key={`x=${i}-y=${j}`} 
            value={grid[i][j]}
            handleClick={incrementRowAndColumn.bind(null, { x: i, y: j})} 
            />
        })}
      </Fragment>)
    });
	}

  function incrementRowAndColumn({ x, y }: { x: number, y: number; }) {
    let newGrid = [ ...grid ];
    // increment row
    newGrid[x] = newGrid[x].map(val => val + 1);
    // increment column
    newGrid = newGrid.map(row => {
      row[y] = row[y] + 1;
      return row;
    });
    newGrid[x][y] = newGrid[x][y] - 1;

    return setGrid(newGrid);
  }

  function lookForSequence(grid: number[][], sequence: number[]): void {
    // DFS
  }
}

export default Grid;