import React, { useEffect } from 'react';
import Row from './Row'
import store from '../store'
import { setGame } from '../store/gameSlice'
import '../scss/board.scss'

function Board () {

  const iterateValue = 8

  useEffect(() => {
    store.dispatch(setGame())
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