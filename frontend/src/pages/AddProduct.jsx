import React from "react";
import ProductForm from "../components/ProductFrom";

const AddProduct = () => {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <ProductForm />
      </div>
    </main>
  );
};

export default React.memo(AddProduct);
