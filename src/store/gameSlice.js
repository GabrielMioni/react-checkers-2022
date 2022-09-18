import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    checkers: [],
    activeChecker: null,
    availableMoves: null
  },
  reducers: {
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
export const { setCheckers, setActiveChecker, setAvailableMoves } = gameSlice.actions

export default gameSlice.reducer