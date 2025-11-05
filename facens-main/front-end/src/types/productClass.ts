// src/types/category.ts
export interface ProductClass {
  id: string;
  name: string;
  description: string;
}

export interface ProductClassResponse {
  items: ProductClass[];
  total: number;
}
