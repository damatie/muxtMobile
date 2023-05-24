import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId:'test Id',
  displayName:null,
  userImage: '',
  userEmail:null,
  userToken: null,
}



export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setUserData:(state,{payload})=> {
      state.userEmail = payload.email,
      state.userToken = payload.token,
      state.displayName = payload.displayName,
      state.userImage = payload.userImage
    },
    setLoggedIn: () => {
      state.userId = payload.userId
    }
  },
})

export const {
  setUserData,
  setLoggedIn
}=authUserSlice.actions;

export default authUserSlice.reducer