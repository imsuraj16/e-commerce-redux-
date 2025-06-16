import axios from "../../api/apiconfig";

export const loginCurrentUser = (user) => async (dispatch) => {
  try {
    const res = await axios.get(
      `users?email=${user.email}&password=${user.password}`
    );
    localStorage.setItem("users",JSON.stringify(res.data[0]))
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};


export const registerUser = ()=>async(dispatch)=>{
    
}








export const addUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/users", user);
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};
