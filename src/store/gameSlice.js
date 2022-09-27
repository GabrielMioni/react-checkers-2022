import { createSlice } from '@reduxjs/toolkit'
import {
  setPlayerCheckers,
  getAvailableMoves,
  findCheckerOccupyingSquare,
  findMoveOccupyingSquare,
  getCheckersAfterMove
} from '../utils/game'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    checkers: [],
    activeChecker: null,
    availableMoves: null
  },
  reducers: {
    setGame: (state, action) => {
      state.checkers = setPlayerCheckers()
    },
    setCheckers: (state, action) => {
      state.checkers = action.payload
    },
    setActiveChecker: (state, action) => {
      const activeChecker = action.payload
      if (!activeChecker) {
        state.activeChecker = null
        state.availableMoves = null
        return
      }
      if (state.activeChecker) {
        const { row: activeRow, square: activeSquare } = state.activeChecker
        const { row: newRow, square: newSquare } = activeChecker
        if (activeRow === newRow && activeSquare === newSquare) {
          state.activeChecker = null
          state.availableMoves = null
          return
        }
      }
      const moves = getAvailableMoves(activeChecker, state.checkers)

      state.activeChecker = activeChecker
      state.availableMoves = moves
    },
    setAvailableMoves: (state, actions) => {
      state.availableMoves = actions.payload
    },
    setCheckerMoved: (state, action) => {
      const move = action.payload
      const { activeChecker, checkers } = state
      state.checkers = getCheckersAfterMove(move, activeChecker, checkers)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGame, setCheckers, setActiveChecker, setAvailableMoves, setCheckerMoved } = gameSlice.actions

export default gameSlice.reducer

// Selectors
export const squareHasChecker = (checkers, row, square) => {
  return findCheckerOccupyingSquare(checkers, row, square)
}

export const squareHasMove = (availableMoves, row, square) => {
  return findMoveOccupyingSquare(availableMoves, row, square)
}
