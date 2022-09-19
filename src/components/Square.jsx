import React from 'react';
import Checker from './Checker'
import AvailableMove from './AvailableMove'
import { isOdd } from '../utils/utils'
import * as gameState from '../services/gameStateService'
import '../scss/square.scss'

const colorClass = (rowIndex, squareIndex) => {
  const rowIndexIsOdd = isOdd(rowIndex)
  const squareIndexIsOdd = isOdd(squareIndex)

  const colorA = 'color-a'
  const colorB = 'color-b'

  return rowIndexIsOdd
    ? squareIndexIsOdd
      ? colorA
      : colorB
    : squareIndexIsOdd
      ? colorB
      : colorA
}

function Square ({ row, square }) {
  const occupyingChecker = gameState.GetCheckerInSquare(row, square)
  const occupyingMove = gameState.GetMoveInSquare(row, square)

  const allCheckers = gameState.GetAllCheckers()

  const clickSquare = () => {
    gameState.SetActiveChecker(occupyingChecker)
    if (occupyingChecker) {
      gameState.SetAvailableMoves(row, square, allCheckers)
    }
  }

  return (
    <div
      className={`square ${colorClass(row, square)}`}
      onClick={() => clickSquare(occupyingChecker)}>
      { !occupyingChecker
        && `${row},${square}`}
      { !occupyingChecker && occupyingMove &&
        <AvailableMove
          row={row}
          square={square}
          occupyingMove={occupyingMove}
        /> }
      { occupyingChecker
        && <Checker checker={occupyingChecker}/> }
    </div>
  );
}

export default Square;