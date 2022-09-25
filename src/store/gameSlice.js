import { createSlice } from '@reduxjs/toolkit'
import { setPlayerCheckers } from '../utils/game'

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
    setActiveChecker: (state, actions) => {
      state.activeChecker = actions.payload
    },
    setAvailableMoves: (state, actions) => {
      state.availableMoves = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGame, setCheckers, setActiveChecker, setAvailableMoves } = gameSlice.actions

export default gameSlice.reducer