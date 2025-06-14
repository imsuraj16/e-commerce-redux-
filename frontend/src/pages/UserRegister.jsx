import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../store/actions/userActions";
import { nanoid } from "nanoid";

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const registerUserHandler = (userData) => {
    console.log(userData);
    userData.id = nanoid();
    dispatch(addUser(userData));
    navigate("/login");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(registerUserHandler)}
        className="flex flex-col gap-3"
      >
        <div>
          <label htmlFor="">name</label>
          <br />
          <input
            type="text"
            placeholder="enter your user name..."
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor="">e-mail</label>
          <br />
          <input
            type="email"
            placeholder="enter your e-mail..."
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
      </form>
    </div>
  );
};

export default UserRegister;
