import { createSlice } from '@reduxjs/toolkit'

export const checkersSlice = createSlice({
  name: 'checkers',
  initialState: {
    value: [],
  },
  reducers: {
    setCheckers: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCheckers } = checkersSlice.actions

export default checkersSlice.reducer