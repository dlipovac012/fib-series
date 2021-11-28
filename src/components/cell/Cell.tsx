import React, { useEffect, useRef } from 'react';
import './styles.scss';

function Cell({ value, handleClick }: { value: number; handleClick: (event: any) => void }) {
  const cellRef = useRef<any>(null);

  useEffect(() => {
    const cellDiv = cellRef.current;
    cellDiv.classList.remove('glow-yellow');
    cellDiv.classList.remove('glow-green');

    if (value > 0) {
      process.nextTick(() => {
        cellDiv.classList.add('glow-yellow');
      })
    }
    else if (value === 0) {
      process.nextTick(() => {
        cellDiv.classList.add('glow-green');
      });
    }
  }, [value]);

  return (
    <div ref={cellRef} className="cell" onClick={handleClick}>
      {value === 0 ? '' : value}
    </div>
  );
}

export default Cell;