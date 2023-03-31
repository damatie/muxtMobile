import { createSlice } from '@reduxjs/toolkit'


const initialState = {
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