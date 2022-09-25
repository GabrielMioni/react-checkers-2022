import React from 'react';
import Checker from './Checker'
import Move from './Move'
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
  return occupyingChecker
    ? <Checker checker={occupyingChecker} />
    : occupyingMove
      ? <Move row={row} square={square} occupyingMove={occupyingMove} />
      : `${row},${square}`
}

const clickSquare = (allCheckers, occupyingChecker, row, square) => {
  gameState.SetActiveChecker(occupyingChecker)
  if (occupyingChecker) {
    gameState.SetAvailableMoves(row, square, allCheckers)
  }
}

function Square ({ row, square }) {
  const occupyingChecker = gameState.GetCheckerInSquare(row, square)
  const occupyingMove = gameState.GetMoveInSquare(row, square)

  const allCheckers = gameState.GetAllCheckers()

  return (
    <div
      className={`square ${colorClass(row, square)}`}
      onClick={() => clickSquare(allCheckers, occupyingChecker, row, square)}
    >
      { squareContent(occupyingChecker, occupyingMove, row, square) }
    </div>
  );
}

export default Square;