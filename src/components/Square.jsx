import React from 'react';
import Checker from './Checker'
import AvailableMove from './AvailableMove'
import { isOdd } from '../utils/utils'
import * as gameState from '../services/gameStateService'
import '../scss/square.scss'

const colorClass = (row, square) => {
  const rowIsOdd = isOdd(row)
  const squareIsOdd = isOdd(square)

  const colorA = 'color-a'
  const colorB = 'color-b'

  return rowIsOdd
    ? squareIsOdd
      ? colorA
      : colorB
    : squareIsOdd
      ? colorB
      : colorA
}

const squareContent = (occupyingChecker, occupyingMove, row, square) => {
  return occupyingChecker && !occupyingMove
    ? <Checker checker={occupyingChecker} />
    : !occupyingChecker && occupyingMove
      ? <AvailableMove row={row} square={square} occupyingMove={occupyingMove} />
      : `${row},${square}`
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
      { squareContent(occupyingChecker, occupyingMove, row, square) }
    </div>
  );
}

export default Square;