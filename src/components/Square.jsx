import React from 'react';
import Checker from './Checker'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChecker, setAvailableMoves } from '../store/gameSlice'
import { isOdd } from '../utils/utils'
import { findItemOccupyingSquare, findMoveOccupyingSquare, getAvailableMoves } from '../utils/game'
import '../scss/square.scss'
import AvailableMove from './AvailableMove'
import * as gameState from '../services/gameStateService'

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
  const dispatch = useDispatch()

  const occupyingChecker = gameState.GetCheckerInSquare(row, square)
  const occupyingMove = gameState.GetMoveInSquare(row, square)

  const clickSquare = () => {
    dispatch(setActiveChecker(occupyingChecker))
    if (occupyingChecker) {
      const newMoves = getAvailableMoves(occupyingChecker.position)
      dispatch(setAvailableMoves(newMoves))
    }
  }

  return (
    <div
      className={`square ${colorClass(row, square)}`}
      onClick={() => clickSquare(occupyingChecker)}>
      { !occupyingChecker
        && `${row},${square}`}
      { !occupyingChecker
        && occupyingMove
        && <AvailableMove
          row={row}
          square={square} /> }
      { occupyingChecker
        && <Checker checker={occupyingChecker}/> }
    </div>
  );
}

export default Square;