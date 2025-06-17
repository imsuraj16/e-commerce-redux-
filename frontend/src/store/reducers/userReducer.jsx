import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../actions/userActions";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state, action) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { loadUser,logout } = userSlice.actions;
