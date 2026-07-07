import axios from "axios";

const API_BASE_URL = "http://192.168.50.12:3000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Categories
export const fetchCategories = async () => (await api.get("/categories")).data;

export const deleteCategory = async (id: string) =>
  (await api.delete(`/categories/${id}`)).data;

export const fetchCategory = async (id: string) =>
  (await api.get(`/categories/${id}`)).data;

export const createCategory = async (data: {
  name: string;
  imageUrl?: string;
}) => await api.post("/categories", data);

export const updateCategory = async (
  id: string,
  data: { name: string; imageUrl?: string },
) => await (await api.put(`/categories/${id}`, data)).data;

// Products
export const fetchProductsByCategory = async (categoryId: string) =>
  (await api.get(`/categories/${categoryId}/products`)).data;

export const fetchProductById = async (id: string) =>
  (await api.get(`/products/${id}`)).data;

export const createProduct = async (data: {
  categoryId: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
}) => (await api.post("/products", data)).data;

export const deleteProduct = async (id: string) =>
  (await api.delete(`/products/${id}`)).data;
