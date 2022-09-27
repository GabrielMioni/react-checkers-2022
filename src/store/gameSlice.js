import { createSlice } from '@reduxjs/toolkit'
import * as gameService from '../services/gameService'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    checkers: [],
    activeChecker: null,
    availableMoves: null
  },
  reducers: {
    setGame: (state, action) => {
      state.checkers = gameService.setPlayerCheckers()
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
      const moves = gameService.getAvailableMoves(activeChecker, state.checkers)

      state.activeChecker = activeChecker
      state.availableMoves = moves
    },
    setCheckerMoved: (state, action) => {
      const move = action.payload
      const { activeChecker, checkers } = state
      state.checkers = gameService.getCheckersAfterMove(move, activeChecker, checkers)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGame, setActiveChecker, setCheckerMoved } = gameSlice.actions

export default gameSlice.reducer

// Selectors
export const squareHasChecker = (checkers, row, square) => {
  return gameService.findCheckerOccupyingSquare(checkers, row, square)
}

export const squareHasMove = (availableMoves, row, square) => {
  return gameService.findMoveOccupyingSquare(availableMoves, row, square)
}
