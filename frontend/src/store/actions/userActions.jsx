import axios from "../../api/apiconfig";
import { loadUser, logout } from "../reducers/userReducer";

export const currentUser = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    dispatch(loadUser(user));
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};

export const loginCurrentUser = (user) => async (dispatch) => {
  try {
    const res = await axios.get(
      `users?email=${user.email}&password=${user.password}`
    );

    localStorage.setItem("user", JSON.stringify(res.data[0]));
    dispatch(currentUser());
  } catch (error) {
    console.log(error);
  }
};

export const registerUserAsAdmin = (admindata) => async (dispatch) => {
  try {
    const res = await axios.get(
      `users?email=${admindata.email}&password=${admindata.password}`
    );

    let user = res.data[0];
    // console.log(user);

    const regUser = await axios.patch(`/users/${user.id}`, { isAdmin: true });

    console.log(regUser.data);
    localStorage.setItem("user", JSON.stringify(regUser.data));
    dispatch(currentUser());
  } catch (error) {
    console.log(error.message);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/users", user);
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const editUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/users/${user.id}`, user);
    console.log(data);
    localStorage.setItem("user",JSON.stringify(data))
    dispatch(currentUser())
  } catch (error) {
    console.log(error);
  }
};
