import React, { useEffect } from "react";
import Mainroutes from "./routes/Mainroutes";
import Navbar from "./components/Navbar";
import { currentUser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  return (
    <div className="w-full min-h-screen bg-blue-300 flex flex-col gap-[3rem]">
      <Navbar />
      <Mainroutes />
    </div>
  );
};

export default App;
