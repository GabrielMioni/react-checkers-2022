import { configureStore } from '@reduxjs/toolkit'
import checkersReducer from '../store/checkersSlice'

export default configureStore({
  reducer: {
    checkers: checkersReducer
  },
})
