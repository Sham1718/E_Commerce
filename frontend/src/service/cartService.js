import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/cart" });

export const addToCart = (product) => {
  return api.post("/", product);
};

export const updateCart = (id, product) => {
  return api.put(`/${id}`, product);
};

export const getCartItems = () => {
  return api.get("/");
};

export const getCartTotal = () => {
  return api.get("/total");
};

export const deleteCart = () => {
  return api.delete("/");
};

export const deleteCartItem = (id) => {
  return api.delete(`/${id}`);
};
