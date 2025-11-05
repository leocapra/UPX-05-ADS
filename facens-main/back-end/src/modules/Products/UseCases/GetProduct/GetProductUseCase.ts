import { injectable, inject } from "tsyringe";
import { IProductRepository } from "../../Repository/IProductRepository";
import { Products } from "../../entities/Products";
import { ProductsResponseDTO } from "../../DTOs/ProductsDTO";

@injectable()
export class GetProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(data: ProductsResponseDTO): Promise<{ items: Products[]; total: number }> {
    const { page, limit } = data;

    if (page < 0 || limit <= 0) {
      throw new Error("Página ou limite inválido");
    }

    return this.productRepository.findAll(data);
  }
}
