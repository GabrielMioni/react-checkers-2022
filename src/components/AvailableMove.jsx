import React from 'react';
import '../scss/available-move.scss'

const doMove = (row, square) => {
  console.log(row, square)
}

function AvailableMove({ row, square }) {
  return (
    <div
      className="available-move"
      onClick={() => doMove(row, square)}>
    </div>
  );
}

export default AvailableMove;