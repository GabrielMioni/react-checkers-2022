import { createSlice } from '@reduxjs/toolkit'
import * as gameService from '../services/gameService'
import { players } from '../services/players'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    checkers: [],
    activeChecker: null,
    availableMoves: null,
    multiJumpActive: false,
    selectedMove: null,
    currentPlayer: players.a,
    winner: null
  },
  reducers: {
    setGame: (state, action) => {
      state.checkers = gameService.setPlayerCheckers()
    },
    setActiveChecker: (state, action) => {
      const newActiveChecker = action.payload
      if (!newActiveChecker) {
        if (!state.multiJumpActive) {
          state.activeChecker = null
          state.availableMoves = null
        }
        return
      }
      if (newActiveChecker.player !== state.currentPlayer) {
        return
      }
      if (state.activeChecker) {
        const { row: activeRow, square: activeSquare } = state.activeChecker
        const { row: newRow, square: newSquare } = newActiveChecker
        if (!state.multiJumpActive && (activeRow === newRow && activeSquare === newSquare)) {
          state.activeChecker = null
          state.availableMoves = null
          return
        }
      }

      state.activeChecker = newActiveChecker
      state.availableMoves = gameService.getAvailableMoves(newActiveChecker, state.checkers)
    },
    setSelectedMove: (state, action) => {
      state.selectedMove = action.payload
    },
    setCheckerMoved: (state) => {
      const move = state.selectedMove
      const { activeChecker, checkers } = state

      state.selectedMove = null
      state.checkers = gameService.getCheckersAfterMove(move, activeChecker, checkers)
      state.availableMoves = null
      state.activeChecker = null

      const additionalJumps = gameService.additionalJumps(move, state.checkers)
      if (additionalJumps) {
        // Update the activeChecker with current checker state
        state.multiJumpActive = true
        state.activeChecker = gameService.getCheckerById(activeChecker.id, state.checkers)
        state.availableMoves = additionalJumps
        return
      }
      const playerWon = gameService.playerWon(state.currentPlayer, state.checkers)

      if (playerWon) {
        state.winner = state.currentPlayer
        console.log(`Player ${state.currentPlayer} won!`)
        return
      }

      state.currentPlayer = state.currentPlayer === players.a
        ? players.b
        : players.a
    },
    resetGame: (state, action) => {
      state.checkers = gameService.setPlayerCheckers()
      state.winner = null
    }
  },
})

export const { setGame, setActiveChecker, setCheckerMoved, resetGame, setSelectedMove } = gameSlice.actions

export default gameSlice.reducer

// Selectors
export const squareHasChecker = (checkers, row, square) => {
  return gameService.findCheckerOccupyingSquare(checkers, row, square)
}

export const squareHasMove = (availableMoves, row, square) => {
  return gameService.findMoveOccupyingSquare(availableMoves, row, square)
}
