import axios from "../api/Apiconfig";
import { loaduser } from "./UserSlice";


export const asyncGetUsers = () => async (dispatch,getState) => {
  try {
    console.log(getState());
    
    const res = await axios.get("/users");

    dispatch(loaduser(res.data))
    console.log(res.data);
    
  } catch (error) {
    console.log(error);
  }
};
