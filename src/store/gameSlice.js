import { createSlice, createSelector } from '@reduxjs/toolkit'
import { setPlayerCheckers, getAvailableMoves } from '../utils/game'

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
      const moves = getAvailableMoves(activeChecker, state.checkers)

      state.activeChecker = activeChecker
      state.availableMoves = moves
    },
    setAvailableMoves: (state, actions) => {
      state.availableMoves = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGame, setCheckers, setActiveChecker, setAvailableMoves } = gameSlice.actions

export default gameSlice.reducer