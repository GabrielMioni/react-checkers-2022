import React, { useState, useEffect } from 'react';
import Row from './Row'
import '../scss/board.scss'

function Board(props) {

  const rowCount = 8

  return (
    <div className="board">
      {Array(rowCount).fill('').map((row, rowIndex) => (
        <Row
          key={`row_${rowIndex}`}
          rowIndex={rowIndex}
        />
      ))}
    </div>
  );
}

export default Board;