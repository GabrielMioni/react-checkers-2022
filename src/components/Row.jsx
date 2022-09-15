import React from 'react';
import Square from './Square'
import '../scss/row.scss'

function Row({ rowIndex, iterateValue }) {

  return (
    <div className="row">
      {Array(iterateValue).fill('').map((square, squareIndex) => (
        <Square
          key={`square_${squareIndex}`}
          rowIndex={rowIndex}
          squareIndex={squareIndex}/>
      ))}
    </div>
  );
}

export default Row;
