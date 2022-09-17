import { configureStore } from '@reduxjs/toolkit'
import checkersReducer from './gameSlice'

export default configureStore({
  reducer: {
    game: checkersReducer
  },
})
