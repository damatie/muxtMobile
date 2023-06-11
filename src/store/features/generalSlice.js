import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authIntro: {
    title: "",
    subTitle: "",
    tag: "",
  },
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setAuthIntro: (state, { payload }) => {
      (state.authIntro.title = payload.title),
        (state.authIntro.subTitle = payload.subTitle);
      state.authIntro.tag = payload.tag;
    },
  },
});

export const { setAuthIntro } = generalSlice.actions;

export default generalSlice.reducer;
