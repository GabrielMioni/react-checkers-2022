import React, { useState, useEffect } from 'react';
import Row from './Row'
import { initCheckers } from '../utils/board'
import '../scss/board.scss'

function Board(props) {

  const iterateValue = 8

  const [checkersPlayerA, setCheckersPlayerA] = useState([])
  const [checkersPlayerB, setCheckersPlayerB] = useState([])

  useEffect(() => {
    const checkersA = initCheckers('a', 0)
    const checkersB = initCheckers('b', 5)
    setCheckersPlayerA(checkersA)
    setCheckersPlayerB(checkersB)
    console.log(checkersPlayerA)
    console.log(checkersPlayerB)
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