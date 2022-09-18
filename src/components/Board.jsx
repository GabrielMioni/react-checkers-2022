import React, { useEffect } from 'react';
import Row from './Row'
import { initCheckers } from '../utils/game'
import { useDispatch } from 'react-redux'
import { setCheckers } from '../store/gameSlice'
import '../scss/board.scss'

function Board () {

  const iterateValue = 8
  const dispatch = useDispatch()

  useEffect(() => {
    const checkersA = initCheckers('a', 0)
    const checkersB = initCheckers('b', 5)
    dispatch(setCheckers([...checkersA, ...checkersB]))
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