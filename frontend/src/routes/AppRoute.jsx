import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default React.memo(AppRoute);
