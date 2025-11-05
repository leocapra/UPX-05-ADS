// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  code: string;
  barcode?: string | null;
  price: number;
  category_id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  items: Product[];
  total: number;
}
