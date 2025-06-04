import React, { useEffect } from "react";
import axios from "./api/Apiconfig";
import { asyncGetUsers } from "./store/userActions";
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch()
  


  useEffect(() => {
    dispatch(asyncGetUsers());
  }, []);

  return <div className="bg-amber-600 w-full min-h-screen"></div>;
};

export default App;
