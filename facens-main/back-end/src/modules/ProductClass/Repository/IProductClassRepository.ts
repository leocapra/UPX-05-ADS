// src/modules/Users/repositories/ICategoryRepository.ts

import { ProductClassDTO } from "../DTOs/ProductClassDTO";
import { ProductClass } from "../entities/ProductClass";

export interface IProductClassRepository {
  create(data: ProductClassDTO): Promise<ProductClass>;
  findById(id: number): Promise<ProductClass | undefined>;
  findByName(name: string): Promise<ProductClass | undefined>;
  findByDescription(description: string): Promise<ProductClass | undefined>;
  save(category: ProductClass): Promise<ProductClass>;
  findAll(params: { page: number; limit: number; search?: string }): Promise<{ items: ProductClass[]; total: number }>;
  update(category: ProductClass): Promise<ProductClass>;
  findAllSimple(): Promise<ProductClass[]>;



}
