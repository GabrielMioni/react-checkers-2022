import React from 'react';
import * as gameState from '../services/gameStateService' 
import '../scss/available-move.scss'

function AvailableMove ({ row, square }) {
  const activeChecker = gameState.GetActiveChecker()
  const allCheckers = gameState.GetAllCheckers()
  return (
    <div
      className="available-move"
      onClick={() => gameState.SetCheckerMove(row, square, activeChecker, allCheckers)}
    />
  );
}

export default AvailableMove;