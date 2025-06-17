import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector} from "react-redux";
import { addProduct } from "../../store/actions/productActions";
import { nanoid } from "nanoid";


const Addproducts = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user);
  
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const addProductHandler = (productData) => {
    productData.ownwerId = user.id
    productData.id = nanoid()
    dispatch(addProduct(productData));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(addProductHandler)} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          {...register("title")}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          {...register("price")}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={4}
          {...register("description")}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          {...register("category")}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          {...register("url")}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Addproducts;
