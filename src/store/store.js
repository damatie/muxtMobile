import { configureStore } from '@reduxjs/toolkit'
import adReducer from './features/ads/adSlice'
import generalReducer from './features/generalSlice'

export const store = configureStore({
  reducer: {
    ads: adReducer,
    general:generalReducer
  },
})