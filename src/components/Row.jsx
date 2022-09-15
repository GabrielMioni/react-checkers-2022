import React from 'react';
import Square from './Square'
import '../scss/row.scss'

function Row({ rowIndex }) {

  const squareCount = 8

  return (
    <div className="row">
      {Array(squareCount).fill('').map((square, squareIndex) => (
        <Square
          key={`square_${squareIndex}`}
          rowIndex={rowIndex}
          squareIndex={squareIndex}/>
      ))}
    </div>
  );
}

export default Row;
