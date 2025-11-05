/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Category, CategoryResponse, ProductClass } from "../types/category";
import type { ProductClassResponse } from "../types/productClass";
import type { ProductResponse } from "../types/products";
import api from "./api";

export const registerService = {
  async createCategory(data: any) {
    return await api.post("/create-category", data);
  },

    async createProductClass(data: any) {
    return await api.post("/create-product-class", data);
  },

    async createProduct(data: any) {
    return await api.post("/create-product", data);
  },


  async updateCategory(data: any) {
    return await api.post("/update-category", data);
  },
  
    async updateProductClass(data: any) {
    return await api.post("/update-product-class", data);
  },

    async updateProduct(data: any) {
    return await api.post("/update-product", data);
  },

  async getCategory(params: { page: number; limit: number; search: string }) {
    const response = await api.post<CategoryResponse>("/get-category", params);
    return response.data; 
  },

  async getProduct(params: { page: number; limit: number; search: string }) {
    const response = await api.post<ProductResponse>("/get-product", params);
    return response.data; 
  },

  async getProductClasses(params: { page: number; limit: number; search: string }) {
    const response = await api.post<ProductClassResponse>("/get-product-class", params);
    return response.data; 
  },

    async getProducts(params: { page: number; limit: number; search: string }) {
    const response = await api.post<ProductResponse>("/get-products", params);
    return response.data; 
  },


  // register.service.ts  }

  async getProductClassesSimple(): Promise<ProductClass[]> {
    const response = await api.get<ProductClass[]>("/get-product-classes-simple");
    return response.data;
  },

  async getCategorySimple(): Promise<Category[]> {
    const response = await api.get<Category[]>("/get-categories-simple");
    return response.data;
  },


};
