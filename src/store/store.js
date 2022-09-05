import { configureStore } from '@reduxjs/toolkit'
import adReducer from './features/ads/adSlice'
import generalReducer from './features/generalSlice'
import authUserReducer from './features/authUser/authUserSlice'

export const store = configureStore({
  reducer: {
    ads: adReducer,
    general: generalReducer,
    authUser:authUserReducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
})