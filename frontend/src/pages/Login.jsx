import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-center">
      <form className="flex flex-col gap-3">
        <div>
          <label htmlFor="">username</label>
          <br />
          <input type="text" placeholder="enter your user name..." />
        </div>
        <div>
          <label htmlFor="">password</label>
          <br />
          <input type="password" placeholder="enter your password..." />
        </div>
        <button className="px-[2rem] py-1.5 rounded-md bg-blue-300 w-fit">
          Submit
        </button>
        <button
          onClick={() => navigate("/user-register")}
          type="button"
          className="px-[2rem] py-1.5 rounded-md bg-blue-300 w-fit cursor-pointer"
        >
          Register user
        </button>
      </form>
    </div>
  );
};

export default Login;
