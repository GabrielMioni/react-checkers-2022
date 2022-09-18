import React from 'react';
import Checker from './Checker'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChecker, setAvailableMoves } from '../store/gameSlice'
import { isOdd } from '../utils/utils'
import { findItemOccupyingSquare, findMoveOccupyingSquare, getAvailableMoves } from '../utils/game'
import '../scss/square.scss'
import AvailableMove from './AvailableMove'

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

function Square ({ rowIndex, squareIndex }) {
  const dispatch = useDispatch()

  const checkers = useSelector((state) => state.game.checkers)
  const occupyingChecker = findItemOccupyingSquare(checkers, rowIndex, squareIndex)

  const moves = useSelector((state) => state.game.availableMoves)
  const occupyingMove = findMoveOccupyingSquare(moves, rowIndex, squareIndex)

  const clickSquare = () => {
    dispatch(setActiveChecker(occupyingChecker))
    if (occupyingChecker) {
      const newMoves = getAvailableMoves(occupyingChecker.position)
      dispatch(setAvailableMoves(newMoves))
    }
  }

  return (
    <div
      className={`square ${colorClass(rowIndex, squareIndex)}`}
      onClick={() => clickSquare(occupyingChecker)}>
      { !occupyingChecker
        && `${rowIndex},${squareIndex}`}
      { !occupyingChecker
        && occupyingMove
        && <AvailableMove
          row={rowIndex}
          square={squareIndex} /> }
      { occupyingChecker
        && <Checker checker={occupyingChecker}/> }
    </div>
  );
}

export default Square;