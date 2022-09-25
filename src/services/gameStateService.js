import store from '../store'
import { findCheckerByRowSquare } from '../utils/utils'
import { useSelector } from 'react-redux'
import { setActiveChecker, setAvailableMoves, setCheckers, setGame } from '../store/gameSlice'
import * as game from '../utils/game'

export const initCheckers = () => {
  store.dispatch(setGame())
}

export const GetMoveInSquare = (row, square) => {
  const moves = useSelector(state => state.game.availableMoves)
  return game.findMoveOccupyingSquare(moves, row, square)
}

export const GetCheckerInSquare = (row, square) => {
  const checkers = useSelector(state => state.game.checkers)
  return game.findItemOccupyingSquare(checkers, row, square)
}

export const GetAllCheckers = () => {
  return useSelector(state => state.game.checkers)
}

export const GetActiveChecker = () => {
  return useSelector(state => state.game.activeChecker)
}

export const GetAvailableMoves = () => {
  return useSelector(state => state.game.availableMoves)
}

const SetClearMoves = () => {
  store.dispatch(setAvailableMoves(null))
}

export const SetActiveChecker = (occupyingChecker) => {
  store.dispatch(setActiveChecker(occupyingChecker))
  SetClearMoves()
}

export const SetAvailableMoves = (row, square, allCheckers) => {
  const activeChecker = findCheckerByRowSquare(row, square, allCheckers)
  const neighborSquares = game.getNeighborSquares({ row, square })
  const moves = game.checkForOpponentNeighbors(neighborSquares, allCheckers, activeChecker)
  store.dispatch(setAvailableMoves(moves))
}

export const SetCheckerMove = (row, square, activeChecker, allCheckers, kill) => {
  const updatedCheckers = game.getCheckersAfterMove(activeChecker, allCheckers, row, square, kill)
  store.dispatch(setCheckers(updatedCheckers))
  SetClearMoves()
}