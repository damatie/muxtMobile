import { configureStore } from '@reduxjs/toolkit'
import adReducer from './features/ads/adSlice'
import generalReducer from './features/generalSlice'
import authUserReducer from './features/authUser/authUserSlice'
import sharedReducer from './features/shared/sharedSlice'
import chatReducer from './features/chats/chatSlice'

export const store = configureStore({
  reducer: {
    ads: adReducer,
    general: generalReducer,
    authUser:authUserReducer,
    shared: sharedReducer,
    chat:chatReducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
})