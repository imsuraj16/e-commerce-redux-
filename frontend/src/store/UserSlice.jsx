import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loaduser: (sate, action) => {
        
        console.log(action);

    },
  },
});

//ye action or reducer deta hai to reducer ko nikal liye hai

export const { loaduser } = userSlice.actions;
export default userSlice.reducer;
