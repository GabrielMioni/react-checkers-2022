import React from 'react';
import { moveChecker } from '../utils/game'
import '../scss/available-move.scss'

function AvailableMove({ row, square }) {
  return (
    <div
      className="available-move"
      onClick={() => moveChecker(row, square)}>
    </div>
  );
}

export default AvailableMove;