import React from 'react'

const Adminregister = () => {
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit(makeAdminHandler)} className="flex flex-col gap-4 w-96 p-4 border rounded shadow">
        <h2 className="text-xl font-bold text-center">Admin Register Form</h2>
        
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className="p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
          className="p-2 border rounded"
        />
        {errors.password && <p className="text-red-500">Password is required</p>}

        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Become Admin
        </button>
      </form>
    </div>
  )
}

export default Adminregister
