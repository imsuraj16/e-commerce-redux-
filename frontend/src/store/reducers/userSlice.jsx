import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

 const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { loadUser } = userSlice.actions;
