import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { regiterUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loginHandler = (registerData) => {
    registerData.id = nanoid();
    registerData.isAdmin = false
    dispatch(regiterUser(registerData));
    navigate('/login')
    
  };

  return (
    <div className="w-full h-scrren flex items-center justify-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="w-1/2 flex flex-col gap-[2rem]"
      >
        <input
          className="border-b-2 border-gray-500 outline-none p-2 w-full"
          type="text"
          placeholder="jhon-doe"
          {...register("username")}
        />
        <input
          className="border-b-2 border-gray-500 outline-none p-2 w-full"
          type="email"
          placeholder="sv@gmail.com"
          {...register("email")}
        />
        <input
          className="border-b-2 border-gray-500 outline-none p-2 w-full"
          type="password"
          placeholder="*********"
          {...register("password")}
        />
        <button className="w-fit bg-blue-400 px-[2rem] py-1 rounded-md">
          Register User
        </button>
        <p>
          Dont have an account?{" "}
          <Link className="text-red-700" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
