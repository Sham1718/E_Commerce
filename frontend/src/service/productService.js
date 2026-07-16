import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/products" });

export const getAllProducts = (page, size = 5, config = {}) => {
  return api.get("/", { params: { page, size }, ...config });
};

export const getProductById = (id, config = {}) => {
  return api.get(`/${id}`, config);
};

export const createProduct = (product) => {
  return api.post("/", product);
};

export const updateProduct = (id, product) => {
  return api.put(`/${id}`, product);
};

export const deleteProduct = (id) => {
  return api.delete(`/${id}`);
};

export const searchProducts = (name, page, size = 5, config = {}) => {
  return api.get("/search", { params: { name, page, size }, ...config });
};

export const getProductsByCategory = (category, page, size = 5, config = {}) => {
  return api.get("/category", { params: { category, page, size }, ...config });
};
