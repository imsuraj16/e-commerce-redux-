import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.user);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter out owner's own products
  const visibleProducts = user
    ? products.filter((item) => item.ownerId !== user.id)
    : products;

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(visibleProducts.map(p => p.category))];
    return uniqueCategories.sort();
  }, [visibleProducts]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = visibleProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Create a new array before sorting to avoid mutating the original
    const sortedProducts = [...filtered];

    // Sort products
    switch (sortBy) {
      case "newest":
        sortedProducts.sort((a, b) => {
          // Assuming there's a createdAt field, fallback to id comparison
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA; // Newest first
        });
        break;
      case "price-low":
        sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        sortedProducts.sort((a, b) => 
          (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase())
        );
        break;
      default:
        break;
    }

    return sortedProducts;
  }, [visibleProducts, selectedCategory, sortBy]);

  // Empty state when no products exist
  if (visibleProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Products Available</h2>
            <p className="text-gray-600 mb-8">
              There are no products to display at the moment. Check back later or be the first to list a product!
            </p>
            {user && (
              <Link
                to="/create-product"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                List Your First Product
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our curated collection of quality products from trusted sellers
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Category Filter */}
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Showing {filteredAndSortedProducts.length} of {visibleProducts.length} products
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        {/* No Results State */}
        {filteredAndSortedProducts.length === 0 && visibleProducts.length > 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your category filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSortBy("newest");
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                {/* Product Image */}
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  {product.url ? (
                    <img
                      src={product.url}
                      alt={product.title || 'Product image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextSibling;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ display: product.url ? 'none' : 'flex' }}
                  >
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full capitalize shadow-sm">
                      {product.category || 'Uncategorized'}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 capitalize group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.title || 'Untitled Product'}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description || 'No description available'}
                  </p>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{product.price?.toLocaleString() || '0'}
                    </div>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-blue-700 transition-colors">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Showing all {filteredAndSortedProducts.length} products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;