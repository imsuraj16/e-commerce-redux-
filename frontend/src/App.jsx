import React, { useEffect } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { currentUser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/actions/productActions";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
    dispatch(fetchProducts())
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
