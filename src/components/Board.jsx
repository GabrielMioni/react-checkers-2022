import React, { useEffect } from 'react';
import Row from './Row'
import { initCheckers } from '../services/gameStateService'
import '../scss/board.scss'

function Board () {

  const iterateValue = 8

  useEffect(() => {
    initCheckers()
  }, [])

  return (
    <div className="board">
      {Array(iterateValue).fill('').map((row, rowIndex) => (
        <Row
          key={`row_${rowIndex}`}
          row={rowIndex}
          iterateValue={iterateValue}
        />
      ))}
    </div>
  );
}

export default Board;