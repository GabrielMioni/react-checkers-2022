import React from 'react';
import '../scss/square.scss'
import Checker from './Checker'
import { isOdd } from '../utils/utils'
import { useSelector } from 'react-redux'

const squareHasChecker = (checkers, rowIndex, squareIndex) => {
  return  checkers.find(checker => {
    const { row: rowPosition, square: squarePosition } = checker.position
    return rowPosition === rowIndex && squarePosition === squareIndex
  })
}

function Square({ rowIndex, squareIndex }) {
  const checkers = useSelector((state) => state.checkers.value)
  const existingChecker = squareHasChecker(checkers, rowIndex, squareIndex)
  const hasChecker = existingChecker !== undefined
  const colorA = 'color-a'
  const colorB = 'color-b'

  const colorClass = () => {
    const rowIndexIsOdd = isOdd(rowIndex)
    const squareIndexIsOdd = isOdd(squareIndex)

    return rowIndexIsOdd
      ? squareIndexIsOdd
        ? colorA
        : colorB
      : squareIndexIsOdd
        ? colorB
        : colorA
  }

  return (
    <div className={`square ${colorClass()}`}>
      { !hasChecker && `${rowIndex},${squareIndex}`}
      { hasChecker && <Checker checker={existingChecker}/> }
    </div>
  );
}

export default Square;