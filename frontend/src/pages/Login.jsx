import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginCurrentUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loginHandler = (loginuserdata) => {
    // console.log(loginuserdata);

    dispatch(loginCurrentUser(loginuserdata));
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="flex flex-col gap-3"
      >
        <div>
          <label htmlFor="">e-mail</label>
          <br />
          <input
            type="email"
            placeholder="enter your user name..."
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="">password</label>
          <br />
          <input
            type="password"
            placeholder="enter your password..."
            {...register("password")}
          />
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
