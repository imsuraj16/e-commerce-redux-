import axios from "../../api/apiconfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [productDetail, setProductDetail] = useState(null);

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProductDetail(data);
    } catch (error) {
      console.log(error);
    }
  };
    const deleteProduct = async () => {
    try {
      await axios.delete(`/products/${id}`);
      alert("Product Deleted Successfully");
      navigate(`/admin/${id}/listings`);
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (!productDetail) return <div className="text-[10rem]">loading</div>;
  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={productDetail.url}
          alt={productDetail.title}
          className="w-full md:w-[350px] h-[300px] object-cover rounded-xl border"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold capitalize">{productDetail.title}</h1>
          <p className="text-gray-600 capitalize">{productDetail.category}</p>
          <p className="text-gray-800">{productDetail.description}</p>
          <p className="text-2xl font-bold text-green-600">₹ {productDetail.price}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
          onClick={() => alert("Redirect to edit form here")}
        >
          ✏️ Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          onClick={()=>deleteProduct()}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProductDetails;
