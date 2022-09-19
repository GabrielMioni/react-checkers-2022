import React from 'react';
import * as gameState from '../services/gameStateService' 
import '../scss/available-move.scss'

function AvailableMove ({ row, square, occupyingMove }) {
  const activeChecker = gameState.GetActiveChecker()
  const allCheckers = gameState.GetAllCheckers()
  const kill = occupyingMove.kill
  return (
    <div
      className="available-move"
      onClick={() => gameState.SetCheckerMove(row, square, activeChecker, allCheckers, kill)}
    />
  );
}

export default AvailableMove;