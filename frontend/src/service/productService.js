import axios from "axios";

const api = axios.create({baseURL:"http://localhost:8080/products"})

export const getAllProducts=(page,size=5)=>{
    return api.get(`/?page=${page} & size=${size}`);
}
export const getProductById=(id)=>{
    return api.get(`/${id}`);
}
export const createProduct=(product)=>{
    return api.post("/",product);
}
export const updateProduct=(id,product)=>{
    return api.put(`/${id}`,product)
}
export const deleteProduct=(id)=>{
    return api.delete(`/${id}`)
}
export const searchProducts=(name)=>{
    return api.get(`/search?name=${name}`);
}
export const  getProductsByCategory=(category)=>{
    return api.get(`/category?category=${category}`)
}
