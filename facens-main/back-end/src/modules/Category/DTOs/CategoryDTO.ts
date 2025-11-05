export interface CategoryDTO {
  name: string;
  description?: string;
  product_class_id: number;
  active?: boolean;
}

export interface CategoryQueryDTO {
  page: number;
  limit: number;
  search?: string;
}
