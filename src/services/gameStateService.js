import store from '../store'
import { findCheckerByRowSquare } from '../utils/utils'
import { useSelector } from 'react-redux'
import { setActiveChecker, setAvailableMoves, setCheckers } from '../store/gameSlice'
import {
  checkForOpponentNeighbors,
  findItemOccupyingSquare,
  findMoveOccupyingSquare,
  getCheckersAfterMove,
  getNeighborSquares } from '../utils/game'

export const GetMoveInSquare = (row, square) => {
  const moves = useSelector(state => state.game.availableMoves)
  return findMoveOccupyingSquare(moves, row, square)
}

export const GetCheckerInSquare = (row, square) => {
  const checkers = useSelector(state => state.game.checkers)
  return findItemOccupyingSquare(checkers, row, square)
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

export const SetActiveChecker = (occupyingChecker) => {
  store.dispatch(setActiveChecker(occupyingChecker))
}

export const SetAvailableMoves = (row, square, allCheckers) => {
  const activeChecker = findCheckerByRowSquare(row, square, allCheckers)
  const neighborSquares = getNeighborSquares({ row, square })
  const moves = checkForOpponentNeighbors(neighborSquares, allCheckers, activeChecker)
  store.dispatch(setAvailableMoves(moves))
}

export const SetCheckerMove = (row, square, activeChecker, allCheckers, kill) => {
  const updatedCheckers = getCheckersAfterMove(activeChecker, allCheckers, row, square, kill)
  store.dispatch(setCheckers(updatedCheckers))
  store.dispatch(setAvailableMoves(null))
}