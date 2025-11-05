import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { CategoryDTO } from "../../DTOs/CategoryDTO";
import { ICategoryRepository } from "../ICategoryRepository";
import { Categories } from "../../entities/Categories";

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Categories>;

  constructor() {
    this.repository = AppDataSource.getRepository(Categories);
  }

  async create(data: CategoryDTO): Promise<Categories> {
    const category = this.repository.create(data);
    await this.repository.save(category);
    console.log('aqui', data);
    return category;
  }

  async findById(id: number): Promise<Categories | undefined> {
    const category = await this.repository.findOne({ where: { id } });
    return category || undefined;
  }

  async findByName(name: string): Promise<Categories | undefined> {
    const category = await this.repository.findOne({ where: { name } });
    return category || undefined;
  }
  
  async findByDescription(description: string): Promise<Categories | undefined> {
    const category = await this.repository.findOne({ where: { description } });
    return category || undefined;
  }

  async save(category: Categories): Promise<Categories> {
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


    async update(category: Categories): Promise<Categories> {
    return await this.repository.save(category); // save atualiza se o id existir
  }

    async findAllSimple(): Promise<Categories[]> {
    return this.repository.find({ select: ["id", "name"] });
  }
  


}
