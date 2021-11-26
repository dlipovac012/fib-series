import React, { useEffect, useRef } from 'react';
import './styles.scss';

function Cell({ value, handleClick }: { value: number; handleClick: (event: any) => void }) {
  const cellRef = useRef(null);

  useEffect(() => {
    const cellDiv = cellRef.current;
    (cellDiv as any).classList.remove('glow-yellow');
    (cellDiv as any).classList.remove('glow-green');
    
    if (value > 0) {
      process.nextTick(() => {
        (cellDiv as any).classList.add('glow-yellow');
      });
    }
    else if (value === 0) {
      process.nextTick(() => {
        (cellDiv as any).classList.add('glow-green');
      });
    }
  }, [value])

  return (
    <div ref={cellRef} className="cell" onClick={handleClick}>
      {value === 0 ? '' : value}
    </div>
  );
}

export default Cell;