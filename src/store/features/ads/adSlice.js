import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: 'i am working',
  ads: [],
}

export const adSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setAds: (state, { payload }) => {
      state.ads = payload
    }
  },
})

export const {
  setAds
}=adSlice.actions;

export default adSlice.reducer