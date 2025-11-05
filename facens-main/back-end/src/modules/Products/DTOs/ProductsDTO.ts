export interface ProductsDTO {
  category_id: number;
  name: string;
  code: string;
  barcode?: string | undefined;
  price: number;
  active?: boolean;
}

export interface ProductsResponseDTO {
  page: number;
  limit: number;
  search?: string;
}
