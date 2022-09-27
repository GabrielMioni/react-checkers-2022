import React from 'react';
import Checker from './Checker'
import Move from './Move'
import { isOdd } from '../utils/utils'
import { setActiveChecker, squareHasChecker, squareHasMove } from '../store/gameSlice'
import { useSelector } from 'react-redux'
import '../scss/square.scss'
import store from '../store'

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
      ? <Move occupyingMove={occupyingMove} />
      : `${row},${square}`
}

const clickSquare = () => {
  store.dispatch(setActiveChecker(null))
}

function Square ({ row, square }) {
  const moves = useSelector(state => state.game.availableMoves)
  const checkers = useSelector(state => state.game.checkers)

  const occupyingChecker = squareHasChecker(checkers, row, square)
  const occupyingMove = squareHasMove(moves, row, square)

  return (
    <div
      className={`square ${colorClass(row, square)}`}
      onClick={() => clickSquare()}
    >
      { squareContent(occupyingChecker, occupyingMove, row, square) }
    </div>
  );
}

export default Square;