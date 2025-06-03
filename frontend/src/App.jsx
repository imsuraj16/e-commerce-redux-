import React, { useEffect } from "react";
import axios from "./api/Apiconfig";

const App = () => {
  const product = async () => {
    try {
      let res = await axios.get("/products");
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    product();
  }, []);

  return <div className="bg-amber-600 w-full min-h-screen"></div>;
};

export default App;
