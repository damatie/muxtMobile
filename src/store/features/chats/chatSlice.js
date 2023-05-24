import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: 'i am working',
  chats: [],
  inChat:null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInchat: (state, { payload }) => {
      state.inChat = payload
    }
  },
})

export const {
  setInchat
}=chatSlice.actions;

export default chatSlice.reducer
