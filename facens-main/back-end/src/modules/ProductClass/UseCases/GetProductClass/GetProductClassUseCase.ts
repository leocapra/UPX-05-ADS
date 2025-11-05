import { injectable, inject } from "tsyringe";
import { IProductClassRepository } from "../../Repository/IProductClassRepository";
import { ProductClassDTO, ProductClassResponseDTO } from "../../DTOs/ProductClassDTO";
import { ProductClass } from "../../entities/ProductClass";

@injectable()
export class GetProductClassUseCase {
  constructor(
    @inject("ProductClassRepository")
    private productClassRepository: IProductClassRepository
  ) {}

  async execute(data: ProductClassResponseDTO): Promise<{ items: ProductClass[]; total: number }> {
    const { page, limit } = data;

    if (page < 0 || limit <= 0) {
      throw new Error("Página ou limite inválido");
    }

    return this.productClassRepository.findAll(data);
  }
}
