// src/modules/Users/repositories/ICategoryRepository.ts

import { ProductsDTO } from "../DTOs/ProductsDTO";
import { Products } from "../entities/Products";


export interface IProductRepository {
  create(data: ProductsDTO): Promise<Products>;
  findById(id: number): Promise<Products | undefined>;
  findByName(name: string): Promise<Products | undefined>;
  findByCode(code: string): Promise<Products | undefined>;
  findByBarcode(barcode: string | undefined): Promise<Products | undefined>;

  save(category: Products): Promise<Products>;
  findAll(params: { page: number; limit: number; search?: string }): Promise<{ items: Products[]; total: number }>;
  update(category: Products): Promise<Products>;
  findAllSimple(): Promise<Products[]>;



}
