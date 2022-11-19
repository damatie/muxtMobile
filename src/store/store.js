import { configureStore } from '@reduxjs/toolkit'
import adReducer from './features/ads/adSlice'
import generalReducer from './features/generalSlice'
import authUserReducer from './features/authUser/authUserSlice'
import sharedReducer from './features/shared/sharedSlice'

export const store = configureStore({
  reducer: {
    ads: adReducer,
    general: generalReducer,
    authUser:authUserReducer,
    shared: sharedReducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
})