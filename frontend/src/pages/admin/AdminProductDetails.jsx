import axios from "../../api/apiconfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, editProduct } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState(null);
  const [edit, setEdit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProductDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = (id, ownerId) => {
    dispatch(deleteProduct(id));
    navigate(`/admin/${ownerId}/listings`);
  };

  const updateProductHandler = (data)=>{ 
    console.log(data);
    data.id = id
     
  dispatch(editProduct(data))
  navigate(0)

  }

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (!productDetail) return <div className="text-[10rem]">loading</div>;

  if (edit) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          ✏️ Edit Product
        </h2>

        <form onSubmit={handleSubmit(updateProductHandler)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter product title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("title")}
              defaultValue={productDetail?.title}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("price")}
              defaultValue={productDetail?.price}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. clothes, electronics"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category")}
              defaultValue={productDetail?.category}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description")}
              defaultValue={productDetail?.description}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Paste image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("url")}
              defaultValue={productDetail.url}
            />
          </div>

          <div className="text-center flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg">
              Save Changes
            </button>
            <button
              onClick={() => setEdit(false)}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={productDetail.url}
          alt={productDetail.title}
          className="w-full md:w-[350px] h-[300px] object-cover rounded-xl border"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold capitalize">
            {productDetail.title}
          </h1>
          <p className="text-gray-600 capitalize">{productDetail.category}</p>
          <p className="text-gray-800">{productDetail.description}</p>
          <p className="text-2xl font-bold text-green-600">
            ₹ {productDetail.price}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
          onClick={() => setEdit(true)}
        >
          ✏️ Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          onClick={() => deleteHandler(productDetail.id, productDetail.ownerId)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProductDetails;
