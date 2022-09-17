import React from 'react';
import Square from './Square'
import '../scss/row.scss'

function Row({ rowIndex, iterateValue, clickSquare }) {

  return (
    <div className="row">
      {Array(iterateValue).fill('').map((square, squareIndex) => (
        <Square
          key={`square_${squareIndex}`}
          rowIndex={rowIndex}
          squareIndex={squareIndex}
          clickSquare={clickSquare}/>
      ))}
    </div>
  );
}

export default Row;
