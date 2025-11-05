import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { IProductClassRepository } from "../IProductClassRepository";
import { ProductClass } from "../../entities/ProductClass";
import { ProductClassDTO } from "../../DTOs/ProductClassDTO";

export class ProductClassRepository implements IProductClassRepository {
  private repository: Repository<ProductClass>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductClass);
  }

  async create(data: ProductClassDTO): Promise<ProductClass> {
    const category = this.repository.create(data);
    await this.repository.save(category);
    console.log('aqui', data);
    return category;
  }

  async findById(id: number): Promise<ProductClass | undefined> {
    const category = await this.repository.findOne({ where: { id } });
    return category || undefined;
  }

  async findByName(name: string): Promise<ProductClass | undefined> {
    const category = await this.repository.findOne({ where: { name } });
    return category || undefined;
  }
  
  async findByDescription(description: string): Promise<ProductClass | undefined> {
    const category = await this.repository.findOne({ where: { description } });
    return category || undefined;
  }

  async save(category: ProductClass): Promise<ProductClass> {
    return this.repository.save(category);
  }

    async findAll(params: { page: number; limit: number; search?: string }) {
  const { page, limit, search } = params;

  const query = this.repository.createQueryBuilder("category");

  if (search) {
    query.where(
      "category.name ILIKE :search OR category.description ILIKE :search",
      { search: `%${search}%` }
    );
  }

  const [items, total] = await query
    .orderBy("category.id", "DESC") // 👈 aqui define a ordenação
    .skip(page * limit)
    .take(limit)
    .getManyAndCount();

  return { items, total };
}


    async update(category: ProductClass): Promise<ProductClass> {
    return await this.repository.save(category); // save atualiza se o id existir
  }

  async findAllSimple(): Promise<ProductClass[]> {
  return this.repository.find({ select: ["id", "name"] });
}



}
