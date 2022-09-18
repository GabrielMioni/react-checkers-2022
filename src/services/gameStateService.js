import {
  findItemOccupyingSquare,
  findMoveOccupyingSquare
} from '../utils/game'
import { useSelector } from 'react-redux'

export const GetMoveInSquare = (row, square) => {
  const moves = useSelector(state => state.game.availableMoves)
  return findMoveOccupyingSquare(moves, row, square)
}

export const GetCheckerInSquare = (row, square) => {
  const checkers = useSelector(state => state.game.checkers)
  return findItemOccupyingSquare(checkers, row, square)
}
