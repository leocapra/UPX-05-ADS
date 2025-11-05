// src/modules/Users/repositories/ICategoryRepository.ts
import { CategoryDTO } from "../DTOs/CategoryDTO";
import { Categories } from "../entities/Categories";

export interface ICategoryRepository {
  create(data: CategoryDTO): Promise<Categories>;
  findById(id: number): Promise<Categories | undefined>;
  findByName(name: string): Promise<Categories | undefined>;
  findByDescription(description: string): Promise<Categories | undefined>;
  save(category: Categories): Promise<Categories>;
  findAll(params: { page: number; limit: number; search?: string }): Promise<{ items: Categories[]; total: number }>;
  update(category: Categories): Promise<Categories>;
  findAllSimple(): Promise<Categories[]>;
  


}
