import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: 'shared working',
  shares: [],
}

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setShares: (state, { payload }) => {
      state.shares = payload
    }
  },
})

export const {
  setShares
}=sharedSlice.actions;

export default sharedSlice.reducer