import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { IProductRepository } from "../IProductRepository";
import { Products } from "../../entities/Products";
import { ProductsDTO } from "../../DTOs/ProductsDTO";

export class ProductRepository implements IProductRepository {
  private repository: Repository<Products>;

  constructor() {
    this.repository = AppDataSource.getRepository(Products);
  }

  async create(data: ProductsDTO): Promise<Products> {
    const category = this.repository.create(data);
    await this.repository.save(category);
    return category;
  }

  async findById(id: number): Promise<Products | undefined> {
    const category = await this.repository.findOne({ where: { id } });
    return category || undefined;
  }

  async findByName(name: string): Promise<Products | undefined> {
    const category = await this.repository.findOne({ where: { name } });
    return category || undefined;
  }

    async findByCode(code: string): Promise<Products | undefined> {
    const category = await this.repository.findOne({ where: { code } });
    return category || undefined;
  }

  async findByBarcode(barcode: string | undefined): Promise<Products | undefined> {
    const category = await this.repository.findOne({ where: { barcode } });
    return category || undefined;
  }

  
  async save(category: Products): Promise<Products> {
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


    async update(category: Products): Promise<Products> {
    return await this.repository.save(category); // save atualiza se o id existir
  }

  async findAllSimple(): Promise<Products[]> {
  return this.repository.find({ select: ["id", "name"] });
}



}
