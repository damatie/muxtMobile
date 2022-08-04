import { configureStore } from '@reduxjs/toolkit'
import adReducer from './features/ads/adSlice'

export const store = configureStore({
  reducer: {
    ads: adReducer,
  },
})