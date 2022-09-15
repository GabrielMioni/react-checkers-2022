import React, { useState, useEffect } from 'react';
import Row from './Row'
import '../scss/board.scss'

function Board(props) {

  const iterateValue = 8

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