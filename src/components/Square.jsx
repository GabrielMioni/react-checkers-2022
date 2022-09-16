import React from 'react';
import '../scss/square.scss'
import Checker from './Checker'
import { isOdd } from '../utils/utils'
import { useSelector } from 'react-redux'

const findOccupyingChecker = (checkers, rowIndex, squareIndex) => {
  return  checkers.find(checker => {
    const { row: rowPosition, square: squarePosition } = checker.position
    return rowPosition === rowIndex && squarePosition === squareIndex
  })
}

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

function Square({ rowIndex, squareIndex }) {
  const checkers = useSelector((state) => state.checkers.value)
  const occupyingChecker = findOccupyingChecker(checkers, rowIndex, squareIndex)
  const hasChecker = occupyingChecker !== undefined

  return (
    <div className={`square ${colorClass(rowIndex, squareIndex)}`}>
      { !hasChecker && `${rowIndex},${squareIndex}`}
      { hasChecker && <Checker checker={occupyingChecker}/> }
    </div>
  );
}

export default Square;