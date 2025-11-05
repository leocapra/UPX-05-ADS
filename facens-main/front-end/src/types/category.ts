// src/types/category.ts
export interface Category {
  id: number;
  name: string;
  description: string;
  product_class_id: number;
}

export interface CategoryResponse {
  items: Category[];
  total: number;
}

export interface ProductClass {
  id: number;
  name: string;
  description: string;
}

