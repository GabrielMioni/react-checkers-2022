import { createSlice } from '@reduxjs/toolkit'

export const checkersSlice = createSlice({
  name: 'checkers',
  initialState: {
    checkers: [],
    activeChecker: null
  },
  reducers: {
    setCheckers: (state, action) => {
      state.checkers = action.payload
    },
    setActiveChecker: (state, actions) => {
      state.activeChecker = actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCheckers, setActiveChecker } = checkersSlice.actions

export default checkersSlice.reducer