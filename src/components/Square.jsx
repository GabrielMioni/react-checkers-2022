import React from 'react';
import Checker from './Checker'
import {useDispatch, useSelector} from 'react-redux'
import { setActiveChecker } from '../store/gameSlice'
import { isOdd } from '../utils/utils'
import { findItemOccupyingSquare } from '../utils/board'
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

function Square({ rowIndex, squareIndex }) {
  const dispatch = useDispatch()

  const checkers = useSelector((state) => state.game.checkers)
  const occupyingChecker = findItemOccupyingSquare(checkers, rowIndex, squareIndex)

  const clickSquare = () => {
    dispatch(setActiveChecker(occupyingChecker))
  }

  return (
    <div
      className={`square ${colorClass(rowIndex, squareIndex)}`}
      onClick={() => clickSquare(occupyingChecker)}>
      { !occupyingChecker && `${rowIndex},${squareIndex}`}
      { occupyingChecker && <Checker checker={occupyingChecker}/> }
    </div>
  );
}

export default Square;