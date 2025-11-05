export interface ProductClassDTO {
  name: string;
  description?: string;
  active?: boolean;
}

export interface ProductClassResponseDTO {
  page: number;
  limit: number;
  search?: string;
}
