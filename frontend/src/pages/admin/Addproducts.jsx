import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/actions/productActions";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const watchImageUrl = watch("url");

  // Update image preview when URL changes
  React.useEffect(() => {
    if (watchImageUrl) {
      setImagePreview(watchImageUrl);
    }
  }, [watchImageUrl]);

  const addProductHandler = async (productData) => {
    setIsSubmitting(true);
    try {
      // Add timestamp for creation date
      productData.createdAt = new Date().toISOString();
      productData.ownerId = user.id;
      productData.id = nanoid();
      productData.price = parseFloat(productData.price);
      
      dispatch(addProduct(productData));
      
      // Success feedback
      const successMessage = document.createElement('div');
      successMessage.innerHTML = `
        <div class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Product added successfully!
        </div>
      `;
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
      
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const predefinedCategories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Health & Beauty',
    'Automotive',
    'Food & Beverages',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">
            Share your product with the community
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(addProductHandler)} className="space-y-6">
            {/* Product Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                placeholder="Enter product title"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all ${
                  errors.title ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                {...register("title", {
                  required: "Product title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long"
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must be less than 100 characters"
                  }
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all ${
                  errors.price ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0.01,
                    message: "Price must be greater than 0"
                  },
                  max: {
                    value: 1000000,
                    message: "Price must be less than ₹10,00,000"
                  }
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                placeholder="Describe your product in detail..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all resize-vertical ${
                  errors.description ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                {...register("description", {
                  required: "Product description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long"
                  },
                  maxLength: {
                    value: 1000,
                    message: "Description must be less than 1000 characters"
                  }
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all bg-white ${
                  errors.category ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                {...register("category", {
                  required: "Please select a category"
                })}
              >
                <option value="">Select a category</option>
                {predefinedCategories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all ${
                  errors.url ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                {...register("url", {
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                    message: "Please enter a valid image URL (jpg, jpeg, png, gif, webp)"
                  }
                })}
              />
              {errors.url && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.url.message}
                </p>
              )}
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview("")}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            * Required fields. Make sure to provide accurate information about your product.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;