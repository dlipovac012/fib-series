import React, { useEffect, useState, Fragment } from 'react';
import { isValidField } from '../../utils/isValidField';
import Cell from '../cell/Cell';

enum Axis {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

interface IPoint {
  x: number;
  y: number;
}

function Grid({ gridSize }: { gridSize: number; }) {
  const sequenceLength = 5;
  const [grid, setGrid] = useState(() => {
    return Array(gridSize).fill(0).map(()=>Array(gridSize).fill(0))
  });
  const [origin, setOrigin] = useState<IPoint>({ x: 0, y: 0 });
  const [pointsToBeDeleted, setPointsToBeDeleted] = useState<IPoint[]>([]);

  useEffect(() => {
    setPointsToBeDeleted(lookForSequence(grid, sequenceLength, origin))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)`}}>
      {renderGrid()}
    </div>
  );

  function renderGrid() {    
		return grid.map((_, i) => {
      return (<Fragment key={`row-${i}`}>
        {grid[i].map((_, j) => {
          if (pointsToBeDeleted.some(point => {
            return point.x === i && point.y === j;
          })) {
            grid[i][j] = 0;
          }
          return <Cell 
            key={`x=${i}-y=${j}`} 
            value={grid[i][j]}
            handleClick={incrementRowAndColumn.bind(null, { x: i, y: j})}
            />
        })}
      </Fragment>);
    });
	}

  function incrementRowAndColumn(point: IPoint) {
    const { x, y } = point;
    let newGrid = [ ...grid ];
    // increment row
    newGrid[x] = newGrid[x].map(val => val + 1);
    // increment column
    newGrid = newGrid.map(row => {
      row[y] = row[y] + 1;
      return row;
    });
    newGrid[x][y] = newGrid[x][y] - 1;

    setOrigin(point);
    return setGrid(newGrid);
  }

  function generateRange(point: IPoint, axis: Axis, rangeLenght: number): IPoint[] {
    const range: IPoint[] = [{ x: point.x, y: point.y }];
    switch (axis) {
      case Axis.HORIZONTAL:
        for (let j = 1; j < rangeLenght; j++) {
          const pointsValue = isValidField({ row: point.x, col: point.y - j, gridSize }) && grid[point.x][point.y - j];
          if (isValidField({ value: pointsValue, row: point.x, col: point.y - j, gridSize })) {
            range.unshift({ x: point.x, y: point.y - j });
          }
          else {
            break;
          }
        }

        for (let j = 1; j < rangeLenght; j++) {
          const pointsValue = isValidField({ row: point.x, col: point.y + j, gridSize }) && grid[point.x][point.y + j];
          if (isValidField({ value: pointsValue, row: point.x, col: point.y + j, gridSize })) {
            range.push({ x: point.x, y: point.y + j });
          }
          else {
            break;
          }
        }
        return range;
      case Axis.VERTICAL:
        for (let i = 1; i < rangeLenght; i++) {
          const pointsValue = grid[point.x - i] && grid[point.x - i][point.y];
          if (isValidField({ value: pointsValue, row: point.x - i, col: point.y, gridSize })) {
            range.unshift({ x: point.x - i, y: point.y });
          }
          else {
            break;
          }
        }

        for (let i = 1; i < rangeLenght; i++) {
          const pointsValue = grid[point.x + i] && grid[point.x + i][point.y];
          if (isValidField({ value: pointsValue, row: point.x + i, col: point.y, gridSize })) {
            range.push({ x: point.x + i, y: point.y });
          }
          else {
            break;
          }
        }
        return range;
      default:
        return [];
    }
  }


  /**
   * Brief description:
   * 
   * if there is a new matching sequence, one of its points has to be on one of the axis;
   * check them both, then check perpendicular points to that axis to see if there is a match
  */
  function lookForSequence(grid: number[][], sequenceLength: number, origin: IPoint): IPoint[] {
    let ranges: IPoint[] = [];

    // generate arrays of points that are on each axis
    const horizontalRange = generateRange(origin, Axis.HORIZONTAL, gridSize);
    const verticalRange = generateRange(origin, Axis.VERTICAL, gridSize);

    // search for sequence on each axis
    const sequencesOnXAxis = findSequenceInRange(horizontalRange);
    const sequencesOnYAxis = findSequenceInRange(verticalRange);

    ranges = ranges.concat(sequencesOnXAxis);
    ranges = ranges.concat(sequencesOnYAxis);

    // for every point on each axis, generate range of perpendicular agains that specific point, and check if there are matching sequences 
    horizontalRange.forEach(point => {
      const rangeForSpecificPoint = generateRange(point, Axis.VERTICAL, sequenceLength);
      ranges = ranges.concat(findSequenceInRange(rangeForSpecificPoint));
    });

    verticalRange.forEach(point => {
      const rangeForSpecificPoint = generateRange(point, Axis.HORIZONTAL, sequenceLength);
      ranges = ranges.concat(findSequenceInRange(rangeForSpecificPoint));
    });
    
    return ranges;

    function findSequenceInRange(range: IPoint[]): IPoint[] {
      let bingoPoints: IPoint[] = [];

      if (range.length < sequenceLength) {
        return [];
      }
      
      for (let j = 0; j < range.length - sequenceLength + 1; j++) {
        const rangeToCheck = range.slice(j, sequenceLength + j);
        const rangeOfValuesToCheck = rangeToCheck.map(point => grid[point.x][point.y]);

        if (isFibonacci(rangeOfValuesToCheck, sequenceLength)) {
          bingoPoints = bingoPoints.concat(rangeToCheck);
        }

        const rangeToCheckReversed = range.slice().reverse().slice(j, sequenceLength + j);
        const rangeOfValuesToCheckReversed = rangeToCheckReversed.map(point => grid[point.x][point.y]);

        if (isFibonacci(rangeOfValuesToCheckReversed, sequenceLength)) {
          bingoPoints = bingoPoints.concat(rangeToCheckReversed);
        }
      }

      return bingoPoints;
    }

    function isFibonacci(arr: number[] , sequenceLength: number): boolean {
        if (sequenceLength === 1 || sequenceLength === 2)
            return true;
 
        for (let i = 2; i < sequenceLength; i++) {
            if ((arr[i - 1] + arr[i - 2]) !== arr[i])
                return false;
        }
        return true;
    }

  }
}

export default Grid;