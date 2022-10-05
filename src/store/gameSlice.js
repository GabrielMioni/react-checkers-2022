import { createSlice } from '@reduxjs/toolkit'
import * as gameService from '../services/gameService'
import { players } from '../services/players'
import { getBestMove } from '../services/computerPlayerService'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    checkers: [],
    activeChecker: null,
    availableMoves: null,
    checkersWithPossibleMoves: null,
    multiJumpActive: false,
    selectedMove: null,
    currentPlayer: players.a,
    winner: null,
    computerPlayer: true
  },
  reducers: {
    setGame: (state, action) => {
      state.winner = null
      state.checkers = gameService.setPlayerCheckers()
      state.possibleMoves = gameService.findCheckersWithPossibleMoves(state.currentPlayer, state.checkers)
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
      const { activeChecker, checkers, selectedMove } = state

      state.activeChecker = null
      state.availableMoves = null
      state.multiJumpActive = null
      state.selectedMove = null
      state.checkers = gameService.getCheckersAfterMove(selectedMove, activeChecker, checkers)

      const additionalJumps = gameService.additionalJumps(selectedMove, state.checkers)
      if (additionalJumps) {
        // Update the activeChecker with current checker state
        state.activeChecker = gameService.getCheckerById(activeChecker.id, state.checkers)
        state.availableMoves = additionalJumps
        state.multiJumpActive = true
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

      // const computerPlayer = new computerPlayerService(state.currentPlayer, state.checkers)
      // computerPlayer.getBestMove()

      if (state.computerPlayer && state.currentPlayer === players.b) {
        const computerMove = getBestMove(state.checkers, state.currentPlayer)
        console.log(computerMove)
      }

      state.possibleMoves = gameService.findCheckersWithPossibleMoves(state.currentPlayer, state.checkers)
    }
  },
})

export const { setGame, setActiveChecker, setCheckerMoved, setSelectedMove } = gameSlice.actions

export default gameSlice.reducer

// Selectors
export const squareHasChecker = (checkers, row, square) => {
  return gameService.findCheckerOccupyingSquare(checkers, row, square)
}

export const squareHasMove = (availableMoves, row, square) => {
  return gameService.findMoveOccupyingSquare(availableMoves, row, square)
}

export const checkerHasPossibleMove = (possibleMoves, checker) => {
  if (!possibleMoves) {
    return false
  }
  return possibleMoves
    .map(move => move.id)
    .filter(moveId => moveId === checker.id).length > 0
}
