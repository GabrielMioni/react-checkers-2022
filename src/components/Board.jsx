import React, { useEffect } from 'react';
import Row from './Row'
import { initCheckers } from '../utils/board'
import { useDispatch } from 'react-redux'
import { setCheckers } from '../store/checkersSlice'
import '../scss/board.scss'

function Board(props) {

  const iterateValue = 8
  const dispatch = useDispatch()

  useEffect(() => {
    const checkersA = initCheckers('a', 0)
    const checkersB = initCheckers('b', 5)
    const allCheckers = [...checkersA, ...checkersB]
    dispatch(setCheckers(allCheckers))
  }, [])

  return (
    <div className="board">
      {Array(iterateValue).fill('').map((row, rowIndex) => (
        <Row
          key={`row_${rowIndex}`}
          rowIndex={rowIndex}
          iterateValue={iterateValue}
        />
      ))}
    </div>
  );
}

export default Board;