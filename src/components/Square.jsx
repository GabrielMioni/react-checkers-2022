import React from 'react';
import Checker from './Checker'
import { useSelector } from 'react-redux'
import { isOdd } from '../utils/utils'
import { findOccupyingChecker } from '../utils/board'
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

function Square({ rowIndex, squareIndex, clickSquare }) {
  const checkers = useSelector((state) => state.checkers.value)
  const occupyingChecker = findOccupyingChecker(checkers, rowIndex, squareIndex)
  const hasChecker = occupyingChecker !== undefined

  return (
    <div
      className={`square ${colorClass(rowIndex, squareIndex)}`}
      onClick={() => clickSquare(occupyingChecker)}>
      { !hasChecker && `${rowIndex},${squareIndex}`}
      { hasChecker && <Checker checker={occupyingChecker}/> }
    </div>
  );
}

export default Square;