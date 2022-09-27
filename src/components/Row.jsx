import React from 'react';
import Square from './Square'
import '../scss/row.scss'

function Row ({ row, iterateValue }) {
  return (
    <div className="row">
      {Array(iterateValue).fill('').map((squareObject, square) => (
        <Square
          key={`square_${square}`}
          row={row}
          square={square} />
      ))}
    </div>
  );
}

export default Row;
