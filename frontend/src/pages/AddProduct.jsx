import React from "react";
import ProductForm from "../components/ProductFrom";

const AddProduct = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Add Product
          </h1>

          <p className="text-gray-600 mt-2">
            Fill in the details below to add a new product to the store.
          </p>

        </div>

        <ProductForm />

      </div>

    </div>
  );
};

export default AddProduct;