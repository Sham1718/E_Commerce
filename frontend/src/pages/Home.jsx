import React, { useState } from "react";
import Products from "./Products";

const Home = ({products,setPrev,setNext}) => {
 
  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Welcome to ShopSphere
          </h1>

          <p className="mt-5 text-lg max-w-2xl text-blue-100">
            Discover amazing products at the best prices.
            Manage products, update inventory, and shop with ease.
          </p>

        </div>

      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Latest Products
          </h2>

          <p className="text-gray-500 mt-2">
            Browse our collection of products.
          </p>
        </div>

        <Products  products={products} setPrev={setPrev} setNext={setNext} />

      </div>

    </div>
  );
};

export default Home;